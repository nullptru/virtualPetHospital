import React, {Component, ProtoType} from 'react';
import {
    View, Grid, Form,
    Nav, NavItem, Button, FormGroup, FormControl,
    Row, Col
} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
import SearchModal from './content/SearchModal';

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
    {'caseName': 'cn12', 'caseId': 'cid12'},
    {'caseName': 'cn13', 'caseId': 'cid13'},
];


export default class CaseStudyNav extends Component {
    constructor(props) {
        super(props);
        //绑定方法
        this.handleSelect = this.handleSelect.bind(this);
        this.onModalClose = this.onModalClose.bind(this);//close modal
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchContentChange = this.onSearchContentChange.bind(this);

        //病例分类的名称
        this.caseClass = ['传染病', '寄生虫病', '内科病例', '外产科病例', '常用手术', '免疫'];
        //对应caseClass的key
        this.caseKey = ['contagion', 'parasitosis', 'internal', 'obstetrics', 'surgery', 'immune'];

        let location = this.props.location.pathname,
            keysArr = location.split('/');
        let initActiveKey = keysArr[keysArr.length - 1] || this.caseKey[0];
        console.info("caseStudyNav activeKey in constructor:" + initActiveKey);
        this.state = {
            activeKey: initActiveKey,
            searchShow: false,
            searchContent: "",
            searchResList: caseList,//形式都一样，展示病例名称，跳转根据caseId
        };
    }

    handleSelect(e) {//用于更新tab内容
        this.setState({activeKey: e});
        browserHistory.push(`/learning/casenav/${e}`);
    }

    onSearchClick() {//点击searchbutton时
        /*fetch(`http://localhost:8080/learning/casenav/search`,
         {method: 'post', body: {searchContent: this.state.searchContent}})
         .then((response) => {
         return response.json();
         })
         .then((json) => {
         console.info("search result" + json.resultList);
         this.setState = {searchResList: json.resultList};
         })
         .catch((ex) => {
         console.error(ex);
         });
         console.info("resultList=" + this.state.searchResList);*/
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

    getPageHeader() {
        return (
            <Row>
                <Col md={3}>
                    <Link to='/learning'>{'<< '}返回上级</Link>
                </Col>
                <Col md={3} xsOffset={6}>
                    <Form inline>
                        <input type="text" className="input" onChange={this.onSearchContentChange}
                               value={this.state.searchContent}/>
                        {"   "}
                        <Button type="button" onClick={this.onSearchClick}>search</Button>
                    </Form>
                </Col>
            </Row>);
    }

    render() {
        return (
            <Grid style={{margin: '50px'}}>
                {this.getPageHeader()}
                <Row className="clearfix">
                    <Col sm={3} md={3} className="tab-nav">
                        <Nav bsStyle="pills" stacked onSelect={this.handleSelect} activeKey={this.state.activeKey}
                             id="caseStudyMenu">
                            {this.getCaseClassNav()}
                        </Nav>
                    </Col>

                    <Col sm={9} md={9} className="tab-container">
                        {this.props.children}
                    </Col>
                </Row>
                {/*下面是搜索结果的弹出*/}
                <SearchModal show={this.state.searchShow}
                             searchContent={this.state.searchContent}
                             searchResList={this.state.searchResList}
                             onClose={this.onModalClose}>
                    {this.props.children}
                </SearchModal>
            </Grid>
        );
    }

}