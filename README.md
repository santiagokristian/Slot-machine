# Slot-machine
A simple web app using Angular and nodejs express

#Setup
Clone the repository.
For the Node Application go to the Node directory and run npm install.
Run the node project with the command 'npm start'.
if error is encoutered please install nodemon with the commands 'npm install nodemon --save-dev'.
take note of the port nodemon is listening to


For the Angular application go to the Angular/slot-machines directory and run npm install.
Once sucessfull installation run 'ng serve' to run the project.

Important notes:
If the Angular cannot connect to the backend change the backendUrl variable in the Angular\slots-angular\src\app\services\http-calls.service.ts
based on the port the nodemon was listening to.
If a Cors error was encountered change origin variable of cors in the Node\app.js file based on the port/ip of the Angular project

Tools & Frameworks:
Angular 13
Angular Material
bootstrap
Rxjs
Angular forms

NodeJs
express
express-session
cors
nodemon
Joi
cookie-parser
