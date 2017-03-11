import React, {Component, ProtoType} from 'react';
import {
    Panel,PageHeader
} from 'react-bootstrap';

export default class CaseDescription extends Component {
    constructor() {
        super();
        this.caseContentClass = ['症状', '相关检查', '化验指标', '治疗手段'];//list
        this.caseName = "病例名称";
    }

    render() {
        const pageHeaderInstance = (
            <PageHeader>
                <small>{this.caseName}</small>
            </PageHeader>
        );
        let caseContentDom = [];
        this.caseContentClass.forEach((case_content) => {
            caseContentDom.push(<Panel header={case_content}>{case_content}的内容</Panel>);
        });


        const pageInstance = (
            <div id="caseDescription">
                <div id="caseDescription-header">
                    {pageHeaderInstance}
                </div>
                <div id="caseDescription-panel">
                    {caseContentDom}
                </div>
            </div>
        );
        return pageInstance;
    }
}