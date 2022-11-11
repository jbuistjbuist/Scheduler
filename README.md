# Interview Scheduler

Interview scheduler is a single page application built with React and was a part of the Lighthouse Labs web development program. This project was a great way to gain experience with React, Jest, Cypress, Storybook, WebSockets, and deploying a production build using CircleCI and Netlify (see https://scheduler-app-jeremy.netlify.app/).

## App Interface

<img width="1438" alt="interview_scheduler" src="https://user-images.githubusercontent.com/79812985/200974100-e6839b88-1593-42cc-bdd1-627843241dbe.png">


## Creating, Editing, and Deleting an Appointment (video)

https://user-images.githubusercontent.com/79812985/200974136-2a18f417-2a9d-47c2-9fb0-db019f318faa.mov


## Setup

### Clone this repository

`git clone git@github.com:jbuistjbuist/Scheduler.git`

### Install dependencies

Install dependencies with `npm install`.

### Install server repository

This project has a dependency on a seperate development server which can be found at https://github.com/jbuistjbuist/scheduler-api. Please follow the intructions there to install the repository.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies
- axios: ^0.20.0
- classnames: ^2.2.6
- normalize.css: ^8.0.1
- react: ^16.9.0
- react-dom: ^16.9.0
- react-scripts: 3.4.4
