import React, {Component, ProtoType} from 'react';
import {
    PageHeader, Grid, Row, Col
} from 'react-bootstrap';
import DescriptionPanel from './content/DescriptionPanel';
import {Link} from 'react-router';

/*下面内容是从数据库中获得的，根据caseId*/
const testJson = [
    {'text': '抽搐不止', 'img': 'symptom_img_url', 'video': 'symptom_video_url'},
    {'text': '抽一管血', 'img': 'exam_img_url', 'video': 'exam_video_url'},
    {'text': 'xxx浓度超过aaa则有问题', 'img': 'labIndex_img_url', 'video': 'labIndex_video_url'},
    {'text': '打疫苗', 'img': 'treatment_img_url', 'video': 'treatment_video_url'}
]

export default class CaseDescription extends Component {
    constructor(props) {
        super(props);
        //详细病例所包含的部分
        this.caseContentClass = ['症状', '相关检查', '化验指标', '治疗手段'];
        this.caseName = "病例名称";
        this.caseId = this.props.params.id;//病例的id
        this.content = {
            description: testJson
        };
    }

    getPageHeader() {
        return (
            <Row id="caseDescription-pageHeader">
                <Col md={3}>
                    <Link to='/learning/casenav'>{'<< '}返回上级</Link>
                </Col>
            </Row>);
    }

    render() {
        let caseContentDom = [], count = 0;
        this.caseContentClass.forEach((case_content) => {
            caseContentDom.push(
                <DescriptionPanel panelName={case_content} caseId={this.caseId}
                                  panelContent={this.content.description[count++]}
                />
            );
        });


        const pageInstance = (
            <Grid style={{margin: '50px'}}>
                {this.getPageHeader()}
                <Row id="caseDescription-caseName">
                    <Col md={5}>
                        <PageHeader>
                            <small>{this.caseId}:{this.caseName}</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row id="caseDescription-panel">
                    <Col >
                        {caseContentDom}
                    </Col>
                </Row>
            </Grid>
        );
        return pageInstance;
    }
}