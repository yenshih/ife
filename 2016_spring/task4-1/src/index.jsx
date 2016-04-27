import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { App, Home, Edit } from "./containers/index";
import configure from "./store/configure";

const store = configure();
const history = syncHistoryWithStore(browserHistory, store);

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