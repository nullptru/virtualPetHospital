import React from 'react'
import {Row, Col, Table, Button, Label, Pagination} from 'react-bootstrap/lib'
import 'whatwg-fetch'

import BaseModal from '../BaseModal'
import '../../../css/index.css'

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
        if (key.toLowerCase() === 'id') continue;
        rowDom.push(<td key={row[key]+Math.random()}>{row[key]}</td>)
    }
    let dom, button = [];
    if(props.isEditable != false){
        button.push(<Button bsSize='xsmall' onClick={()=>{props.onEdit(row.id)}} key='edit'>修改</Button>);
        button.push('   ');
   }
    if(props.isDeletable != false)
        button.push(<Button bsSize='xsmall' onClick={()=>{props.onDelete(row.id)}} key='delete'>删除</Button>);

    dom = <td key="button">{button}</td>
    rowDom.push(dom);
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
                {(props.isCreatable != false) ? <a onClick={props.onNew}><h5 style={{marginTop: '40px'}}><Label>+</Label>&nbsp;&nbsp;{props.add}</h5></a> : ''}
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
        <Row
            className="tab-center">
            <Pagination
                prev
                next
                ellipsis
                boundaryLinks
                items={props.pages}
                maxButtons={5}
                activePage={props.activePage}
                onSelect={props.onPageSelect} />
        </Row>
        <BaseModal show={props.show} title={props.modalTitle}
                   onClose={props.onClose} onSubmit={props.onSubmit}>
            {props.children}
        </BaseModal>
    </div>
}