# Wired Backup

This is a testing ground for local backups without interface (pure node)

requirements:
- node

1. in the root directory, please run `npm install` to install all dependencies
2. run `node node-client.js`
3. run `node backup-server.js`
4. run `node client-emulation.js`

### node-client.js

This is to emulate local server (local machine that the client is attached to), in this case the client server
is running on nodeJS

### backup-server.js

This is to emulate any remote cloud server (in this case a running node server, we could do S3 bucket integration instead in the future)

### client-emulation.js

Consider this a `headless` browser for the sake of testing


## TODO
- Automation via socket
- Manual sync capability
- Operator interface
- Master interface

## NOTE

Please consider the fact that this is only a prototype, when we do port this to production, each server application should remain separate (for ease of deployment and whatnot)
