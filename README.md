# [idyle/web](https://web.idyle.app)

idyle's multi-service website and platform.

## About

idyle is the first open platform website builder that offers full user freedom and mobility. It's composed of six core services, namely: 

1. Accounts - accounts manager
2. Payments - payments manager
3. Editor - website builder and code editor 
4. Deployer - hosting solution
5. Objects - storage service
6. Documents - database service

These services are accessible at `https://web.idyle.app`.

## Technologies and Services

* The entire website is built on [ReactJS](https://reactjs.org) and connects to `idyle/api`. 

* Styling and design is done through [TailwindCSS](https://tailwindcss.com) and authentication through [Google Firebase](https://firebase.com).

* idyle's `Editor` service uses Microsoft's [Monaco Editor](https://microsoft.github.io/monaco-editor) which also powers VSCode. 

* idyle's `Payments` service uses [Stripe](https://stripe.com). Analytics are captured through [Google Analytics](https://analytics.google.com).

* Most of idyle's infrastructure for `Deployer`, `Objects`, and `Documents` are powered by [Google Cloud](https://cloud.google.com).

* The rest of idyle's systems such as its `Editor Canvas` one-click builder, conversion systems, and deployment procceses are built locally in-house.

## Setup 

### Environment Variables

The following enviornment variables are required to start the website. This sensitive information is only accesible with internal authorization.

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_BASEPATH=
REACT_APP_MEASUREMENT_ID=
REACT_APP_MODE=
```

### Startup 

Execute the following commands to start the application. It will run on `localhost:3000`.

`npm install`

`npm start`