# Hardwire Agent

*This repository is a migration from the `wired-backup` repo*

## Plans

- Remove relics of the wired-backup
- Migrate only the master/agent related stuff
- This application will be web-based and needs to be connected to the internet constantly
- There will be a simple client with socket capabilities
- **Hardwire Agent** server will hold a database and a set of APIs for multiple **Hardwire Operator** servers
- Need to create a wiki to hold all bearings of DB

## Run Tests

run `npm run seed && bash test-runner.sh` for windows

*I don't know why `NODE_ENV` is an invalid bash command*

run `npm run test` for MacOS
