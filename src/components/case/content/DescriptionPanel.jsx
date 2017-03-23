import React, {Component, ProtoType} from 'react';
import {Panel, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router';

export default function DescriptionPanel(props) {
    let panelName = props.panelName, caseId = props.caseId,
        panelContent = props.panelContent,
        text = panelContent.text;
    console.log("desPanel imgList:" + panelContent.img);
    return (
        <Panel header={panelName}>
            <Grid>
                <Row>
                    <Col md={10}>
                        {text}
                    </Col>
                    <Col md={2}>
                        <Row>
                            <Button key={caseId + panelName + "Pic"}
                                    onClick={props.onPictureShow.bind(this, panelContent.img)}>
                                {panelName}图片
                            </Button>
                        </Row>
                        <Row>
                            <Button key={caseId + panelName + "Video"}>{panelName}视频</Button>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </Panel>);

}