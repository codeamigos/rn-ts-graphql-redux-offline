# rn-ts-graphql-redux-offline
Typescript React-native + Graphql and redux offline sample App.

Requires GitHunt API server https://github.com/apollographql/GitHunt-API to run on localhost:3010 (default)

### What's going on

This sample app...
* Downloads Graphql Schema from graphql server (GitHunt API server)
* Combines all *.graphql files into documents.json
* Generates src/schema.ts types for graphql queries based on graphql server schema and documents.json
* Uses redux to store react-apollo state
* Redux-offline automatically stores apollo requests in AsyncStorage...
* ...then rehydrates store (with all previous requests data) on app start

### Try
```javascript
git clone https://github.com/codeamigos/rn-ts-graphql-redux-offline.git
cd rn-ts-graphql-redux-offline
npm install
npm run ios // just once to build and install app on device
npm start // to start app
```

### Heads up
There are could be errors like `Generic type 'AsyncIterator<T, E>' requires 2 type argument(s).` in graphq subscriptions types, its okay. Hope it will be fixed soon
