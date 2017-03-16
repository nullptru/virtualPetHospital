import React, {Component} from 'react'
import {FormGroup, FormControl, Checkbox, HelpBlock, ControlLabel} from 'react-bootstrap/lib'
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

export default class RoleManagement extends Component {
    constructor(){
        super();
        //进行函数绑定，防止this指向错误
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
        this.onEditModal = this.onEditModal.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            show : false,
            title : '角色管理',
            add : '新增角色',
            header : ["角色名", '可访问科室', '操作'],
            //modal Info
            id: '',
            roleName : '',
            subjects : [],
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增角色',//0表示新建，1表示编辑
            tableJson : [],
            subjectJson : [],//json数组
            //分页
            pages: 1,
            activePage : 1
        };
    }

    componentDidMount(){
        this.onDataFetch()
    }

    onDataFetch(){
        fetch(`http://localhost:3001/admin/role/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            json.data.forEach((item)=>{
                let subjectJson = item.subjects || [],//获取可访问的科室数组
                    subjectText = '';
                subjectJson.forEach((subject)=>{
                    subjectText += subject.name + ' ';
                });
                item.subjectText = subjectText;
                delete item.subjects;
            });
            //console.log(json.data);
            this.setState({tableJson : json.data, pages: json.pages});
        }).catch((ex)=>{
            console.log(ex);
        });
        fetch(`http://localhost:3001/admin/subject`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            this.setState({subjectJson : json.data});
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onDeleteHandle(id){
        fetch('http://localhost:3001/admin/role',{
            method : 'delete',
            body : {
                id : id
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
            roleName : this.state.roleName,
            subjects : this.state.subjects,
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:3001/admin/role`,{
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
        let roleName = '', subjects = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                roleName = item.roleName;
                subjects = item.subjects;
            }
        });
        this.setState({show: true, id: id, roleName : roleName, subjects: subjects, modalType: 1, modalTitle : '修改角色'})
    }

    onPageSelect(activePage){
        this.setState({activePage: activePage}, ()=>{
            this.onDataFetch();
        });
    }

    getForm(){
        let {subjectJson} = this.state, subjectDom = [];
        subjectJson.forEach((subject)=>{
            subjectDom.push(<Checkbox inline key={subject.id} value={subject.id} name="subject">
                {subject.name}&nbsp;
            </Checkbox>);
        });
        const formInstance = (
            <form>
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    label="角色名"
                    placeholder="输入角色名"
                    value={this.state.username}
                    onChange={(e)=>{this.setState({username : e.target.value})}}
                />

                <FormGroup>
                    <ControlLabel>可访问科室</ControlLabel>
                    <br/>
                    {subjectDom}
                </FormGroup>
            </form>
        );
        return formInstance;
    }

    render() {
        let {roleName,
            subjects,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, roleName: '', subjects: 0, modalType: 0, modalTitle : '新增角色'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}