### Demo

http://marvinirwin.com:3002/


### QuickStat (Make sure to set the API keys)

Create `server/.env` and fill in the twitter API keys & port (See `server/env.example` the format)

![Twitter Keys](/twitter-keys.png)

```
TWITTER_API_KEY=abc123
TWITTER_API_KEY_SECRET=abc123
```

### Run with Docker 

run `./docker.sh 3001` to use docker to build the client with Node 14.4 and serve the project on `localhost:3001`


### If node is installed locally
```
cd client; # Build the React Page (And copy the dist to server/public)
npm install; 
npm run build; 
cd ../server; 
npm install;  # Install and run the server
npm run start
```

### Project Structure
`/client` contains a React Page

`/server` contains an Nodejs Express server

