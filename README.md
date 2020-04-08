# MERN Starter

This is a MERN app boilerplate.

## Features

- MERN Stack
- Bootstrap
- Mongoose
- Babel transpiling for the Express server which allows for ES2017
- Redux
- JWT tokens
- User authentication
- App configuration in the package.json
- an installer screen
- Geolocation through Location IQ

## Usage for development

1. In the root `package.json` set your application's `name`, `displayName` and `author`
1. run `npm i`
1. duplicate `.env.sample` into `.env`
1. In the `.env`

- set the `NODE_ENV` to `development`
- set `MONGODB_URI` to the URI of your Mongo database
- set `SECRETKEY` to a random, 32 character string
- set `COOKIE_SECURE` to `false` for development, `true` for production
- set `APIKEY_LOCATIONIQ` to your Location IQ API key
