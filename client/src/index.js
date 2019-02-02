import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";
import App from "./App";
import Provider from "./Provider";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "https://api-useast.graphcms.com/v1/cjrjx3c9z0d6h01ggtwvp3czr/master"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
