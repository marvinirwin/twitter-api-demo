# run with <command> <port>
docker run \
    -it \
    -v $(pwd):/global-relay \
    -p $1:$1 \
    --env PORT=$1 \
    node:14.4 /bin/bash -c "
      cd /global-relay/client && npm install && npm run build
      cd /global-relay/server && npm install && npm run start
    ";


