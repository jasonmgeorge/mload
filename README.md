# mload
Sample Load Test CLI

mload implements a CLI to perform a simple POST load test against an API endpoint.

:exclamation: Note that the load test implmentation is specific to a single endpoint and requires modificaiton for a general solution.

## Install and Usage

### Node.js
mload is an Node.js CLI. You will need Node.js installed on your machine.

See https://nodejs.org/en/ for details on Node.js

### Local Execution
Checkout the project to a local directory and install dependancies with NPM.

`npm install`

Execute the project with node.

`node . -u <target url> -a <authorization key> -r <target requests per second>`

### Help

Command line options can be viewed with the help option.

`node . -h`
