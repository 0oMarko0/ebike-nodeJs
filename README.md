# Ebike-Backend
[![Build Status](https://travis-ci.com/0oMarko0/ebike-nodeJs.svg?token=qPTLGEMJS3aTghdMh3qH&branch=master)](https://travis-ci.com/0oMarko0/ebike-nodeJs)


Ebike is an application that allows a user to plan a bike ride to visit restaurants

See the MVP at: [http://client-ebike.s3-website-us-east-1.amazonaws.com](http://client-ebike.s3-website-us-east-1.amazonaws.com)

Or read the API documentation at: [http://ebike-prod.us-east-1.elasticbeanstalk.com/readme](http://ebike-prod.us-east-1.elasticbeanstalk.com/readme)


## Installation
#### Prerequisite for development
- [Node](https://nodejs.org/en/download/) That should include npm as well
- [Docker for windows](https://docs.docker.com/docker-for-windows/) or
- [Docker for linux](https://docs.docker.com/v17.12/install/linux/docker-ce/ubuntu/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [Typescript](https://www.typescriptlang.org/)
- [Webstorm](https://www.jetbrains.com/webstorm/) free license with ulaval email

## Run The Application
#### From Aws
The application is hosted on AWS and is accessible at: [http://ebike-prod.us-east-1.elasticbeanstalk.com/](http://ebike-prod.us-east-1.elasticbeanstalk.com/)

#### From Docker-compose
**It may be a good idea to start clean and prune all the container image and network you have on your computer**
```
docker system prune -a
```

In the root  directory of the project run 
```
docker-compose up
```

That will boot a bunch of docker
- The application documentation [http://localhost:8080/readme](http://localhost:8080/readme)
- The application server: [http://localhost:8080/](http://localhost:8080/)
- A mongo database: [http://localhost:27017](http://localhost:27017)

If you want a more complete IDE to manage mongo you can use [Robo3T](https://robomongo.org/)

#### Locally
Once all the prerequisite are installed, the first step is to install all the dependencies
```
npm install
```

To launch the project on a development server
```
npm run start-dev
```

To run the test
```
npm run test
```


## Code Formatting
[Eslint](https://eslint.org/) and [Prettier](https://prettier.io) are used to lint and format. 
Depending on your IDE you will need to download some plugin in order to make those tool work.

## Debugging Typescript
#### Vscode
If you need more information on how to debug with typescript and vscode refer to this documentation: https://github.com/microsoft/TypeScript-Node-Starter#debugging

#### Webstorm
In order to debug in webstorm you need to start the command `npm run watch-ts` this command will watch any change to the src directory and transpile then to javascript.
Once that command is running you need to add a Node configuration.

1. Click on ADD CONFIGURATION

![add-config](https://test-de-test.s3.amazonaws.com/Screenshot+from+2019-09-08+17-31-36.png)

2. Click on the + and add a new nodeJs config. The configuration should look like this

![config](https://test-de-test.s3.amazonaws.com/Screenshot+from+2019-09-08+17-27-51.png)

Once it's done you should be good to go. It's also possible to start the server with this configuration.

---
The structure of the project was inspire by https://github.com/microsoft/TypeScript-Node-Starter.

