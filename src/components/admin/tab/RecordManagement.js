/**
 * Created by Burgess on 2017/3/12.
 */

import React, {Component} from 'react'
import {FormGroup, FormControl, Radio, HelpBlock, ControlLabel} from 'react-bootstrap/lib'
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

export default class RecordManagement extends Component {
    constructor(){
        super();
        //进行函数绑定，防止this指向错误
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
        this.onEditModal = this.onEditModal.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            show : false,
            title : '档案管理',
            add : '新增档案',
            header : ["就诊时间", '患宠名', '宠物种类','就诊详情', '总收费', '操作'],
            tableJson : [],
            //modal Info
            id: '',
            time : '',
            patient : '',
            petType : '',
            description : '',
            price : 0,
            //modal
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增档案',//0表示新建，1表示编辑
            isEditable: false,
            //分页
            pages: 1,
            activePage : 1
        };
    }

    componentDidMount(){
        this.onDataFetch()
    }

    onDataFetch(){
        fetch(`http://localhost:8080/admin/record/${this.state.activePage}`)
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
        fetch('http://localhost:8080/admin/record',{
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
            console.log(json)
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onSubmitHandle(){
        let body = {
            time : this.state.time,
            patient : this.state.patient,
            petType : this.state.petType,
            description : this.state.description,
            price : this.state.price
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:8080/admin/record`,{
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
        let time = '', patient = '' , petType ='',description = '',price = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                time = item.time;
                patient = item.patient;
                petType = item.petType;
                description = item.description;
                price = item.price;
            }
        });
        this.setState({show: true, id: id,
            time : time, patient: patient, petType : petType, description : description, price : price,
            modalType: 1, modalTitle : '修改档案'})
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
                    type="datetime"
                    label="就诊时间"
                    placeholder="输入就诊时间"
                    value={this.state.time}
                    onChange={(e)=>{this.setState({time : e.target.value})}}
                />
                <FieldGroup
                    id="formControlsPassword"
                    type="text"
                    label="患宠名"
                    placeholder="输入患宠名"
                    value={this.state.patient}
                    onChange={(e)=>{this.setState({patient : e.target.value})}}
                />

                <FieldGroup
                    id="formControlsPasswordConfirm"
                    label="宠物种类"
                    type="text"
                    placeholder="输入宠物种类"
                    value={this.state.petType}
                    onChange={(e)=>{this.setState({petType : e.target.value})}}
                />
                <FormGroup>
                    <ControlLabel>就诊详情</ControlLabel>
                    <FormControl componentClass="textarea" id="description" placeholder="输入就诊详情"
                                 value={this.state.description} onChange={(e)=>{this.setState({description : e.target.value})}}/>
                </FormGroup>

                <FieldGroup
                    id="formControlsPrice"
                    type="text"
                    label="总收费"
                    placeholder="输入费用"
                    value={this.state.price}
                    onChange={(e)=>{if(e.target.value === '' || !isNaN(Number.parseFloat(e.target.value)))
                        this.setState({price : !isNaN(Number.parseFloat(e.target.value)) ? Number.parseFloat(e.target.value) : 0}
                        )}}
                />
            </form>
        );
        return formInstance;
    }

    render() {
        let {time,patient,
            petType,
            description,
            price,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
           onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, time : '', patient: '', petType : '', description : '', price : ''
            , modalType: 0, modalTitle : '新增档案'})}}
           onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}