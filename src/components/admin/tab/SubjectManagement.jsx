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

export default class SubjectManagement extends Component {
    constructor(){
        super();
        //进行函数绑定，防止this指向错误
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
        this.onEditModal = this.onEditModal.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            show : false,
            title : '科室管理',
            add : '新增科室',
            header : ["科室id", '科室名', '操作'],
            //modal Info
            id: '',
            roomName : '',
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增科室',//0表示新建，1表示编辑
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
        fetch(`http://localhost:8080/admin/room/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json.data;
            data.forEach((dadium)=>{
                for (let key in dadium){
                    if (key.toLowerCase() === 'id'){
                        dadium.roomId = dadium[key];
                    }else{
                        let k = dadium[key];
                        delete dadium[key];
                        dadium[key] = k;
                    }
                }
            });
            console.log(json);
            this.setState({tableJson : json.data, pages: json.pages});
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onDeleteHandle(id){
        fetch('http://localhost:8080/admin/room',{
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
            id : this.state.id,
            roomName : this.state.roomName
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch(`http://localhost:8080/admin/room`,{
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
        let roomName = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                roomName = item.roomName;
            }
        });
        this.setState({show: true, id: id, roomName : roomName, modalType: 1, modalTitle : '修改科室'})
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
                    label="科室名"
                    placeholder="输入科室名"
                    value={this.state.roomName }
                    onChange={(e)=>{this.setState({roomName : e.target.value})}}
                />
            </form>
        );
        return formInstance;
    }

    render() {
        let {id,
            roomName,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, roomName: '', modalType: 0, modalTitle : '新增科室'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}