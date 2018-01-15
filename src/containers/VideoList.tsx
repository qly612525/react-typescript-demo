import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import { StoreState } from '../types';
import * as actions from '../actions';

class VideoList extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    getList() {
        const markes = [
            {
                id: 1,
                department_1: "ttt",
                department_2: "tyty",
                category: "中朝边界",
                name: "与欧冠",
                type: "云台",
                x: 116,
                y: 39
            }
        ];
        const uis = markes.map((m,i) => this.createRow(m,i));
        return uis;
    }

    createRow(marker:any, i:number) {
        return (
            <TableRow key={i}>
                <TableRowColumn>{marker.id}</TableRowColumn>
                <TableRowColumn>{marker.department_1}</TableRowColumn>
                <TableRowColumn>{marker.department_2}</TableRowColumn>
                <TableRowColumn>{marker.category}</TableRowColumn>
                <TableRowColumn>{marker.name}</TableRowColumn>
                <TableRowColumn>{marker.type}</TableRowColumn>
                <TableRowColumn>{marker.x}</TableRowColumn>
                <TableRowColumn>{marker.y}</TableRowColumn>
                <TableRowColumn><Link to="/map"><RaisedButton label="编辑" primary={true} /></Link></TableRowColumn>
            </TableRow>
        );
    }

    render() {
        return (
            <Table
                fixedHeader={true}
            >
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                >
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>单位名称_1</TableHeaderColumn>
                        <TableHeaderColumn>单位名称_2</TableHeaderColumn>
                        <TableHeaderColumn>分类</TableHeaderColumn>
                        <TableHeaderColumn>名称</TableHeaderColumn>
                        <TableHeaderColumn>类型</TableHeaderColumn>
                        <TableHeaderColumn>经度</TableHeaderColumn>
                        <TableHeaderColumn>纬度</TableHeaderColumn>
                        <TableHeaderColumn>进入编辑页面</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                    stripedRows={true}
                >
                    {this.getList()}
                </TableBody>
            </Table>
        );
    }

}

function mapStateToProps({  }: any) {
    return { };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        getVideos: bindActionCreators(actions.videoFetch, dispatch)
    };
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

// export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoList);
export default VideoList;