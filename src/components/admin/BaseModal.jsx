import React from 'react'
import { Modal, Button} from 'react-bootstrap/lib'

export default function BaseModal(props){
    let show = Boolean(props.show) || false;
    return (
        <Modal
            show={show}
            onHide={props.onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="primary" onClick={props.onSubmit}>保存</Button>
            </Modal.Footer>
        </Modal>)
}