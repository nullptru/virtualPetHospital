import React, {Component} from 'react'
import {FormGroup, FormControl, Button, HelpBlock, ControlLabel, Col, Modal, Row} from 'react-bootstrap/lib'
import 'whatwg-fetch'
import Dropzone from 'react-dropzone'

import BaseAdminComponent from './BaseAdminComponent'
import  '../../../css/case.css'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default class CaseManagement extends Component {
    constructor(){
        super();
        //进行函数绑定，防止this指向错误
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
        this.onEditModal = this.onEditModal.bind(this);
        this.onEditSecondModal = this.onEditSecondModal.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onDropVideo = this.onDropVideo.bind(this);
        this.onDropPictures = this.onDropPictures.bind(this);

        this.state = {
            show : false,
            title : '病例管理',
            add : '新增病例',
            header : ["病例名", '症状', '化验项目','诊断结果','治疗方案','操作'],
            //modal Info
            id: '',
            caseName : '',
            symptom : -1,
            exam : -1,
            result : -1,
            method : -1,
            //modal operation
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增病例',//0表示新建，1表示编辑
            //second modal
            showSecondModal: false,
            secondModalTitle: '上传病症',
            tableJson : [],
            originJson : [],
            //分页
            pages: 1,
            activePage : 1,
            //upload
            pictures: [],
            video: [],
            secondModalIndex: 'symptom',
            //secondModalData
            description:'',
            pictureUrls: '',
            videoUrls: '',
        };
    }

    componentDidMount(){
        this.onDataFetch()
    }

    deepCopy(source) {
        let result={};
        for (let key in source) {
            result[key] = typeof source[key]==='object'? this.deepCopy(source[key]): source[key];
        }
        return result;
    }

    onDataFetch(){
        fetch(`http://localhost:8080/admin/case/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json.data , originJson = this.deepCopy(json.data);
            data.forEach((item)=>{
                //解析展现的数据
                item['symptom'] = item['symptom'] !== null ? item['symptom']['description'].substr(0, 10) : "无记录";
                item['exam'] = item['exam'] !== null ? item['exam']['description'].substr(0, 10)  : "无记录";
                item['result'] = item['result'] !== null ? item['result']['description'].substr(0, 10)  : "无记录";
                item['method'] = item['method'] !== null ? item['method']['description'].substr(0, 10)  : "无记录";
            });
            this.setState({tableJson : json.data, originJson : originJson, pages: json.pages});
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onDeleteHandle(id){
        fetch('http://localhost:8080/admin/case',{
            method : 'delete',
            body : JSON.stringify({
                id : id
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json;
            if (data.result === true){
                this.onDataFetch()
            }
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onSubmitHandle(){
        let empty = {
            description: "",
            picture: "",
            video: ""
        };
        let body = {
            caseName : this.state.caseName,
            symptom : this.state.symptom !== -1 ? this.state.symptom : empty,
            exam : this.state.exam !== -1 ? this.state.exam : empty,
            result : this.state.result !== -1 ? this.state.result : empty,
            method : this.state.method !== -1 ? this.state.method : empty,
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:8080/admin/case`,{
            method : this.state.modalType === 0 ? 'post' : 'put', //判断使用新建还是编辑
            body : JSON.stringify(body),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json;
            if (data.result === true){
                this.onDataFetch();
                this.setState({
                    id: '',
                    caseName : '',
                    symptom : -1,
                    exam : -1,
                    result : -1,
                    method : -1,
                    show : false
                });
            }
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onEditModal(id){
        let caseName = '' , symptom = '', exam = '', result = '', method = '';
        for(let key in this.state.originJson){
            let item = this.state.originJson[key];
            if (item.id === id){
                caseName = item.caseName;
                symptom = item.symptom;
                exam = item.exam;
                result = item.result;
                method = item.method;
            }
        }
        this.setState({show: true, id: id, caseName : caseName, symptom: symptom, exam: exam, result: result, method: method, modalType: 1, modalTitle : '修改病例'})
    }

    onEditSecondModal(index){
        let description = '' , pictureUrls = '', videoUrls = '', id=this.state.id;
        for(let key in this.state.originJson){
            let item = this.state.originJson[key];
            if (item.id === id){
                description = item[index].description;
                pictureUrls = item[index].pictureUrls;
                videoUrls = item[index].videoUrls;
            }
        };
        this.setState({description : description, pictureUrls: pictureUrls, videoUrls: videoUrls, secondModalTitle : '上传信息', showSecondModal: true, secondModalIndex: index})
    }

    onPageSelect(activePage){
        this.setState({activePage: activePage}, ()=>{
            this.onDataFetch();
        });
    }

    onDropVideo(acceptedFiles, rejectedFiles) {
        this.setState({
            video: acceptedFiles,
        }, ()=>{
            var data = new FormData();
            data.append('file', this.state.video[0]);
            fetch('http://localhost:8080/upload',{
                method : 'post',
                body : data
            })
                .then((response)=>{
                    return response.json();
                }).then((json)=>{
                let data = json;
                if (data.result === true){
                    this.setState({
                        videoUrls : data.fileName
                    })
                }else{
                    this.setState({
                        videoUrls : ''
                    })
                }
            }).catch((ex)=>{
                console.log(ex);
                this.setState({
                    videoUrls : ''
                })
            });
        });
    }

    onDropPictures(acceptedFiles, rejectedFiles) {
        this.setState({
            pictures: acceptedFiles,
        }, ()=>{
            var data = new FormData();
            data.append('file', this.state.pictures[0]);
            fetch('http://localhost:8080/upload',{
                method : 'post',
                body : data
            })
                .then((response)=>{
                    return response.json();
                }).then((json)=>{
                let data = json;
                if (data.result === true){
                    this.setState({
                        pictureUrls : data.fileName
                    })
                }else{
                    this.setState({
                        pictureUrls : -1 //出错
                    })
                }
            }).catch((ex)=>{
                console.log(ex);
                this.setState({
                    pictureUrls : -1
                })
            });
        });
    }

    onUpload(){
        this.setState({
            showSecondModal: false,
        });
        this.clearSecondModalDate();
        let method = this.state[this.state.secondModalIndex].id === undefined ? 'post' : 'put';
        let body = {
            description: this.state.description || "",
            picture: this.state.pictureUrls || "",
            video: this.state.videoUrls || ""
        };
        if (method === 'put'){//如果是更新操作
            body['id'] = this.state[this.state.secondModalIndex].id;
        }

        this.clearSecondModalDate();
        let updateBody = {};
        updateBody[this.state.secondModalIndex] = body;
        this.setState(updateBody);
    }

    isEmpty(item){
        return this.state[item] === -1 || this.state[item] === '';
    }

    clearSecondModalDate(){
        this.setState({
            pictures:[],
            video: [],
            description: '',
            pictureUrls: '',
            videoUrls: ''
        });
    }

    getForm(){
        const formInstance = (
            <div>
                <form>
                    <FieldGroup
                        id="formControlsName"
                        type="text"
                        label="病例名"
                        placeholder="输入病例名"
                        value={this.state.caseName}
                        onChange={(e)=>{this.setState({caseName : e.target.value})}}
                    />
                    <FormGroup>
                        <Col md={3}>
                            <ControlLabel>病症:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info" onClick={this.onEditSecondModal.bind(this, "symptom")}>上传</Button>
                        {this.isEmpty('symptom') ? '' : <span>已上传</span>}
                    </FormGroup>

                    <FormGroup>
                        <Col md={3}>
                            <ControlLabel>化验项目:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info" onClick={this.onEditSecondModal.bind(this, "exam")}>上传</Button>
                        {this.isEmpty('exam') ? '' : <span>已上传</span>}
                    </FormGroup>

                    <FormGroup>
                        <Col md={3}>
                            <ControlLabel>诊断结果:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info" onClick={this.onEditSecondModal.bind(this, "result")}>上传</Button>
                        {this.isEmpty('result') ? '' : <span>已上传</span>}
                    </FormGroup>
                    <FormGroup>
                        <Col md={3}>
                            <ControlLabel>治疗方案:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info" onClick={this.onEditSecondModal.bind(this, "method")}>上传</Button>
                        {this.isEmpty('method') ? '' : <span>已上传</span>}
                    </FormGroup>
                </form>
                <div className="static-modal">
                    <Modal show={this.state.showSecondModal}>
                        <Modal.Header>
                            <Modal.Title>{this.state.secondModalTitle}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form  id="form">
                                <Row>
                                    <FormGroup>
                                        <Col md={2}>
                                            <ControlLabel>描述:</ControlLabel>
                                        </Col>
                                        <Col md={10}>
                                            <FormControl componentClass="textArea" placeholder="输入描述"  value={this.state.description}
                                                         onChange={(e)=>{this.setState({description: e.target.value})}}/>
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <Row>
                                    <FormGroup>
                                        <Col md={2}>
                                            <ControlLabel>图片:</ControlLabel>
                                        </Col>
                                        <Col md={2}>
                                            <Dropzone onDrop={this.onDropPictures} maxSize={3145728} className='upload' accept={'image/*'} multiple={false}>
                                                <div>上传(最大3M)</div>
                                            </Dropzone>
                                        </Col>
                                        <Col md={8}>
                                            {this.state.pictures.length > 0 ? <span className="img-review">
                                                    {/*<span>Uploading {this.state.pictures.length} pictures...</span>*/}
                                                    {this.state.pictures.map((file) => <img key={file.name} src={file.preview} className="xsmall-img"/> )}
                                                </span> : null}
                                            {this.isEmpty('pictureUrls') ? '' : (this.state.pictureUrls === -1) ? <span>上传失败</span> : <span>已上传</span>}
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <Row>
                                    <FormGroup>
                                        <Col md={2}>
                                            <ControlLabel>视频:</ControlLabel>
                                        </Col>
                                        <Col md={2}>
                                            <Dropzone onDrop={this.onDropVideo} maxSize={10485760} className='upload' accept={'video/*'} multiple={false}>
                                                <div>上传(最大10M)</div>
                                            </Dropzone>
                                        </Col>
                                        <Col md={8}>
                                            {this.state.video.length > 0 ? <div>
                                                    {/*<span>Uploading {this.state.video.length} pictures...</span>*/}
                                                    <span>files:{this.state.video.map((file) => <span key={file.name}> {file.name}</span> )}</span>
                                                </div> : null}
                                            {this.isEmpty('videoUrls') ? '' : (this.state.videoUrls === -1) ? <span>上传失败</span> : <span>已上传</span>}
                                        </Col>
                                    </FormGroup>
                                </Row>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={()=>{this.clearSecondModalDate(); this.setState({showSecondModal: false})}}>取消</Button>
                            <Button bsStyle="primary" onClick={this.onUpload}>上传</Button>
                        </Modal.Footer>

                    </Modal>
                </div>
            </div>
        );
        return formInstance;
    }

    render() {
        let {username,
            password,
            passwordConfirm,
            userType,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true,
                                                                                                            id: '',
                                                                                                            caseName : '',
                                                                                                            symptom : -1,
                                                                                                            exam : -1,
                                                                                                            result : -1,
                                                                                                            method : -1, modalType: 0, modalTitle : '新增病例'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}