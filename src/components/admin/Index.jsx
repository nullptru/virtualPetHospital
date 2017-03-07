import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Tab, Nav, NavItem, Label, Table, Checkbox, Button} from 'react-bootstrap/lib'
import '../../css/index.css'

export default class Index extends Component {
    constructor(){
        super();
        this.handleSelect.bind(this);
        this.sections = ['用户管理','科室管理','角色管理','药品管理','收费管理','病例管理'];
    }

    handleSelect(){

    }

    render() {
        let sectionsDom = [], count = 0;
        this.sections.forEach((section)=>{
            sectionsDom.push(<NavItem eventKey={section} key={count++}>{section}</NavItem>);
        });

        const tabsInstance = (
            <Grid style={{margin:'50px'}}>
                <Tab.Container defaultActiveKey={this.sections[0]} onSelect={this.handleSelect} id="adminMenu">
                <Row className="clearfix">
                    <Col sm={3} md={3} className="tab-nav">
                        <Nav bsStyle="pills" stacked>
                            {sectionsDom}
                        </Nav>
                    </Col>
                    <Col sm={9} md={9} className="tab-container">
                        <Tab.Content animation>
                            <Tab.Pane eventKey={this.sections[0]}>
                                {/*container*/}
                                <div>
                                    <Row>
                                        <Col sm={4} md={4}>
                                            <h3>用户管理</h3>
                                        </Col>
                                        <Col sm={3} md={3} mdOffset={4} smOffset={4}>
                                            <a><h5 style={{marginTop: '40px'}}><Label>+</Label> 添加角色</h5></a>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Table striped bordered condensed hover responsive>
                                            <thead>
                                            <tr>
                                                <th>角色名</th>
                                                <th>可访问科室</th>
                                                <th>是否启用</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>
                                                    <input type="checkbox" id="isActive"/>
                                                </td>
                                                <td><Button bsSize='xsmall'>修改</Button>&nbsp;&nbsp;<Button bsSize='xsmall'>删除</Button></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>
                                                    <input type="checkbox" id="isActive"/>
                                                </td>
                                                <td><Button bsSize='xsmall'>修改</Button>&nbsp;&nbsp;<Button bsSize='xsmall'>删除</Button></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>
                                                    <input type="checkbox" id="isActive"/>
                                                </td>
                                                <td><Button bsSize='xsmall'>修改</Button>&nbsp;&nbsp;<Button bsSize='xsmall'>删除</Button></td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Row>
                                </div>
                                <Button className="tab-center">保存</Button>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Grid>
        );

        return tabsInstance
    }
}