# Collectify

Hello, and welcome to my BrainStation Capstone Project, Collectify.

## Features

This application allows a user to document their own physical music collection (Vinyl, CD, Cassette) by using the Spotify API to search for albums and submitting a form with details of the specific album they own. The user can also add albums to a wishlist by searching for albums and submitting the same form by clicking a different button. The user can also edit details of the album they own, delete items from their collection/wishlist, and also add an album from their wishlist into their collection once they have acquired it.

## Application Site

This app is deployed on Netlify for the front-end and Heroku for the back-end

https://collectify.netlify.app

### Important Note

This application is currently in Spotify's application developer mode. If you would like to test out this application you can e-mail me at:

nigeljdsouza@gmail.com

## Tech Stack

### Front-End:
- React
- SASS
- React Router DOM
- FortAwesome/FontAwesome
- Axios
- JWT Decode

### Back-End:

- Node.js
- Express
- MySQL
- Cors
- Dotenv
- Knex
- Nodemon
- JWT
- Bcrypt

### Environment Variables

#### client/.env

- REACT_APP_CLIENT_ID: contains client ID for use in the Spotify module in the utils folder
- REACT_APP_REDIRECT_URI: contains the redirect URI for use in the Spotify module in the utils folder
- REACT_APP_SERVER_URL: contains the API URL that retrieves information from the server

#### server/.env

- PORT: contains the port number in which the server is running on
- JAWSDB_URL: contains the URL to connect to the provisioned MYSQL database for this project
- SERVER_URL: contains the API URL that retrieves information from the server