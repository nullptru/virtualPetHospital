import React, {Component, ProtoType} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import '../../../css/case.css'

/*根据location获得需要到数据库中搜索的类别，返回caseList*/
export default function CaseCatalogTab(props) {
    //获取当前的location
    let caseBtnList = props.caseList;
    let tabName = props.tabName;
    let caseRow = [], countCol = 0;
    caseBtnList.forEach((case_name) => {
        caseRow.push(
            <Col md={3} key={countCol++}>
                <Button bsSize="large" className="btnCase"
                        onClick={props.onCaseClick.bind(this, case_name.caseId)}
                        id={case_name.caseId}>
                    {case_name.caseName}</Button>
            </Col>);
    });


    const catalogTab = (
        <Row>
            {caseRow}
        </Row>
    );
    return catalogTab;
}
