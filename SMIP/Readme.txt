-npm packages
to update dependencies
//npm install "$package" --save
to update devDependencies
//npm install "$package" --save-dev
on production/ end user machine
//npm install --production

- Starting
Backend - from app root directory: node server/app.js
Frontend - Todo

- Debugging (https://github.com/visionmedia/debug)
"Debug" package is used to log all debugging messages
To view debug messages set a "DEBUG" environment variable as below:
set DEBUG:* 

Save debug statements to a .txt file:
set DEBUG_FD=1
node server/app > log.txt

//TODO LIST

- CODE QUALITY: ES6, Modules/ Classes, 
	Express: implement correctly - headers, routers, handlers, MVC/ Node Service design pattern
	Caching, Error handling

- BUILD : js lint, Gulp, debugger

- PROD READINESS: Security, Cluster, Config module, 
	PM2 or sthing suitable to auto start on crash/ reboot
    Packaging - JxCore

- TESTING : extend BDD - tests, Test coverage tool


