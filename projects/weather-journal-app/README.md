# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
- First you need to install the dependencies, you can do this by either running `npm install` or `yarn install`.
- To start the application you will need to run `yarn start` to start the server then open the localhost:`https://localhost:3000/` in your preferred browser.
- Input a zip code and how you are feeling in the corresponding fields and then click Generate 
- The most recent entry will show up in the Most recent entry section of the page 
- Please note that the most recent entry section will only display the most recent entry so if you change your zip code and how you are feeling and clicked generate again the old entry will be replaced with the new one in the Most recent entry section, however if you wish to see all your entries you can visit `https://localhost:3000/getEntries` to see all your entries. Note that they will be in JSON format.
  
## Packages Used
- Express
- Body Parser
- CORS
- Nodemon 

## Troubleshooting
- You might get an error message when you try to open the localhost saying `This site can’t provide a secure connection` to fix this you need to use the GET flag=true to get the app to work
- Navigate to `https://localhost:3000/fake=true`
- If you already have an application running on port 3000 you can change the port value by opening the `server.js` file and changing the value of the `port` variable.