# Ebike-Backend
[![Build Status](https://travis-ci.com/0oMarko0/ebike-nodeJs.svg?token=qPTLGEMJS3aTghdMh3qH&branch=master)](https://travis-ci.com/0oMarko0/ebike-nodeJs)


Ebike is an application that allows a user to plan a bike ride to visit restaurants
## Installation
#### Prerequisite
- [Node](https://nodejs.org/en/download/) That should include npm as well
- [Docker for windows](https://docs.docker.com/docker-for-windows/) or
- [Docker for linux](https://docs.docker.com/v17.12/install/linux/docker-ce/ubuntu/)

#### From Docker-compose
#### Localy
Once node is installed, the first step is to install all the dependencies
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

To lint the code base
```
npm run lint
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

