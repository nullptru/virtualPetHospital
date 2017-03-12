import React from 'react'
import {Row, Col, Table, Button, Label} from 'react-bootstrap/lib'
import 'whatwg-fetch'

import BaseModal from '../BaseModal'

let getHeader = function getHeader(headers){
    let headerDoms = [];
    headers.forEach((row)=>{
        headerDoms.push(
            <th key={row}>{row}</th>);
    });
    return headerDoms;
};

let getFormRow = function getFormRow(row, props){
    let rowDom = [];
    for (let key in row){
        if (key === 'id') continue;
        rowDom.push(<td key={row[key]}>{row[key]}</td>)
    }
    rowDom.push(<td key="button"><Button bsSize='xsmall' onClick={()=>{props.onEdit(row.id)}}>修改</Button>&nbsp;&nbsp;<Button bsSize='xsmall' onClick={()=>{props.onDelete(row.id)}}>删除</Button></td>);
    return (<tr key={row.id}>
        {rowDom}
    </tr>);
};

//hearder, title, add, tableJson, show ,child, onClose, onSubmit
export default function BaseAdminComponent(props){
    let tableDoms = [], tableJson = props.tableJson || [];
    tableJson.forEach((row)=>{
        tableDoms.push(getFormRow(row, props));
    });

    return <div>
        <Row>
            <Col sm={4} md={4}>
                <h3>{props.title}</h3>
            </Col>
            <Col sm={3} md={3} mdOffset={4} smOffset={4}>
                <a onClick={props.onNew}><h5 style={{marginTop: '40px'}}><Label>+</Label>&nbsp;&nbsp;{props.add}</h5></a>
            </Col>
        </Row>
        <Row>
            <Table striped bordered condensed hover responsive>
                <thead>
                <tr>
                    {getHeader(props.header)}
                </tr>
                </thead>
                <tbody>
                {tableDoms}
                </tbody>
            </Table>
        </Row>
        <BaseModal show={props.show} title={props.modalTitle}
                   onClose={props.onClose} onSubmit={props.onSubmit}>
            {props.children}
        </BaseModal>
    </div>
}