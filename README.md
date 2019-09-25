## Learn Together

Learn Together is a fullstack application for you to connect with people in your area that are pursuing similar educational goals.

## Major Technologies/Frameworks

<b>Back End</b>

- [Node]
- [Express]
- [PostgreSQL]
- [Sequelize]
- [Socket.io]
- [Redis]

<b>Front End</b>

- [HTML5]
- [React]
- [React Router]
- [Semantic UI React]
- [Redux]
- [Redux Thunk]
- [React Redux]
- [Socket.io-client]

<b>Development and Testing</b>

- [Webpack]
- [Babel]
- [Jest]

## Features

<b>Users can:</b>

- Log in / Sign up
- Edit their profile and password
- Create groups
- Join groups
- Delete groups they created
- Create posts and events in groups they are members of
- RSVP to events
- Comment on events and posts
- See the groups and events they belong to
- Search for groups and events

## Usage

See the deployed version here: (https://learn-together-cp.herokuapp.com/#/).

Sign up and look for groups and events on the Explore page! Create posts on groups and comment to discuss with your fellow learners.

The currently deployed branch is 'dev'.

## Installation

If you do not have Node (https://nodejs.org/en/download/), PostgreSQL (https://postgresapp.com/downloads.html), and Redis (https://redis.io/download) installed, you will need to install all three. You will also need an API key from this (https://www.zipcodeapi.com/API) API. We are using the 'Zip codes by Radius' service. You can get a basic key for free.

<b>Then:</b>

- Clone this directory && cd into 'learn-together'
- Create the database 'learn-together' by executing `createdb learn-together` in the terminal or by using a GUI
- create a '.env' file
- add `ZIP_KEY=<your_key_here>` to '.env'
- execute `npm install` to install the packages
- execute `npm run start:dev` to start the application server and bundle the front end code
- navigate to (http://localhost:3000/#/) in the browser
