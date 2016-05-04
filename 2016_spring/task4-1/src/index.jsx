import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { App, Home, Edit } from "./containers";
import configure from "./store/configure";

const store = configure();
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="edit" component={Edit} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);