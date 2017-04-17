import React, {Component} from 'react'
import {FormGroup, FormControl, Checkbox, ControlLabel, Row, Col} from 'react-bootstrap/lib'
import 'whatwg-fetch'

import BaseAdminComponent from './BaseAdminComponent'

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
            roomAccess : [],
            modalType: 0,//0表示新建，1表示编辑
            modalTitle: '新增角色',//0表示新建，1表示编辑
            tableJson : [],
            subjectJson : [],//json数组
            roleData: [],
            isEditable : true,
            isDeletable : false,
            isCreatable : false,
            //分页
            pages: 1,
            activePage : 1
        };
    }

    componentDidMount(){
        this.onDataFetch()
    }

    onDataFetch(){
        let role = ["前台","兽医","助理"];
        fetch(`http://localhost:8080/admin/room`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
                this.setState({subjectJson : json.data},()=>{
                    fetch(`http://localhost:8080/admin/role/${this.state.activePage}`)
                        .then((response)=>{
                            return response.json();
                        }).then((json)=>{
                            this.setState({roleData: json.data}, ()=>{
                                console.log(json);
                                let rooms = this.ArrayToObject(this.state.subjectJson);
                                json.data.forEach((item)=>{
                                    let roomsAccess = item.roomAccess || [],//获取可访问的科室数组
                                        subjectText = '';
                                    roomsAccess.forEach((roomId)=>{
                                        subjectText += rooms[roomId] + ' ';
                                    });
                                    item.roleName = role[item.id - 1];
                                    item.subjectText = subjectText;
                                    delete item.roomAccess;
                                });
                                this.setState({tableJson : json.data, pages: json.pages});
                            })
                    }).catch((ex)=>{
                        console.log(ex);
                    });
                });
            }).catch((ex)=>{
                console.log(ex);
            });
    }

    onDeleteHandle(id){
        fetch('http://localhost:8080/admin/role',{
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
        //获取组件
        let subjectsDom = document.getElementsByName('subject'), roomAccess = "";
        subjectsDom.forEach((item)=>{
           if(item.checked){
               roomAccess += item.value + " ";
           }
        });
        this.setState({
            roomAccess : roomAccess
        },()=>{
            let body = {
                roleName : this.state.roleName,
                roomAccess : this.state.roomAccess,
            };
            if (this.state.modalType === 1){body.id = this.state.id;}
            fetch(`http://localhost:8080/admin/role`,{
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
        });
    }

    onEditModal(id){
        let roleName = '', roomAccess = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                roleName = item.roleName;
                roomAccess = item.roomAccess;
            }
        });
        this.setState({show: true, id: id, roleName : roleName, roomAccess: roomAccess, modalType: 1, modalTitle : '修改角色'})
    }

    onPageSelect(activePage){
        this.setState({activePage: activePage}, ()=>{
            this.onDataFetch();
        });
    }

    getForm(){
        let {subjectJson} = this.state, subjectDom = [], count = 0;
        let doms = [];
        subjectJson.forEach((subject)=>{
            if (count % 4 === 0 && count !== 0){
                subjectDom.push(<Row>
                    {doms}
                </Row>);
                doms = [];
            }
            doms.push(
                <Col md={3}>
                    <Checkbox inline key={subject.id} value={subject.id} name="subject">
                        {subject.roomName}&nbsp;
                    </Checkbox>
                </Col>
                );
            count++;
        });
        const formInstance = (
            <form>
                <FormGroup>
                    <ControlLabel>角色名</ControlLabel>
                    <br/>
                    <FormControl.Static>
                        {this.state.roleName}
                    </FormControl.Static>
                </FormGroup>

                <FormGroup onChange={(e)=>{console.log(e.target)}} ref={(input)=>{this.input = input;}}>
                    <ControlLabel>可访问科室</ControlLabel>
                    <br/>
                    {subjectDom}
                </FormGroup>
            </form>
        );
        return formInstance;
    }

    ArrayToObject(array){
        let o = {};
        array.forEach((item)=>{
            if (o[item.id] === undefined){
                o[item.id] = item.roomName;
            }
        })
        return o;
    }

    render() {
        let {roleName,
            roomAccess,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
                                   onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, roleName: '', roomAccess: 0, modalType: 0, modalTitle : '新增角色'})}}
                                   onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}