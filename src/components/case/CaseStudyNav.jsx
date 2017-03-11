import React, {Component} from 'react';
import {
    Grid,
    Nav, NavItem, Button, FormGroup, FormControl,
    Row, Col, Table
} from 'react-bootstrap/lib';
import {Link, browserHistory} from 'react-router';
import logoutMixin from '../../mixin/LogoutHandle'
import reactMixin from 'react-mixin'

export default class CaseStudyNav extends Component {
    constructor() {
        super();
        this.caseClass = ['传染病', '寄生虫病', '内科病例', '外产科病例', '常用手术', '免疫'];//list
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            activeKey: this.caseClass[0]
        }
    }

    handleSelect(e){
        this.setState({activeKey: e});
        //browserHistory.push(`/learning/casenav/${e}`)
    }

    render() {
        /*构建标签头*/
        let caseClassDom = [], count = 0;
        this.caseClass.forEach((case_class) => {
            caseClassDom.push(<NavItem eventKey={case_class} key={count++}>{case_class}</NavItem>);
        });

        const headerInstance = (
            <Row>
                <Col md={2}><Link to='/learning'>{'<<'}返回上级</Link></Col>
                <Col md={3} mdPush={1}  style={{padding: 0}}>
                    <FormGroup>
                        <FormControl type="text" placeholder="Case Search" />
                    </FormGroup>
                </Col>
                <Col md={2} mdPush={1}>
                    <Button type="submit">Search</Button>
                </Col>
            </Row>
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

        const pageInstance = (
            <Grid style={{margin: '50px'}}>
                {headerInstance}
                <Row id="caseStudyNav-tabContent">
                    <Col sm={3} md={3} className="tab-nav">
                        <Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            {caseClassDom}
                        </Nav>
                    </Col>
                    <Col sm={9} md={9} className="tab-container">
                        {tabContent}
                    </Col>
                </Row>
            </Grid>
        );
        return pageInstance;
    }
}
reactMixin.onClass(CaseStudyNav, logoutMixin);