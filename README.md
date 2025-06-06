# Blog Application
#### Video Demo: <https://youtu.be/1gBf6WTe97s>
A full-stack blog web application built with Node.js, Express.js, EJS, and PostgreSQL, allowing users to create, view, update, and delete persistent blog posts.

## Installation
Use the package manager npm to install all needed packages.
```bash
npm install
```

## Usage
Use nodemon to run this application on local server 3000.
```bash
nodemon index.js
```
Then, type [localhost:3000](http://localhost:3000/) inside your bowser then hit enter or click the link.

## Folder Structure

The project is organized into four main components: three folders (`node_modules`, `public`, `views`) and three file (`index.js`, `package-lock.json`, `package.json`). Each of these components serves a specific purpose in the development and functioning of the application.

### 1. `node_modules` folder
Contains all the dependencies and packages installed via npm. This folder is automatically generated when dependencies are installed and should not be modified manually.

### 2. `public` folder
Holds static assets such as CSS files, and front-end JavaScript.

### 3. `views` folder
Includes EJS (Embedded JavaScript) template files used to render dynamic HTML pages on the server side.

### 4. `index.js`
The main entry point of the application. It sets up the Express server, handles routing, and connects the different components of the app.

### 5. `package-lock.json`
Automatically generated file that locks the versions of installed dependencies, ensuring consistent installs across environments.

### 6. `package.json`
Defines project metadata and dependencies. It includes information like project name, version, scripts, and required packages.

## Technologies Used:
Frontend: 
HTML5, CSS, JavaScript, EJS.


Backend: Node.js/Express, PostgreSQL
