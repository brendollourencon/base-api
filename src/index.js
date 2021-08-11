import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import {AuthProvider} from "./AuthContext";
import Login from "./pages/Login";
import {Home} from "./pages/Home";

ReactDOM.render(
    <AuthProvider>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/usuarios">
                    usuarios
                </Route>
            </Switch>
        </Router>
    </AuthProvider>,
    document.getElementById('root')
);