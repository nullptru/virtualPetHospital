import React, {Component, ProtoType} from 'react';
import {
    View, Grid, Form,
    Nav, NavItem, Row, Col
} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
import SearchModal from './content/SearchModal';
import CaseCatalogTab from './content/CaseCatalogTab';
import '../../css/case.css';


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
        this.severUrlPrefix = "http://localhost:9090";
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

        this.getCaseTabContent(this.state.activeKey);
    }

    getCaseTabContent(e) {
        fetch(this.severUrlPrefix + `/learning/casenav/${e}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({caseList: json.caseList});
            }).catch(ex => {
            console.error(ex);
        });
    }


    handleSelect(e) {//用于更新tab内容
        this.setState({activeKey: e});
        browserHistory.push(`/learning/casenav/${e}`);
        this.getCaseTabContent(e);
    }

    onSearchClick() {//点击searchbutton时
        fetch(this.severUrlPrefix + `/learning/casenav/search`,
            {method: 'post', body: {searchContent: this.state.searchContent}})
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({searchResList: json.resultList});
            })
            .catch((ex) => {
                console.error(ex);
            });

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
                <Grid style={{marginTop: '50px',marginBottom:'50px'}}>
                    <Row style={{marginBottom:'20px'}}>
                        <Col md={2}><Link className="btn-menu-link-case" to='/learning'>返回上级 <span className="glyphicon glyphicon-triangle-top"></span></Link></Col>
                        <Col md={7}><h1 style={{color:'#fff',textShadow:'0 0 5px #3f8dc9'}}>虚拟宠物医院学习系统 | 病例学习</h1></Col>
                        <Col md={3}>
                            <Form inline style={{marginTop:'27px'}}>
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
                        <Col sm={2} md={2}  className="tab-nav">
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