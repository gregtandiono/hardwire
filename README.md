# Wired Backup

*this repository is officially locked from any more writes. This repo will remain as a reference to the hardwire project*

This is a testing ground for local backups without interface (pure node)

requirements:
- node

1. in the root directory, please run `npm install` to install all dependencies
2. run `node operator-server.js`
3. run `node master-server.js`
4. run `node client-emulation.js`

### Operator Server

This is to emulate local server (local machine that the client is attached to), in this case the client server
is running on nodeJS.

### Master Server

This is to emulate any remote cloud server (in this case a running node server, we could do S3 bucket integration instead in the future).

### client-emulation.js

Consider this a `headless` browser for the sake of testing.


## TODO
- Automation via socket
- Manual sync capability
- Operator interface
- Master interface

## NOTE

Please consider the fact that this is only a prototype, when we do port this to production, each server application should remain separate (for ease of deployment and whatnot).
