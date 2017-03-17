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

import Case from './components/admin/tab/CaseManagement'
import Medicine from './components/admin/tab/MedicineManagement'
import Examination from './components/admin/tab/ExaminationManagement'
import Role from './components/admin/tab/RoleManagement'
import Subject from './components/admin/tab/SubjectManagement'
import User from './components/admin/tab/UserManagement'
import Record from './components/admin/tab/RecordManagement'
import HospitalRecord from './components/admin/tab/HospitalRecordManagement'

import CaseCatalog from './components/case/CaseCatalog'
import CaseDescription from './components/case/CaseDescription'
import CaseCatalogTab from'./components/case/content/CaseCatalogTab'

export default
(
    <Route path="/">
        <IndexRoute component={Login}/>
        <Route path='/error' component={ErrorPage}/>
        <Route path='/admin' component={AdminIndex}>
            <IndexRedirect to="/admin/user"/>
            <Route path='/admin/user' component={User}/>
            <Route path='/admin/subject' component={Subject}/>
            <Route path='/admin/medicine' component={Medicine}/>
            <Route path='/admin/case' component={Case}/>
            <Route path='/admin/examination' component={Examination}/>
            <Route path='/admin/role' component={Role}/>
            <Route path='/admin/record' component={Record}/>
            <Route path='/admin/hospitalRecord' component={HospitalRecord}/>
        </Route>
        <Route path='/main' component={Main}/>
        <Route path='/learning' component={Learning}/>
        <Route path='/learning/casenav' component={CaseCatalog}>
            <IndexRedirect to="/learning/casenav/contagion"/>
            <Route path="/learning/casenav/contagion" component={CaseCatalogTab}/>
            <Route path="/learning/casenav/parasitosis" component={CaseCatalogTab}/>
            <Route path="/learning/casenav/internal" component={CaseCatalogTab}/>
            <Route path="/learning/casenav/obstetrics" component={CaseCatalogTab}/>
            <Route path="/learning/casenav/surgery" component={CaseCatalogTab}/>
            <Route path="/learning/casenav/immune" component={CaseCatalogTab}/>
        </Route>
        <Route path='/learning/casedes/:id' component={CaseDescription}/>
    </Route>
)