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

export default class UserManagement extends Component {
    constructor(){
        super();
        //进行函数绑定，防止this指向错误
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
        this.onEditModal = this.onEditModal.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            show : false,
            title : '用户管理',
            add : '新增用户',
            header : ["用户名", '用户类型', '操作'],
            //modal Info
            id: '',
            userName : '',
            userPwd : '',
            userPwdConfirm : '',
            userType : 0,
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增用户',//0表示新建，1表示编辑
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
        fetch(`http://localhost:8080/admin/user/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json.data;
            data.forEach((dadium)=>{
                for (let key in dadium){
                    if (key === 'userType'){
                        dadium[key] = dadium[key].toString() === '0' ? '普通用户' : '管理员';
                    }
                }
            });
            this.setState({tableJson : json.data, pages: json.pages});
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onDeleteHandle(id){
        fetch('http://localhost:8080/admin/user',{
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
            userName : this.state.userName,
            userPwd : this.state.userPwd,
            userType : this.state.userType
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:8080/admin/user`,{
            method : this.state.modalType === 0 ? 'post' : 'put', //判断使用新建还是编辑
            body : JSON.stringify(body),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response)=>{
            console.log(response);
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
        let userName = '', userType = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                userName = item.userName;
                userType = item.userType === '普通用户' ? 0 : 1;
            }
        });
        this.setState({show: true, id: id, userName : userName, userType: userType, modalType: 1, modalTitle : '修改用户'})
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
                    label="用户名"
                    placeholder="输入用户名"
                    value={this.state.userName}
                    onChange={(e)=>{this.setState({userName : e.target.value})}}
                />
                <FieldGroup
                    id="formControlsPassword"
                    type="password"
                    label="密码"
                    placeholder="输入密码"
                    value={this.state.userPwd}
                    onChange={(e)=>{this.setState({userPwd : e.target.value})}}
                />

                <FieldGroup
                    id="formControlsPasswordConfirm"
                    label="确认密码"
                    type="password"
                    placeholder="再次输入密码"
                    value={this.state.userPwdConfirm}
                    onChange={(e)=>{this.setState({userPwdConfirm : e.target.value})}}
                />

                <FormGroup>
                    <ControlLabel>用户类型</ControlLabel>
                    &nbsp;&nbsp;&nbsp;
                    <Radio inline value="0" name="userType" checked={this.state.userType === 0} onChange={(e)=>{this.setState({userType : 0})}}>
                        普通用户
                    </Radio>
                    {' '}
                    <Radio inline value="1" name="userType" checked={this.state.userType === 1} onChange={(e)=>{this.setState({userType : 1})}}>
                        管理员用户
                    </Radio>
                    {' '}
                </FormGroup>
            </form>
        );
        return formInstance;
    }

    render() {
        let {userName,
            userPwd,
            userPwdConfirm,
            userType,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, userName: '', userType: 0, modalType: 0, modalTitle : '新增用户'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}