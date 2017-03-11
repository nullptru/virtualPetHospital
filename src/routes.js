/**
 * Created by Burgess on 2017/3/1.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router'

import Login from './components/Login';
import AdminIndex from './components/admin/Index';
import Main from './components/Main';
import Learning from './components/Learning';
import ErrorPage from './components/Error';
import CasePage from './components/case/CaseStudyNav'

export default
(
    <Route path="/" >
        <IndexRoute component={Login}/>
        <Route path='/error' component={ErrorPage}/>
        <Route path='/admin' component={AdminIndex}/>
        <Route path='/main' component={Main}/>
        <Route path='/main/learning' component={Learning}/>
        <Route path='/main/learning/casenav' component={CasePage}/>
    </Route>
)