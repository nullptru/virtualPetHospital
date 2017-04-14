import React, {Component, ProtoType} from 'react';
import {Carousel, Modal, Image} from 'react-bootstrap';
import '../../../css/case.css'

const img_width = 900, img_height = 500;

export default function CasePicModal(props) {
    let itemDom = [], count = 0;
    let str = props.imgList;
    console.info('origin str:' + str)
    let imgArrStr = str.substring(str.indexOf('[') + 1, str.indexOf(']'));

    imgArrStr.split(',').forEach((img) => {
        let trimImg = img.trim();
        let img_url = trimImg.substring(1, trimImg.length - 1);
        console.info(img_url);

        itemDom.push(
            <Carousel.Item key={count++}>
                <Image width={img_width} height={img_height}
                       src={img_url} responsive/>
            </Carousel.Item>
        );

    });
    return (
        <Modal
            show={props.show}
            onHide={props.onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {itemDom}
                </Carousel>
            </Modal.Body>
        </Modal>
    );
}