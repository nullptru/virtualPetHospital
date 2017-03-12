import React, {Component, ProtoType} from 'react';
import {Table,Button} from 'react-bootstrap';

export default class CaseCatalogTab extends Component {
    render() {
        let className=this.props.className;
        let classId=this.props.classId;

        const catalogTab = (
            <Table condensed hover responsive>
                <tbody>
                <tr>
                    <td><Button bsSize="large">{className} 1-1</Button></td>
                    <td><Button bsSize="large">{className} 1-2</Button></td>
                    <td><Button bsSize="large">{className} 1-3</Button></td>
                    <td><Button bsSize="large">{className} 1-4</Button></td>
                    <td><Button bsSize="large">{className} 1-5</Button></td>
                </tr>
                <tr>
                    <td><Button bsSize="large">{className} 2-1</Button></td>
                    <td><Button bsSize="large">{className} 2-2</Button></td>
                    <td><Button bsSize="large">{className} 2-3</Button></td>
                    <td><Button bsSize="large">{className} 2-4</Button></td>
                    <td><Button bsSize="large">{className} 2-5</Button></td>
                </tr>
                <tr>
                    <td><Button bsSize="large">{className} 3-1</Button></td>
                    <td><Button bsSize="large">{className} 3-2</Button></td>
                    <td><Button bsSize="large">{className} 3-3</Button></td>
                    <td><Button bsSize="large">{className} 3-4</Button></td>
                </tr>
                </tbody>
            </Table>
        );
        return catalogTab;
    }
}