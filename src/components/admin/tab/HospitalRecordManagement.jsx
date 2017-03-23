import React, {Component} from 'react'
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap/lib'
import 'whatwg-fetch'

import BaseAdminComponent from './BaseAdminComponent'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default class ExaminationManagement extends Component {
    constructor(){
        super();
        //进行函数绑定，防止this指向错误
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
        this.onEditModal = this.onEditModal.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            show : false,
            title : '住院管理',
            add : '新增住院项目',
            header : ["患者名", '住院开始时间','住院结束时间','描述', '操作'],
            //modal Info
            id: '',
            patient : '',
            startTime : '',
            endTime : '',
            description : '',
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增住院项目',//0表示新建，1表示编辑
            tableJson : [],
            //分页
            pages: 1,
            activePage : 1
        };
    }

    componentDidMount(){
        this.onDataFetch()
    }

    onDataFetch(){
        fetch(`http://localhost:8080/admin/hospitalRecord/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            console.log(json)
            this.setState({tableJson : json.data, pages: json.pages});
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onDeleteHandle(id){
        fetch('http://localhost:8080/admin/hospitalRecord',{
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
            if (Boolean(data.result) === true){
                this.onDataFetch()
            }
            console.log(json)
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onSubmitHandle(){
        let body = {
            patient : this.state.patient,
            startTime : this.state.startTime,
            endTime : this.state.endTime,
            description : this.state.description
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:8080/admin/hospitalRecord`,{
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
                this.setState({show : false});
            }
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onEditModal(id){
        let patient = '', startTime = '', endTime = '', description = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                patient = item.patient;
                startTime = item.startTime;
                endTime = item.endTime;
                description = item.description;
            }
        });
        this.setState({show: true, id: id, patient : patient, startTime: startTime, endTime:endTime, description: description, modalType: 1, modalTitle : '修改住院项目'})
    }

    onPageSelect(activePage){
        this.setState({activePage: activePage}, ()=>{
            this.onDataFetch();
        });
    }

    getForm(){
        const formInstance = (
            <form>
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    label="住院患者名"
                    placeholder="输入住院患者名"
                    value={this.state.patient }
                    onChange={(e)=>{this.setState({patient : e.target.value})}}
                />

                <FieldGroup
                    id="formControlsStartTime"
                    type="date"
                    label="住院开始时间"
                    placeholder="输入住院开始时间(yyyy-mm-dd)"
                    value={this.state.startTime }
                    onChange={(e)=>{
                       //if(e.target.value.match(/\d{4}-\d{2}-d{2}/))
                            this.setState({startTime : e.target.value})
                    }}/>

                <FieldGroup
                    id="formControlsEndtime"
                    type="date"
                    label="住院结束时间"
                    placeholder="输入住院结束时间(yyyy-mm-dd)"
                    value={this.state.endTime }
                    onChange={(e)=>{
                        //if(e.target.value.match(/\d{4}-\d{2}-d{2}/))
                            this.setState({endTime : e.target.value})
                    }}/>
                <FormGroup>
                    <ControlLabel>描述</ControlLabel>
                    <FormControl componentClass="textarea" id="description" placeholder="输入病人描述"
                                 value={this.state.description} onChange={(e)=>{this.setState({description : e.target.value})}}/>
                </FormGroup>
            </form>
        );
        return formInstance;
    }

    render() {
        let {description,
            patient,startTime,endTime,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, description: '', patient:'', startTime: '', endTime : '', modalType: 0, modalTitle : '新增住院项目'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}