import React, {Component, ProtoType} from 'react';
import {} from 'react-bootstrap';

export default class CaseDesContent extends Component {
    constructor(content_name) {
        super();
        this.contentName = content_name;
    }

    setTextContent() {

    }

    setImgContent() {

    }

    setVideoContent() {

    }

    render() {
        return <Panel header={this.contentName}>{this.contentName}的内容</Panel>
    }
}