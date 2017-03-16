import React, {Component, ProtoType} from 'react';
import {Modal, Button, ListGroupItem, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router';

export default function SearchModel(props) {
    console.info("searchModal show:" + props.show);
    let searchContent = props.searchContent.trim(),
        title, show = Boolean(props.show) || false,
        close = props.onClose,
        searchResList = props.resultList, content;
    if (searchContent != null && searchContent != "") {
        title = "搜索结果";
        if (searchResList != null && searchResList.length != 0) {
            let items = [], url_prefix = "/learning/casedes/";

            searchResList.forEach((res_case) => {
                let url = url_prefix + res_case.caseId;
                items.push(<ListGroupItem>
                    <Link to={url}>{res_case.caseName}</Link>
                </ListGroupItem>);
            });

            content = (
                <ListGroup>
                    {items}
                </ListGroup>);
        } else {
            content = (<p>抱歉，人家什么都没有找到，嘤嘤嘤</p>);
        }
    } else {
        content = (<p>搜索内容不能为空哦！！！</p>);
        title = "提示";
    }

    console.info("search Content in modal:" + searchContent);
    return (
        <Modal
            show={show}
            onHide={close}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>关闭</Button>
            </Modal.Footer>
        </Modal>
    );
}