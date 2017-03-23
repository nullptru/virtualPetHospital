import React, {Component, ProtoType} from 'react';
import {Carousel, Modal, Image, ResponsiveEmbed} from 'react-bootstrap';
import '../../../css/case.css'

const img_width = 900, img_height = 500;

export default function CasePicModal(props) {
    let itemDom = [], count = 0;
    /*<Image width={img_width} height={img_height} src={img} responsive/>
     * <ResponsiveEmbed a16by9>
     <embed type="image" src={img}/>
     </ResponsiveEmbed>*/
    props.imgList.forEach((img) => {
        itemDom.push(
            <Carousel.Item key={count++}>
                <Image width={img_width} height={img_height} src={img} responsive/>
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
                <Carousel slide='false'>
                    {itemDom}
                </Carousel>
            </Modal.Body>
        </Modal>
    )
        ;
}