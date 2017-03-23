import React, {Component, ProtoType} from 'react';
import {
    PageHeader, Grid, Row, Col
} from 'react-bootstrap';
import DescriptionPanel from './content/DescriptionPanel';
import {Link} from 'react-router';

/*下面内容是从数据库中获得的，根据caseId*/
/*const testJson = [
 {'text': '抽搐不止', 'img': 'symptom_img_url', 'video': 'symptom_video_url'},
 {'text': '抽一管血', 'img': 'exam_img_url', 'video': 'exam_video_url'},
 {'text': 'xxx浓度超过aaa则有问题', 'img': 'labIndex_img_url', 'video': 'labIndex_video_url'},
 {'text': '打疫苗', 'img': 'treatment_img_url', 'video': 'treatment_video_url'}
 ]*/

export default class CaseDescription extends Component {
    constructor(props) {
        super(props);
        //详细病例所包含的部分
        this.caseClassName = ['症状', '相关检查', '化验指标', '治疗手段'];
        this.caseClassKey = ['symptom', 'examination', 'result', 'method'];
        this.severUrlPrefix = "http://localhost:8080";
        this.state = {
            caseName: "病例名称",
            caseId: this.props.params.id,//病例的id
            //用于结构
            description: {
                symptom: {'text': 's', 'img': '', 'video': ''},
                examination: {'text': 'e', 'img': '', 'video': ''},
                result: {'text': 'r', 'img': '', 'video': ''},
                method: {'text': 'm', 'img': '', 'video': ''}
            }
        }
    }

    /*在rend之后将内容进行一次更新*/
    componentDidMount() {
        fetch(this.severUrlPrefix + this.props.location.pathname)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({description: json.caseContent});
                this.setState({caseName: json.caseName});
            })
            .catch((ex) => {
                console.error(ex);
            });
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
        this.caseClassName.forEach((panel_name) => {
            caseContentDom.push(
                <DescriptionPanel key={this.caseClassKey[count]} panelName={panel_name}
                                  caseId={this.state.caseId}
                                  panelContent={this.state.description[this.caseClassKey[count]]}
                />
            );
            count++;
        });


        const pageInstance = (
            <Grid style={{margin: '50px'}}>
                {this.getPageHeader()}
                <Row id="caseDescription-caseName">
                    <Col md={5}>
                        <PageHeader>
                            <small>{this.state.caseId}:{this.state.caseName}</small>
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