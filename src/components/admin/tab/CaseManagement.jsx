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
            symptom : '',
            examination : '',
            result : '',
            method : '',
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
            video: []
        };
    }

    componentDidMount(){
        this.onDataFetch()
    }

    onDataFetch(){
        fetch(`http://localhost:8080/admin/case/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            console.log(json);
            let data = json.data , originJson = new Object(json.data);
            data.forEach((item)=>{
                //解析展现的数据
                item['symptom'] = item['symptom']['description'];
                item['examination'] = item['examination']['description'];
                item['result'] = item['result']['description'];
                item['method'] = item['method']['description'];
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
            let data = json.data;
            if (data.result === true){
                this.onDataFetch()
            }
            console.log(json)
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onSubmitHandle(){
        let body = {
            username : this.state.username,
            password : this.state.password,
            userType : this.state.userType
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:8080/admin/case`,{
            method : this.state.modalType === 0 ? 'post' : 'put', //判断使用新建还是编辑
            body : body
        })
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json.data;
            if (data.result === true){
                this.onDataFetch();
                this.setState({show : false});
            }
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onEditModal(id){
        let username = '', userType = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                username = item.username;
                userType = item.userType === '普通用户' ? 0 : 1;
            }
        });
        this.setState({show: true, id: id, username : username, userType: userType, modalType: 1, modalTitle : '修改病例'})
    }

    onPageSelect(activePage){
        this.setState({activePage: activePage}, ()=>{
            this.onDataFetch();
        });
    }

    onDropVideo(acceptedFiles, rejectedFiles) {
        // fetch('http://localhost:8080/file',{
        //     method : 'post',
        //     body : {
        //         id : id
        //     }
        // })
        //     .then((response)=>{
        //         return response.json();
        //     }).then((json)=>{
        //     let data = json.data;
        //     if (data.result === true){
        //         this.onDataFetch()
        //     }
        //     console.log(json)
        // }).catch((ex)=>{
        //     console.log(ex);
        // });
        this.setState({
            video: acceptedFiles
        });
        console.log('Accepted pictures: ', acceptedFiles);
        console.log('Rejected pictures: ', rejectedFiles);
    }

    onDropPictures(acceptedFiles, rejectedFiles) {
        // fetch('http://localhost:8080/file',{
        //     method : 'post',
        //     body : {
        //         id : id
        //     }
        // })
        //     .then((response)=>{
        //         return response.json();
        //     }).then((json)=>{
        //     let data = json.data;
        //     if (data.result === true){
        //         this.onDataFetch()
        //     }
        //     console.log(json)
        // }).catch((ex)=>{
        //     console.log(ex);
        // });
        this.setState({
            pictures: acceptedFiles
        });
        console.log('Accepted pictures: ', acceptedFiles);
        console.log('Rejected pictures: ', rejectedFiles);
    }

    onUpload(){
        this.setState({
            showSecondModal: false
        });
        let body = {
        };
        this.state.pictures.forEach((file)=> {
            body[file.name] = file;
        });
        fetch(`http://localhost:8080/admin/case/examiniation`,{
            method : 'post',
            body : body
        })
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json.data;
            if (data.result === true){
                this.onDataFetch();
                this.setState({show : false});
            }
        }).catch((ex)=>{
            console.log(ex);
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
                        <Col md={2}>
                            <ControlLabel>病症:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info">上传</Button>
                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel>化验项目:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info">上传</Button>
                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel>诊断结果:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info">上传</Button>
                    </FormGroup>
                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel>治疗方案:</ControlLabel>
                        </Col>
                        <Button bsSize="xsmall" bsStyle="info">上传</Button>
                    </FormGroup>
                </form>
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form  id="form">
                                <Row>
                                    <FormGroup>
                                        <Col md={2}>
                                            <ControlLabel>描述:</ControlLabel>
                                        </Col>
                                        <Col md={10}>
                                            <FormControl componentClass="textArea" placeholder="输入描述"/>
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <Row>
                                    <FormGroup>
                                        <Col md={2}>
                                            <ControlLabel>图片:</ControlLabel>
                                        </Col>
                                        <Col md={1}>
                                            <Dropzone onDrop={this.onDropPictures} maxSize={3145728} className='upload' accept={'image/*'}>
                                                <div>上传(最大3M)</div>
                                            </Dropzone>
                                        </Col>
                                        <Col md={9}>
                                            {this.state.pictures.length > 0 ? <div className="img-review">
                                                    <span>Uploading {this.state.pictures.length} pictures...</span>
                                                    <div>{this.state.pictures.map((file) => <img key={file.name} src={file.preview} className="xsmall-img"/> )}</div>
                                                </div> : null}
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <Row>
                                    <FormGroup>
                                        <Col md={2}>
                                            <ControlLabel>视频:</ControlLabel>
                                        </Col>
                                        <Col md={1}>
                                            <Dropzone onDrop={this.onDropVideo} maxSize={10485760} className='upload' accept={'video/*'}>
                                                <div>上传(最大10M)</div>
                                            </Dropzone>
                                        </Col>
                                        <Col md={9}>
                                            {this.state.video.length > 0 ? <div>
                                                    <span>Uploading {this.state.video.length} pictures...</span>
                                                    <span>files:{this.state.video.map((file) => <span key={file.name}> {file.name}</span> )}</span>
                                                </div> : null}
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <FieldGroup
                                    id="formControlsFile"
                                    type="file"
                                    label="File"
                                    help="Example block-level help text here."
                                />
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.onUpload}>保存</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
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
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, username: '', userType: 0, modalType: 0, modalTitle : '新增病例'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}