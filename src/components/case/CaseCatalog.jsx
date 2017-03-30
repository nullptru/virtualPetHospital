import React, {Component, ProtoType} from 'react';
import {
    View, Grid, Form,
    Nav, NavItem, Row, Col
} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
import SearchModal from './content/SearchModal';
import CaseCatalogTab from './content/CaseCatalogTab';
import '../../css/case.css';

const resultList = [{'caseName': '犬瘟热', 'caseId': 'cid01'},
    {'caseName': '犬细小病毒', 'caseId': 'cid02'},
    {'caseName': '犬传染性肝炎', 'caseId': 'cid03'},
    {'caseName': '犬冠状病毒', 'caseId': 'cid04'},
    {'caseName': '猫泛白细胞减少症', 'caseId': 'cid05'},
    {'caseName': '猫病毒性病气管炎', 'caseId': 'cid06'},
    {'caseName': '皮肤真菌感染', 'caseId': 'cid07'}];

const contagionCaseList = [{'caseName': '犬瘟热', 'caseId': 'cid01'},
    {'caseName': '犬细小病毒', 'caseId': 'cid02'},
    {'caseName': '犬传染性肝炎', 'caseId': 'cid03'},
    {'caseName': '犬冠状病毒', 'caseId': 'cid04'},
    {'caseName': '猫泛白细胞减少症', 'caseId': 'cid05'},
    {'caseName': '猫病毒性病气管炎', 'caseId': 'cid06'},
    {'caseName': '皮肤真菌感染', 'caseId': 'cid07'}];

const parasitosisCaseList = [{'caseName': '蛔虫病', 'caseId': 'cid08'},
    {'caseName': '钩虫病', 'caseId': 'cid09'},
    {'caseName': '绦虫病', 'caseId': 'cid10'},
    {'caseName': '球虫病', 'caseId': 'cid11'},
    {'caseName': '疥螨虫病', 'caseId': 'cid12'},
    {'caseName': '蚤病', 'caseId': 'cid13'}];

const internalCaseList = [{'caseName': '口炎', 'caseId': 'cid14'},
    {'caseName': '肠炎', 'caseId': 'cid15'},
    {'caseName': '肠便秘', 'caseId': 'cid16'},
    {'caseName': '胰腺炎', 'caseId': 'cid17'},
    {'caseName': '肝炎', 'caseId': 'cid18'},
    {'caseName': '腹膜炎', 'caseId': 'cid19'},
    {'caseName': '肛门腺炎', 'caseId': 'cid20'},
    {'caseName': '感冒', 'caseId': 'cid21'},
    {'caseName': '鼻炎', 'caseId': 'cid22'},
    {'caseName': '气管支气管炎', 'caseId': 'cid23'},
    {'caseName': '肺炎', 'caseId': 'cid24'},
    {'caseName': '心力衰竭', 'caseId': 'cid25'},
    {'caseName': '尿道感染', 'caseId': 'cid26'},
    {'caseName': '尿结石', 'caseId': 'cid27'},
    {'caseName': '膀胱炎', 'caseId': 'cid28'},
    {'caseName': '肾炎', 'caseId': 'cid29'},
    {'caseName': '佝偻病', 'caseId': 'cid30'},
    {'caseName': '有机磷中毒', 'caseId': 'cid31'},
    {'caseName': '糖尿病', 'caseId': 'cid32'},
    {'caseName': '耳血肿', 'caseId': 'cid33'},
    {'caseName': '中耳炎', 'caseId': 'cid34'},
    {'caseName': '眼睑内翻', 'caseId': 'cid35'},
    {'caseName': '结膜炎', 'caseId': 'cid36'},
    {'caseName': '角膜炎', 'caseId': 'cid37'}];

const obstetricsCaseList = [{'caseName': '外伤', 'caseId': 'cid38'},
    {'caseName': '外科感染', 'caseId': 'cid39'},
    {'caseName': '骨折', 'caseId': 'cid40'},
    {'caseName': '关节脱位', 'caseId': 'cid41'},
    {'caseName': '湿疹', 'caseId': 'cid42'},
    {'caseName': '皮炎', 'caseId': 'cid43'},
    {'caseName': '脓皮病', 'caseId': 'cid44'},
    {'caseName': '脱毛症', 'caseId': 'cid45'},
    {'caseName': '趾间囊肿', 'caseId': 'cid46'},
    {'caseName': '疝', 'caseId': 'cid47'},
    {'caseName': '阴道炎', 'caseId': 'cid48'},
    {'caseName': '阴道脱出', 'caseId': 'cid49'},
    {'caseName': '子宫蓄脓', 'caseId': 'cid50'},
    {'caseName': '难产', 'caseId': 'cid51'},
    {'caseName': '乳房炎', 'caseId': 'cid52'}
];

const surgeryCaseList = [{'caseName': '绝育', 'caseId': 'cid53'},
    {'caseName': '剖腹产', 'caseId': 'cid54'},
    {'caseName': '瞬膜腺增生物切除', 'caseId': 'cid55'},
    {'caseName': '眼球摘除', 'caseId': 'cid56'},
    {'caseName': '立耳术', 'caseId': 'cid57'},
    {'caseName': '断尾术', 'caseId': 'cid58'}];

const immuneCaseList = [{'caseName': '犬免疫程序', 'caseId': 'cid59'},
    {'caseName': '猫免疫程序', 'caseId': 'cid60'}];

export default class CaseStudyNav extends Component {
    constructor(props) {
        super(props);
        //绑定方法
        this.handleSelect = this.handleSelect.bind(this);
        this.onModalClose = this.onModalClose.bind(this);//close modal
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchContentChange = this.onSearchContentChange.bind(this);
        this.onEnterPress = this.onEnterPress.bind(this);

        //病例分类的名称
        this.caseClass = ['传染病', '寄生虫病', '内科病例', '外产科病例', '常用手术', '免疫'];
        //对应caseClass的key
        this.caseKey = ['contagion', 'parasitosis', 'internal', 'obstetrics', 'surgery', 'immune'];
        this.severUrlPrefix = "http://localhost:8080";
        let location = this.props.location.pathname,
            keysArr = location.split('/');
        let initActiveKey = keysArr[keysArr.length - 1] || this.caseKey[0];
        console.info();
        this.state = {
            activeKey: initActiveKey,
            searchShow: false,
            searchContent: "",
            searchResList: [],//形式都一样，展示病例名称，跳转根据caseId
            caseList: []
        };

    }

    componentDidMount(){
        this.getCaseTabContent(this.state.activeKey);
    }

    getCaseTabContent(e) {
        let caseTmpList;

        switch (e) {
            case "contagion"://传染病
                caseTmpList = contagionCaseList;
                break;
            case "parasitosis"://寄生虫病
                caseTmpList = parasitosisCaseList
                break;
            case "internal"://内科病例
                caseTmpList = internalCaseList;
                break;
            case "obstetrics"://外产科病例
                caseTmpList = obstetricsCaseList;
                break;
            case "surgery"://常用手术
                caseTmpList = surgeryCaseList;
                break;
            case "immune"://免疫
                caseTmpList = immuneCaseList;
                break;
        }
        this.setState({caseList: caseTmpList});

        /*fetch(this.severUrlPrefix + `/learning/casenav/${e}`)
         .then((response) => {
         return response.json();
         })
         .then((json) => {
         this.setState({caseList: json.caseList});
         }).catch(ex => {
         console.error(ex);
         });*/
    }


    handleSelect(e) {//用于更新tab内容
        this.setState({activeKey: e});
        browserHistory.push(`/learning/casenav/${e}`);
        this.getCaseTabContent(e);
    }

    onSearchClick() {//点击searchbutton时
        /*fetch(/!*this.severUrlPrefix*!/ `http://localhost:9090` + `/learning/casenav/search`,
         {method: 'post', body: {searchContent: this.state.searchContent}})
         .then((response) => {
         return response.json();
         })
         .then((json) => {
         this.setState({searchResList: json.resultList});
         })
         .catch((ex) => {
         console.error(ex);
         });*/
        this.setState({searchResList: resultList});
        this.setState({searchShow: true});
    }

    onModalClose() {
        this.setState({searchResList: []});
        this.setState({searchShow: false});
        this.setState({searchContent: ""});
    }

    onSearchContentChange(e) {
        this.setState({searchContent: e.target.value});
    }

    /*构建nav标签*/
    getCaseClassNav() {
        let caseClassDom = [], count = 0;
        this.caseKey.forEach((case_key) => {
            caseClassDom.push(<NavItem eventKey={case_key} key={case_key}>{this.caseClass[count++]}</NavItem>);
        });
        return caseClassDom;
    }

    onEnterPress(e) {
        if ((event.keyCode || event.which) == 13) {
            this.onSearchClick();
        }
    }

    onCaseClick(e) {
        browserHistory.push(`/learning/casedes/${e}`);
    }

    render() {
        return (
            <div className="case-outer-box">
                <Grid style={{marginTop: '50px', marginBottom: '50px'}}>
                    <Row style={{marginBottom: '20px'}}>
                        <Col md={2}><Link className="btn-menu-link-case" to='/learning'>返回上级 <span
                            className="glyphicon glyphicon-triangle-top"></span></Link></Col>
                        <Col md={7}><h1 style={{color: '#fff', textShadow: '0 0 5px #3f8dc9'}}>虚拟宠物医院学习系统 | 病例学习</h1>
                        </Col>
                        <Col md={3}>
                            <Form inline style={{marginTop: '27px'}}>
                                <input type="text" onChange={this.onSearchContentChange}
                                       value={this.state.searchContent}
                                       onKeyPress={this.onEnterPress}
                                       onKeyDown={this.onEnterPress}
                                       className="inputSearch"/>
                                <a className="btnSearch"
                                   onClick={this.onSearchClick}>搜索</a>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="clearfix">
                        <Col sm={2} md={2} className="tab-nav">
                            <Nav bsStyle="pills" stacked onSelect={this.handleSelect} activeKey={this.state.activeKey}
                                 id="caseStudyMenu">
                                {this.getCaseClassNav()}
                            </Nav>
                        </Col>
                        <Col sm={10} md={10} className="tab-container tab-content">
                            <CaseCatalogTab tabName={this.state.activeKey}
                                            onCaseClick={this.onCaseClick}
                                            caseList={this.state.caseList}>
                                {this.props.children}
                            </CaseCatalogTab>
                        </Col>
                    </Row>
                    {/*下面是搜索结果的弹出*/}
                    <SearchModal show={this.state.searchShow}
                                 searchContent={this.state.searchContent}
                                 searchResultList={this.state.searchResList}
                                 onClose={this.onModalClose}>
                        {this.props.children}
                    </SearchModal>
                </Grid>
            </div>
        );
    }

}