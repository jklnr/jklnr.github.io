### Deploy

```commandline
npm run deploy
```

This will use gh-pages (see `package.json`) to build and deploy the project

### Running locally

```commandline
npm run start
```

But it won't work unfortunately because of some Auth0 related issue. localhost is not verifiable by Auth0 as a first party app, and therefore the user must give consent in order to use the app. Or something like that.
And I haven't set up any kind of flow to collect user consent, even though I'm the user.
