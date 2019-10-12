# MERN Starter

A template for MERN applications.

- React client Based on `create-react-app`, using Redux for state management, `scss` for styles.
- Express server with authentication
- Authentication based on JWT.

## Installation

1. Change the name of your app in `/package.json`
1. `npm install`
1. duplicate `.env.sample` to `.env`
1. add your settings to `.env`

  - The Secret key is for signing the JWT's. It needs to be 32 chars long (64 bits)
  - The mongodb url needs to be url encoded, avoid special characters in your password. 

1. connect to the `/install` path to set your root user
1. Edit `initialState.brand.label` in `/client/redux/reducers/nav.reducer.js` to change your app's name
1. make sure that you are using Prettier for code formatting
