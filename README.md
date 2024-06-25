# Console Connect Weather Application Technical Assesment

This application is part of a technical assignment for a Senior Frontend Developer in Console Connect.

## Tools Utilized

This web app is built upon TypeScript, Next.js and Redux. 

## APIs Utilized

APIs what were used are [WeatherAPI](https://www.weatherapi.com/) as per the assesment description, as well as
[Google Maps Static API](https://developers.google.com/maps/documentation/maps-static/overview) for the website's background.
API keys would be further obscured in a production environment.

For example, the Google API key would not be visible in the front-end,
instead the background image would be fetched in the backend and then rendered in the front.
In this current implementation, the image is fetched with a simple GET request.


## Requirements of the Assignment

All the mandatory requirements and features have been implemented. The extra features (search history, clear history and 
favorite cities) were not implemented due to time constraints, however their implementation would be relatively simple using
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Building and Running the project

The project was built with Node v22.3.0 (and npm 10.8.1). A simple ```npm install``` followed by ```npm run dev``` would
be enought to run the project on port 3000 on localhost.

For production, buiding with ```npm run build``` and then starting the process with ```npm run start``` with a tool like
pm2 would be favorable, besides editing relevant nginx files (or similar tools), setting up domains, SSL certs etc.
