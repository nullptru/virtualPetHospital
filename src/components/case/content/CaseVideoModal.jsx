import React, {Component, ProtoType} from 'react';
import {Modal} from 'react-bootstrap';
import {Player} from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css"

export default function CaseVideoModal(props) {
    /*props包含video的url*/
    console.info("video in modal", props.video);
    return (
        <Modal
            show={props.show}
            onHide={props.onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Player playbackRate="2">
                    <source src={props.videoUrl}/>
                </Player>
            </Modal.Body>
        </Modal>
    );
}