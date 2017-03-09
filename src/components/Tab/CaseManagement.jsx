import React, {Component, PropTypes} from 'react'
import {Row, Col, Table,Button, Label} from 'react-bootstrap/lib'

export default class CaseManagement extends Component {
    render() {
        let tableJson = this.props.tables;

        let tableDoms = [];
        tableJson.forEach((row)=>{
            tableDoms.push(<tr key={row.id}>
                <td>{row.username}</td>
                <td>{row.accessSections}</td>
                <td>
                    <input type="checkbox" id="isActive" defaultChecked={row.isActive}/>
                </td>
                <td><Button bsSize='xsmall'>修改</Button>&nbsp;&nbsp;<Button bsSize='xsmall'>删除</Button></td>
            </tr>);
        });
        return <div>
            <Row>
                <Col sm={4} md={4}>
                    <h3>病例管理</h3>
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
                    {tableDoms}
                    </tbody>
                </Table>
            </Row>
            <Button className="tab-center">保存</Button>
        </div>
    }
}