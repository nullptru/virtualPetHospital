import React, {Component, ProtoType} from 'react';
import {
    View, Grid, Form,
    Nav, NavItem, Button, FormGroup, FormControl,
    Navbar, Row, Col, Tab, Table
} from 'react-bootstrap';

export default class CaseStudyNav extends Component {
    constructor() {
        super();
        this.caseClass = ['传染病', '寄生虫病', '内科病例', '外产科病例', '常用手术', '免疫'];//list
    }

    handleSelect() {

    }

    render() {
        /*构建标签头*/
        let caseClassDom = [], count = 0;
        this.caseClass.forEach((case_class) => {
            caseClassDom.push(<NavItem eventKey={case_class} key={count++}>{case_class}</NavItem>);
        });

        const headerInstance = (
            <Navbar >
                <Navbar.Header inline>
                    <Button type="button">返回</Button>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" placeholder="Case Search"/>
                        </FormGroup>
                        <Button type="submit">Search</Button>
                    </Navbar.Form>
                </Navbar.Header>
            </Navbar>
        );

        const tabContent = (
            <Table responsive>
                <tbody>
                <tr>
                    <td><Button bsSize="large">case1 1-1</Button></td>
                    <td><Button bsSize="large">case1 1-2</Button></td>
                    <td><Button bsSize="large">case1 1-3</Button></td>
                    <td><Button bsSize="large">case1 1-4</Button></td>
                    <td><Button bsSize="large">case1 1-5</Button></td>
                    <td><Button bsSize="large">case1 1-6</Button></td>
                </tr>
                <tr>
                    <td><Button bsSize="large">case1 2-1</Button></td>
                    <td><Button bsSize="large">case1 2-2</Button></td>
                    <td><Button bsSize="large">case1 2-3</Button></td>
                    <td><Button bsSize="large">case1 2-4</Button></td>
                    <td><Button bsSize="large">case1 2-5</Button></td>
                    <td><Button bsSize="large">case1 2-6</Button></td>
                </tr>
                <tr>
                    <td><Button bsSize="large">case1 3-1</Button></td>
                    <td><Button bsSize="large">case1 3-2</Button></td>
                    <td><Button bsSize="large">case1 3-3</Button></td>
                    <td><Button bsSize="large">case1 3-4</Button></td>
                </tr>
                </tbody>
            </Table>
        );

        const tabsInstance = (
            <Grid style={{margin: '50px'}}>
                <Tab.Container defaultActiveKey={this.caseClass[0]} onSelect={this.handleSelect} id="caseStudyMenu">
                    <Row className="clearfix">
                        <Col sm={3} md={3} className="tab-nav">
                            <Nav bsStyle="pills" stacked>
                                {caseClassDom}
                            </Nav>
                        </Col>
                        <Col sm={9} md={9} className="tab-container">
                            <Tab.Content animation>
                                <Tab.Pane eventKey={this.caseClass[0]}>
                                    {tabContent}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Grid>);

        const pageInstance = (
            <div id="caseStudyNav">
                <div id="caseStudyNav-header">
                    {headerInstance}
                </div>
                <div id="caseStudyNav-tabContent">
                    {tabsInstance}
                </div>
            </div>
        );
        return pageInstance;
    }


}