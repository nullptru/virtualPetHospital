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

export default class MedicineManagement extends Component {
    constructor(){
        super();
        //进行函数绑定，防止this指向错误
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
        this.onEditModal = this.onEditModal.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onPageSelect = this.onPageSelect.bind(this);

        this.state = {
            show : false,
            title : '药品管理',
            add : '新增药品',
            header : ["药品名称", '药品价位', '药品类型','药品描述', '操作'],
            //modal Info
            id : '',
            medicineName : '',
            medicinePrice : 0,
            medicineType : 0,
            description : '',
            modalType: 0,//0表示新建，1表示编辑
            modalTitle : '新增药品',
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
        fetch(`http://localhost:8080/admin/medicine/${this.state.activePage}`)
            .then((response)=>{
                return response.json();
            }).then((json)=>{
            let data = json.data;
            data.forEach((dadium)=>{
                for (let key in dadium){
                    if (key === 'medicineType'){
                        dadium[key] = dadium[key] === 0 ? '治疗药物' : '疫苗';
                    }
                }
            });
            this.setState({tableJson : json.data, pages: json.pages});
        }).catch((ex)=>{
            console.log(ex);
        });
    }

    onDeleteHandle(id){
        fetch('http://localhost:8080/admin/medicine',{
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
            medicineName : this.state.medicineName,
            medicinePrice : this.state.medicinePrice,
            medicineType : this.state.medicineType,
            description : this.state.description
        };
        if (this.state.modalType === 1){body.id = this.state.id;}
        fetch('http://localhost:8080/admin/medicine',{
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
        let medicineName = '', medicineType = '', medicinePrice = '', description = '';
        this.state.tableJson.forEach((item)=>{
            if (item.id === id){
                medicineName = item.medicineName;
                medicineType = item.medicineType === '治疗药物' ? 0 : 1;
                medicinePrice = item.medicinePrice;
                description = item.description;
            }
        });
        this.setState({
            show: true,
            id : id,
            medicineName : medicineName,
            medicineType: medicineType,
            medicinePrice : medicinePrice,
            description : description,
            modalType: 1,
            modalTitle : '修改药品'
        })
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
                    label="药品名"
                    placeholder="输入药品名"
                    value={this.state.medicineName}
                    onChange={(e)=>{this.setState({medicineName : e.target.value})}}
                />
                <FieldGroup
                    id="formControlsPrice"
                    type="text"
                    label="价格"
                    placeholder="输入药品价格"
                    value={this.state.medicinePrice}
                    onChange={(e)=>{if(e.target.value === '' || !isNaN(Number.parseFloat(e.target.value)))
                        this.setState({medicinePrice : !isNaN(Number.parseFloat(e.target.value)) ? Number.parseFloat(e.target.value) : 0}
                        )}}
                />

                <FormGroup>
                    <ControlLabel>药品描述</ControlLabel>
                    <FormControl componentClass="textarea" id="description" placeholder="输入药品描述"
                                 value={this.state.description} onChange={(e)=>{this.setState({description : e.target.value})}}/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>药品类型</ControlLabel>
                    &nbsp;&nbsp;&nbsp;
                    <Radio inline value="0" name="medicineType" checked={this.state.medicineType === 0} onChange={(e)=>{this.setState({medicineType : 0})}}>
                        药品
                    </Radio>
                    {' '}
                    <Radio inline value="1" name="medicineType" checked={this.state.medicineType === 1} onChange={(e)=>{this.setState({medicineType : 1})}}>
                        疫苗
                    </Radio>
                    {' '}
                </FormGroup>
            </form>
        );
        return formInstance;
    }

    render() {
        let {medicineName,
            medicinePrice,
            medicineType,
            description,...other} = this.state;
        //hearder, title, add, tableJson, show ,child, onClose, onSubmit, showModal
        return <BaseAdminComponent {...other}
           onClose={()=>{this.setState({show: false})}} onNew={()=>{this.setState({show: true, medicineName: '',medicinePrice : 0,
            medicineType: 0, description:'', modalType: 0, modalTitle : '修改药品'})}}
           onDelete={this.onDeleteHandle} onEdit={this.onEditModal} onSubmit={this.onSubmitHandle} onPageSelect={this.onPageSelect}>
            {this.getForm()}
        </BaseAdminComponent>
    }
}