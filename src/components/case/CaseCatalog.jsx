import React, {Component, ProtoType} from 'react';
import {
    View, Grid, Form,
    Nav, NavItem, Button, FormGroup, FormControl,
    Row, Col,
} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';

const caseList = [
    {'caseName': 'cn01', 'caseId': 'cid01'},
    {'caseName': 'cn02', 'caseId': 'cid02'},
    {'caseName': 'cn03', 'caseId': 'cid03'},
    {'caseName': 'cn04', 'caseId': 'cid04'},
    {'caseName': 'cn05', 'caseId': 'cid05'},
    {'caseName': 'cn06', 'caseId': 'cid06'},
    {'caseName': 'cn07', 'caseId': 'cid07'},
    {'caseName': 'cn08', 'caseId': 'cid08'},
    {'caseName': 'cn09', 'caseId': 'cid09'},
    {'caseName': 'cn10', 'caseId': 'cid10'},
    {'caseName': 'cn11', 'caseId': 'cid11'},
    {'caseName': 'cn12', 'caseId': 'cid12'},
    {'caseName': 'cn13', 'caseId': 'cid13'},
]

export default class CaseStudyNav extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        //病例分类的名称
        this.caseClass = ['传染病', '寄生虫病', '内科病例', '外产科病例', '常用手术', '免疫'];
        //对应caseClass的key
        this.caseKey = ['contagion', 'parasitosis', 'internal', 'obstetrics', 'surgery', 'immune'];

        let location = this.props.location.pathname, keysArr = location.split('/');
        console.log("caseKey=" + keysArr[keysArr.length - 1]);
        let activeKey = keysArr[keysArr.length - 1] || this.caseKey[0];
        this.state = {
            activeKey: activeKey,
            caseList: caseList
        };
    }

    handleSelect(e) {
        this.setState({activeKey: e});
        browserHistory.push(`/learning/casenav/${e}`);
    }

    /*构建nav标签*/
    getCaseClassNav() {
        let caseClassDom = [], count = 0;
        this.caseKey.forEach((case_key) => {
            caseClassDom.push(<NavItem eventKey={case_key} key={case_key}>{this.caseClass[count++]}</NavItem>);
        });
        return caseClassDom;
    }

    getPageHeader() {
        return (
            <Row>
                <Col md={3}>
                    <Link to='/learning'>{'<< '}返回上级</Link>
                </Col>
                <Col md={3} xsOffset={6}>
                    <Form inline>
                        <FormGroup controlId="caseSearch">
                            <FormControl type="text" placeholder="search" className="input"/>
                        </FormGroup>
                        {"  "}
                        <Button type="submit">search</Button>
                    </Form>
                </Col>
            </Row>);
    }

    render() {
        return (
            <Grid style={{margin: '50px'}}>
                {this.getPageHeader()}
                <Row className="clearfix">
                    <Col sm={3} md={3} className="tab-nav">
                        <Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.handleSelect}
                             id="caseStudyMenu">
                            {this.getCaseClassNav()}
                        </Nav>
                    </Col>

                    <Col sm={9} md={9} className="tab-container">
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }

}