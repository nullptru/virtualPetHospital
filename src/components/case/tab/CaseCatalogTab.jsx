import React, {Component, ProtoType} from 'react';
import {Table, Button, Grid, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class CaseCatalogTab extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const path = e.target.caseId;
    }

    render() {
        let caseClassName = this.props.caseClassName;
        let caseList=this.props.caseList;

        // let caseDom = [];
        // tableJson.forEach((row)=>{
        //     tableDoms.push(<tr key={row.id}>
        //         <td>{row.username}</td>
        //         <td>{row.accessSections}</td>
        //         <td>
        //             <input type="checkbox" id="isActive" defaultChecked={row.isActive}/>
        //         </td>
        //         <td><Button bsSize='xsmall'>修改</Button>&nbsp;&nbsp;<Button bsSize='xsmall'>删除</Button></td>
        //     </tr>);
        // });

        let col = 2, row = 1;
        const catalogTab = (
            <Table condensed hover responsive onClick={this.handleClick}>
                <tbody>
                <tr>
                    <td><Button bsSize="large" caseId="c11">{caseClassName} 1-1</Button></td>
                    <td><Button bsSize="large" caseId="c12">{caseClassName} 1-2</Button></td>
                    <td><Button bsSize="large" caseId="c13">{caseClassName} 1-3</Button></td>
                    <td><Button bsSize="large" caseId="c14">{caseClassName} 1-4</Button></td>
                </tr>
                <tr>
                    <td><Button bsSize="large" caseId="c21">{caseClassName} 2-1</Button></td>
                    <td><Button bsSize="large" caseId="c22">{caseClassName} 2-2</Button></td>
                    <td><Button bsSize="large" caseId="c23">{caseClassName} 2-3</Button></td>
                    <td><Button bsSize="large" caseId="c24">{caseClassName} 2-4</Button></td>
                </tr>
                <tr>
                    <td><Button bsSize="large" caseId="c31">{caseClassName} 3-1</Button></td>
                    <td><Button bsSize="large" caseId="c32">{caseClassName} 3-2</Button></td>
                    <td><Button bsSize="large" caseId="c33">{caseClassName} 3-3</Button></td>
                    <td><Button bsSize="large" caseId="c34">{caseClassName} 3-4</Button></td>
                </tr>
                </tbody>
            </Table>
        );
        return catalogTab;
    }
}