# Running the Application

## Before Setup

### Dependencies

In order to build and run the app, the following dependencies are required:

* docker and docker-compose
* node and yarn

With these dependencies installed, run `make setup` to setup the project.

## Testing

Once the project has been setup, you can run tests by running `make test`

## Before Serve

In order to successfully run the project, three environment variables have to be set:

* DB_USER : the db user
* DB_PASSWORD : the password for the db user
* DB_DATABASE : the target database for the application

Below is an example of the bash commands needed to set these variables (and export them for child processes to consume). Please don't use these values.

```sh
export DB_USER="user"
export DB_PASSWORD="password"
export DB_DATABASE="stordas"
```


These environmental variables are forwarded to both the service and the database container.

After setting these variables, run `make server` to run the application.

## Hitting the Application

The client serves from `http://localhost:8000`.

## Hitting the Gateway Dashboard

`http://localhost:8080` serves the traefik dashboard for inspecting the application running.

## Hitting the Services Directly

To hit the services directly, curl `api.localhost:8000/url/$shortcode` with the final param being the shortcode.
