import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter } from "react-router-dom"; // HashRouter = serve static file, BrowserRouter = serve พวก url
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/css/vendor/bootstrap.min.css";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persister } = configureStore();
//
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <PersistGate persistor={persister}>
        <Route path="/" component={App} />
      </PersistGate>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
