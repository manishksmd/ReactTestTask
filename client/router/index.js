/**
 * @Router        :	Index Router
 * @description   : Application url routing.
 * @Created by    : smartData
 */

import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

// Import components to route
import App from '../components/app';
import Momoweb from '../components/Momoweb';

export default(
<Router history={browserHistory}>
    <Route path="/" component={Momoweb}></Route>
 </Router>
);
