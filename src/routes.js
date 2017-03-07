/**
 * Created by Burgess on 2017/3/1.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router'

import Login from './components/Login';
import AdminIndex from './components/admin/Index';

export default
(
    <Route path="/" >
        <IndexRoute component={Login}/>
        <Route path='/admin' component={AdminIndex}/>
    </Route>
)