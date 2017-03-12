import React, {Component, ProtoType} from 'react';
import {
    View, Grid, Form, Link,
    Nav, NavItem, Button, FormGroup, FormControl,
    Navbar, Row, Col, Tab, Table
} from 'react-bootstrap';
import CaseCatalogTab from './tab/CaseCatalogTab';

export default class CaseStudyNav extends Component {
    constructor() {
        super();
        this.caseClass = ['传染病', '寄生虫病', '内科病例', '外产科病例', '常用手术', '免疫'];//list
    }

    handleSelect() {
    }

    getCaseClassNav() {
        let caseClassDom = [], count = 0;
        this.caseClass.forEach((case_class) => {
            caseClassDom.push(<NavItem eventKey={case_class} key={count++}>{case_class}</NavItem>);
        });
        return caseClassDom;
    }

    getCaseClassContent() {
        let classContent = [];
        classContent.push(
            <Tab.Pane eventKey={this.caseClass[0]}>
                <CaseCatalogTab className={this.caseClass[0]} classId="0"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseClass[1]}>
                <CaseCatalogTab className={this.caseClass[1]} classId="1"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseClass[2]}>
                <CaseCatalogTab className={this.caseClass[2]} classId="2"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseClass[3]}>
                <CaseCatalogTab className={this.caseClass[3]} classId="3"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseClass[4]}>
                <CaseCatalogTab className={this.caseClass[4]} classId="4"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseClass[5]}>
                <CaseCatalogTab className={this.caseClass[0]} classId="5"/>
            </Tab.Pane>
        );

        return classContent;
    }


    render() {
        return (
            <Grid style={{margin: '50px'}}>
                <Tab.Container defaultActiveKey={this.caseClass[0]} onSelect={this.handleSelect} id="caseStudyMenu"
                               ref={(container) => this.container = container}>
                    <Row className="clearfix">
                        <Col sm={3} md={3} className="tab-nav">
                            <Nav bsStyle="pills" stacked>
                                {this.getCaseClassNav()}
                            </Nav>
                        </Col>
                        <Col sm={9} md={9} className="tab-container">
                            <Tab.Content animation>
                                {this.getCaseClassContent()}
                            </Tab.Content>
                        </Col>
                    </Row></Tab.Container>
            </Grid>
        );
    }

}