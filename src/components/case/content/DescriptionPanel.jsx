import React, {Component, ProtoType} from 'react';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';

export default class DescriptionPanel extends Component {
    render() {
        let panelName = this.props.panelName, caseId = this.props.caseId,
            panelContent = this.props.panelContent;

        return (
            <Panel header={panelName}>
                <Grid>
                    <Row>
                        <Col md={8}>
                            {panelContent.text}
                        </Col>
                        <Col md={4}>
                            <img src="assets/test.jpg"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xsOffset={8}>
                            <Link to=''>{panelContent.video}</Link>
                        </Col>
                    </Row>
                </Grid>
            </Panel>);
    }
}