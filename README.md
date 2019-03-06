# Weather Mood App - by group 65
# last modified date: ########

## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Quick Boilerplate Overview](#quick-boilerplate-overview)
- [Extra Info](#extra-info)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**

# requires node and npm being installed
# try following commands to check the version of the node and the npm respectively
```sh
node -v
```
```sh
npm -v
```


## Installation

**1. Choose a dictory :**

sh
cd "<your-directory-path>
```

```sh
copy the "weather-app" file in your dictory
```

```sh
cd weather-app  
```


**2. Make it your own :**

```sh
rm -rf .git && git init && npm init
```

> :information_source: Command above re-initializes the repo and sets up your NPM project.


**3. Install the dependencies :**

```sh
npm install
```
```sh
npm install jquery-ui --save-dev
```

**4. Start a live-reload development server :**

```sh
npm run dev
```

> This is a full web server for your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**5. Generate a production build in `./build` :**

```sh
npm run build
```

**6. run the app: Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

> This simply serves up the contents of `./build`. Bear in mind, if you use this, the localhost port your server is running on will refresh, and you'll also need to restart it to see any changes you've made to the code in `src`.


## Overview of the resources used:

- preact boilerplate from professor Juan
- API data from openweathermap 
- Weather icons from the flaticon website
- music library linked from Apple Music
- music icon from Apple
- npm environment
- node js environment
- Javascript 
- CSS & LESS
- jquery
- preact framework
- JSON


👌
best compatibility with 19:9 propertional screen of smartphones, and 736 (height) * 414 (width) pixels 


References: 

preact: https://preactjs.com/
react: https://reactjs.org
tutorial: https://www.youtube.com/watch?v=DLX62G4lc44&t=1795s
API: https://openweathermap.org/api
