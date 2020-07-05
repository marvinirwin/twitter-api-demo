# run with <command> <port>
runWithDocker() {
  docker run \
      -it \
      -v $(pwd):/global-relay \
      -p $2:$2 \
      node:14.4 /bin/bash -c "$1";
}

runWithDocker "cd /global-relay/client && npm install && npm run build && cp -r ./build ../server/public" 3000 ;
runWithDocker "cd /global-relay/server && npm run start" 3001;

