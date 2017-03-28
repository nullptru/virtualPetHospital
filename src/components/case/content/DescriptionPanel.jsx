import React, {Component, ProtoType} from 'react';
import {Panel, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router';

export default function DescriptionPanel(props) {
    let panelName = props.panelName, caseId = props.caseId,
        panelContent = props.panelContent,
        text = panelContent.description;
    console.log("desPanel description:" + panelContent.description);
    return (
        <Panel header={panelName} key={panelName}>
            <Grid>
                <Row>
                    <Col md={8}>
                        {text}
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Button key={caseId + panelName + "Pic"}
                                    onClick={props.onPictureShow.bind(this, panelContent.picture)}>
                                {panelName}图片
                            </Button>
                        </Row>
                        <Row>
                            <Button key={caseId + panelName + "Video"}
                                    onClick={props.onVideoShow.bind(this, panelContent.video)}>
                                {panelName}视频
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </Panel>);

}