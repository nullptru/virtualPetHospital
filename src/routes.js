/**
 * Created by Burgess on 2017/3/1.
 */
import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router'

import Login from './components/Login';
import AdminIndex from './components/admin/Index';
import Main from './components/Main';
import Learning from './components/Learning';
import ErrorPage from './components/Error';
import CasePage from './components/case/CaseCatalog'

import Case from './components/admin/tab/CaseManagement'
import Medicine from './components/admin/tab/MedicineManagement'
import Price from './components/admin/tab/PriceManagement'
import Role from './components/admin/tab/RoleManagement'
import Subject from './components/admin/tab/SubjectManagement'
import User from './components/admin/tab/UserManagement'
import Record from './components/admin/tab/RecordManagement'

export default
(
    <Route path="/" >
        <IndexRoute component={Login}/>
        <Route path='/error' component={ErrorPage}/>
        <Route path='/admin' component={AdminIndex}>
            <IndexRedirect to="/admin/user" />
            <Route path='/admin/user' component={User}/>
            <Route path='/admin/subject' component={Subject}/>
            <Route path='/admin/medicine' component={Medicine}/>
            <Route path='/admin/case' component={Case}/>
            <Route path='/admin/price' component={Price}/>
            <Route path='/admin/role' component={Role}/>
            <Route path='/admin/record' component={Record}/>
        </Route>
        <Route path='/main' component={Main}/>
        <Route path='/learning' component={Learning}/>
        <Route path='/learning/casenav' component={CasePage}/>
    </Route>
)