import React, {Component, ProtoType} from 'react';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import '../../../css/case.css'

export default function DescriptionPanel(props) {
    let panelName = props.panelName, caseId = props.caseId,
        panelContent = props.panelContent,
        text = panelContent.description;

    return (
        <Panel header={panelName} key={panelName}>
            <Grid>
                <Row>
                    <Col md={9}>
                        {text}
                    </Col>
                    <Col md={3}>
                        <Row>
                            <a className='btnDesciption' key={caseId + panelName + "Pic"}
                               onClick={props.onPictureShow.bind(this, panelContent.picture)}>
                                {panelName}图片
                            </a>
                        </Row>
                        <Row>
                            <a className='btnDesciption' key={caseId + panelName + "Video"}
                               onClick={props.onVideoShow.bind(this, panelContent.video)}>
                                {panelName}视频
                            </a>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </Panel>);

}