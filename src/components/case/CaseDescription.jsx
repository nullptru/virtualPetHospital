import React, {Component, ProtoType} from 'react';
import {
    PageHeader, Grid, Row, Col
} from 'react-bootstrap';
import DescriptionPanel from './content/DescriptionPanel';
import {Link} from 'react-router';
import "../../css/case.css";
import CasePicModal from './content/CasePicModal';
import CaseVideoModal from './content/CaseVideoModal';

let caseContent = {
    symptom: {
        'description': '抽搐不止',
        'picture': "['/assets/pet/pet1.jpg', '/assets/pet/pet2.jpg', '/assets/pet/pet3.jpg']",
        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
    },
    exam: {
        'description': '抽一管血',
        'picture': "['/assets/pet/pet4.jpg', '/assets/pet/pet5.jpg']",
        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
    },
    result: {
        'description': 'xxx浓度超过aaa则有问题',
        'picture': "['/assets/pet/pet6.jpg', '/assets/pet/pet7.jpg']",
        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
    },
    method: {
        'description': '打疫苗',
        'picture': "['/assets/pet/pet8.jpg', '/assets/pet/pet9.jpg', '/assets/pet/pet10.jpg']",
        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
    }
};

export default class CaseDescription extends Component {
    constructor(props) {
        super(props);
        //详细病例所包含的部分
        this.caseClassName = ['症状', '相关检查', '化验指标', '治疗手段'];
        this.caseClassKey = ['symptom', 'exam', 'result', 'method'];
        this.severUrlPrefix = "http://localhost:8080";
        this.state = {
            caseName: "病例名称",
            caseId: this.props.params.id,//病例的id
            //用于结构
            description: {
                symptom: {'description': '', 'picture': '[]', 'video': ''},
                exam: {'description': '', 'picture': '[]', 'video': ''},
                result: {'description': '', 'picture': '[]', 'video': ''},
                method: {'description': '', 'picture': '[]', 'video': ''}
            },
            //description: caseContent,
            pictureModalShow: false,
            videoModalShow: false,
            currentPicList: '[]',
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
                console.info(json)
                console.info("casedes json-caseName:" + json.caseName);
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
                                  }}
                                  onVideoShow={(e) => {
                                      this.setState({currentVideoUrl: e});
                                      this.setState({currentPanelName: panel_name});
                                      this.setState({videoModalShow: true});
                                  }}>
                    {this.props.children}
                </DescriptionPanel>
            );
            count++;
        });

        const pageInstance = (
            <div className="case-outer-box">
                <Grid style={{marginTop: '50px', marginBottom: '50px'}} className="caseDesGrid">
                    <Row id="caseDescription-pageHeader">
                        <Col md={2}><Link className="btn-menu-link-case" to='/learning/casenav/contagion'>返回上级 <span
                            className="glyphicon glyphicon-triangle-top"></span></Link></Col>
                        <Col md={10}><h1 style={{color: '#fff', textShadow: '0 0 5px #3f8dc9'}}>虚拟宠物医院学习系统 | 病例详情</h1>
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
                </Grid>
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
                {/*点击panel内的视频button弹出*/}
                <CaseVideoModal show={this.state.videoModalShow}
                                onClose={() => {
                                    this.setState({videoModalShow: false});
                                }}
                                videoUrl={this.state.currentVideoUrl}
                                modalTitle={this.state.currentPanelName}
                >
                    {this.props.children}
                </CaseVideoModal>
            </div>
        );
        return pageInstance;
    }
}