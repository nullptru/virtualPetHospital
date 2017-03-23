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
            title : '化验管理',
            add : '新增化验项目',
            header : ["化验项目名", '收费','描述', '操作'],
            //modal Info
            id: '',
            examinationName : '',
            examinationPrice : '',
            description : '',
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增角色',//0表示新建，1表示编辑
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
        fetch(`http://localhost:8080/admin/examination/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            this.setState({tableJson : json.data, pages: json.pages});
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onDeleteHandle(id){
        fetch('http://localhost:8080/admin/examination',{
            method : 'delete',
            body : {
                id : id
            }
        })
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json.data;
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
            examinationName : this.state.examinationName,
            examinationPrice : this.state.examinationPrice,
            description : this.state.description
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:8080/admin/examination`,{
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
        let examinationName = '', examinationPrice = '', description = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                examinationName = item.examinationName;
                examinationPrice = item.examinationPrice;
                description = item.description;
            }
        });
        this.setState({show: true, id: id, examinationName : examinationName, examinationPrice: examinationPrice, description: description, modalType: 1, modalTitle : '修改化验项目'})
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
                    label="化验项目名"
                    placeholder="输入化验项目名"
                    value={this.state.examinationName }
                    onChange={(e)=>{this.setState({examinationName : e.target.value})}}
                />

                <FieldGroup
                    id="formControlsName"
                    type="number"
                    label="收费"
                    placeholder="输入化验项目价格"
                    value={this.state.examinationPrice }
                    onChange={(e)=>{if(e.target.value === '' || !isNaN(Number.parseFloat(e.target.value)))
                        this.setState({examinationPrice : !isNaN(Number.parseFloat(e.target.value)) ? Number.parseFloat(e.target.value) : 0}
                        )}}
                />

                <FormGroup>
                    <ControlLabel>描述</ControlLabel>
                    <FormControl componentClass="textarea" id="description" placeholder="输入化验项目描述"
                                 value={this.state.description} onChange={(e)=>{this.setState({description : e.target.value})}}/>
                </FormGroup>
            </form>
        );
        return formInstance;
    }

    render() {
        let {description,
            examinationName,examinationPrice,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, description: '', examinationName:'', examinationPrice: 0, modalType: 0, modalTitle : '新增化验项目'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}