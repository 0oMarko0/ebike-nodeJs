require("dotenv").config();
const fs = require("fs");
const archiver = require("archiver");
const AWS = require("aws-sdk");
const chalk = require("chalk");
const appRoot = require("app-root-path");
const mime = require("mime");
const { promisify } = require("util");

const ENV = {
  credential: {
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET
  },
  S3: {
    bucket: process.env.AWS_S3_BUCKET
  },
  EB: {
    name: process.env.AWS_EB_APP_NAME,
    env: process.env.AWS_EB_APP_ENV
  },
  region: process.env.AWS_REGION
};

const credentials = new AWS.Credentials(
  ENV.credential.key,
  ENV.credential.secret
);
const config = new AWS.Config({ credentials, region: ENV.region });
const EB = new AWS.ElasticBeanstalk(config);
const S3 = new AWS.S3(config);

const readFile = promisify(fs.readFile);
const listFileInDirectory = promisify(fs.readdir);
const copyFileAsync = promisify(fs.copyFile);

const output = fs.createWriteStream(`${appRoot}/dist.zip`);
const archive = archiver("zip", {
  zlib: { level: 9 }
});

archive.pipe(output);

output.on("close", function() {
  console.log(chalk.blue(`${archive.pointer()} total bytes`));
  console.log(
    chalk.blue(
      "archiver has been finalized and the output file descriptor has closed."
    )
  );
  deploymentToEb(`${appRoot}/dist`).then();
});

archive.on("warning", function(err) {
  if (err.code === "ENOENT") {
    console.log(chalk.yellow(`WARNING: ${err}`));
  } else {
    throw err;
  }
});

archive.on("error", function(err) {
  console.log(chalk.red(err));
  throw err;
});

const retrieveFileName = filePath => {
  return filePath
    .split("/")
    .slice(1)
    .join("/");
};

const isDirectory = filePath => {
  return fs.lstatSync(filePath).isDirectory();
};

const isFile = filePath => {
  return fs.lstatSync(filePath).isFile();
};

const retrieveExtensionFromFile = filePath => {
  return filePath
    .split("/")
    .reverse()[0]
    .split(".")
    .reverse()[0]; // lol
};

const contentTypeFromFile = filePath => {
  const fileExtension = retrieveExtensionFromFile(filePath);
  return mime.getType(fileExtension);
};

const listAllFileInDirectory = async directory => {
  let fileList = [];

  const fileInDirectory = await listFileInDirectory(directory);

  for (let i = 0; i < fileInDirectory.length; i++) {
    if (isDirectory(directory + fileInDirectory[i])) {
      fileList = fileList.concat(
        await listAllFileInDirectory(directory + fileInDirectory[i] + "/")
      );
    } else {
      fileList.push(directory + fileInDirectory[i]);
    }
  }

  return fileList;
};

const uploadFileToS3 = async filePath => {
  if (isFile(filePath)) {
    const fileToUpload = await readFile(filePath);
    ENV.EB.label = `ebike.zip`;
    const params = {
      Bucket: ENV.S3.bucket,
      Key: ENV.EB.label,
      Body: fs.createReadStream(filePath),
    };

    S3.upload(params, err => {
      if (err) {
        console.log(chalk.red(err));
        throw err;
      }
    });
    console.log(chalk.green("Upload to s3"));
  }
};

const createApplicationVersion = () => {
  const param = {
    ApplicationName: ENV.EB.name,
    VersionLabel: ENV.EB.label,
    SourceBundle: {
      S3Bucket: ENV.S3.bucket,
      S3Key: ENV.EB.label
    }
  };

  EB.createApplicationVersion(param, err => {
    if (err) {
      console.log(chalk.red(err));
      throw err;
    }
  });
};

const updateEnvironment = () => {
  const param = {
    ApplicationName: ENV.EB.name,
    EnvironmentName: ENV.EB.env,
    OptionSettings: [
      {
        Namespace: "aws:elasticbeanstalk:container:nodejs",
        OptionName: "NodeCommand",
        Value: "npm start"
      }
    ],
    VersionLabel: ENV.EB.label
  };

  EB.updateEnvironment(param, err => {
    if (err) {
      console.log(chalk.red(err));
      throw err;
    }
  });
};

const deploymentToEb = async filePath => {
  await uploadFileToS3(filePath);
  // await createApplicationVersion();
  // await updateEnvironment();
  console.log(chalk.green("Deployment complete"));
};

const zipDistFolder = async () => {
  if (fs.existsSync("dist/")) {
    await copyFileAsync(
      `${appRoot}/package.json`,
      `${appRoot}/dist/package.json`
    );
    const fileLists = await listAllFileInDirectory("dist/");
    for (let i = 0; i < fileLists.length; i++) {
      console.log(chalk.blue(`Adding file to zip archive: ${fileLists[i]}`));
      archive.append(fs.createReadStream(fileLists[i]), {
        name: retrieveFileName(fileLists[i])
      });
    }

    archive.finalize();
  } else {
    console.log(chalk.red("No build have been found, skipping deployment"));
    console.log(chalk.yellow("Try running: yarn build"));

  }
};

module.exports = (async function() {
  await zipDistFolder()
})();
