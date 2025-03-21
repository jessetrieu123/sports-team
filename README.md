## High level architecture

The application is running React for the frontend and NestJS for the backend.

## Setup and installation

Clone the repo and run 'npm install' - this will install all the dependencies for the application to run.

Open a new terminal and navigate to the backend folder and run - 'npm start' = this will start the backend server to recieve api calls.

Open a new terminal and navigate to the frontend folder and run - 'npm start' = this will start the frontend client.

## Running tests

Frontend tests - navigate to frontend folder and run 'npm test' - this will run the frontend tests

Backend tests - navigate to backend folder and run 'npm test' - this will run the backend tests

## Migration explanation

My understanding of what the code was doing in Rails was just a simple CRUD POST api call with some eroror handling so I just replicated that
in NestJS.

## Design patterns

For the form team creation, it was not using much data so overcomplicating it with a form module like Formik seemed overkill.
Since it could be done with simple state management, I opted for that route. Since the application was small and basic, I didn't
find a need to create tons of files since nothing will be reused so I kept most code in one file. If a component would be used in other files,
I would have created a separate file and imported it where I would need it. I used toastify as a notification module since it is less invasive
for UX. For the backend, it is just a standard MVC implementation. I used the built in ValidationPipe and decorators to validate the data for
the team creation.
