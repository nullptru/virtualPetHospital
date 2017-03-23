import React, {Component, ProtoType} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import '../../../css/case.css'

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
    {'caseName': 'cn12', 'caseId': 'cid12'}
]
/*根据location获得需要到数据库中搜索的类别，返回caseList*/
export default class CaseCatalogTab extends Component {
    constructor(props) {
        super(props);
        this.btnClick = this.btnClick.bind(this);
        let initLoc = this.props.location.pathname, keysArr = initLoc.split('/');
        console.info("caseCatalogTab location:" + location);
        this.state = {
            caseList: caseList,
            caseName: keysArr[keysArr.length - 1]
        }
    }

    btnClick(e) {
        browserHistory.push(`/learning/casedes/${e}`);
    }

    componentDidMount() {
    }

    render() {
        //获取当前的location
        let rendLocat = this.props.location.pathname,
            rendKeysArr = rendLocat.split('/');

        /*caseList应当从这里进行fetch*/

        let caseRow = [], countCol = 0;
        this.state.caseList.forEach((case_name) => {
            caseRow.push(
                <Col md={3} key={countCol++}>
                    <Button className="btnCase" bsSize="large"
                            onClick={this.btnClick.bind(this, case_name.caseId)}
                            id={case_name.caseId}>
                        {rendKeysArr[rendKeysArr.length - 1]}{case_name.caseName}</Button>
                </Col>);
        });


        const catalogTab = (
            <Row>
                {caseRow}
            </Row>
        );
        return catalogTab;
    }
}