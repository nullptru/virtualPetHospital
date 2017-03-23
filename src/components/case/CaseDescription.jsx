import React, {Component, ProtoType} from 'react';
import {
    PageHeader, Grid, Row, Col
} from 'react-bootstrap';
import DescriptionPanel from './content/DescriptionPanel';
import {Link} from 'react-router';
import "../../css/case.css";
import CasePicModal from './content/CasePicModal';

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
                symptom: {'text': '', 'img': [], 'video': ''},
                examination: {'text': '', 'img': [], 'video': ''},
                result: {'text': '', 'img': [], 'video': ''},
                method: {'text': '', 'img': [], 'video': ''}
            },
            pictureModalShow: false,
            videoModalShow: false,
            currentPicList: ['/assets/icon_assistant.jpg', '/assets/icon_case.jpg', '/assets/icon_doctor.jpg'],
            currentVideoUrl: "",
            currentPanelName: "病症"
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

    render() {
        let caseContentDom = [], count = 0;
        this.caseClassName.forEach((panel_name) => {
            caseContentDom.push(
                <DescriptionPanel key={this.caseClassKey[count]} panelName={panel_name}
                                  caseId={this.state.caseId}
                                  panelContent={this.state.description[this.caseClassKey[count]]}
                                  onPictureShow={(e) => {
                                      this.setState({currentPicList: e});
                                      this.setState({currentPanelName: panel_name});
                                      this.setState({pictureModalShow: true});
                                  }}>
                    {this.props.children}
                </DescriptionPanel>
            );
            count++;
        });

        const pageInstance = (
            <Grid style={{margin: '50px'}} className="caseDesGrid">
                <Row id="caseDescription-pageHeader">
                    <Col md={3}>
                        <Link to='/learning/casenav'>{'<< '}返回上级</Link>
                    </Col>
                </Row>
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
                {/*点击panel内的图片button弹出*/}
                <CasePicModal show={this.state.pictureModalShow}
                              onClose={() => {
                                  this.setState({pictureModalShow: false});
                              }}
                              imgList={this.state.currentPicList}
                              modalTitle={this.state.currentPanelName}
                >
                    {this.props.children}
                </CasePicModal>
            </Grid>
        );
        return pageInstance;
    }
}