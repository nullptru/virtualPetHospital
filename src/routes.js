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

import Case from './components/admin/tab/CaseManagement'
import Medicine from './components/admin/tab/MedicineManagement'
import Price from './components/admin/tab/PriceManagement'
import Role from './components/admin/tab/RoleManagement'
import Subject from './components/admin/tab/SubjectManagement'
import User from './components/admin/tab/UserManagement'
import CaseCatalog from './components/case/CaseCatalog'
import CaseDescription from './components/case/CaseDescription'

export default
(
    <Route path="/">
        <IndexRoute component={Login}/>
        <Route path='/error' component={ErrorPage}/>
        <Route path='/admin' component={AdminIndex}>
            <IndexRoute component={User}/>
            <Route path='/admin/user' component={User}/>
            <Route path='/admin/subject' component={Subject}/>
            <Route path='/admin/medicine' component={Medicine}/>
            <Route path='/admin/case' component={Case}/>
            <Route path='/admin/price' component={Price}/>
            <Route path='/admin/role' component={Role}/>
        </Route>
        <Route path='/main' component={Main}/>
        <Route path='/learning' component={Learning}/>
        <Route path='/learning/casenav' component={CaseCatalog}/>
        <Route path='/learning/casedes' component={CaseDescription}/>
    </Route>
)