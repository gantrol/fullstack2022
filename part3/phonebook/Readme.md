# A demo app

## .env

replace `<password>` and `<account>`

```.env
MONGODB_URI=mongodb+srv://<account>:<password>@cluster0.hrs3q.mongodb.net/?retryWrites=true&w=majority
PORT=3001
```

## build frontend

```sh
npm run build:ui
```

## deploy to heroku

```sh
npm run deploy:full
```

or deploy current version:

```sh
npm run deploy
```