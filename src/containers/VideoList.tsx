import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

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
import { getVideos } from '../api/feature';

class VideoList extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    update() {
        const { videos, getVideos } = this.props;
        if (!videos) {
            getVideos();
        }
    }

    getList() {
        const { videos } = this.props; 
        if (!videos) return null;
        const uis = videos.map((m: any, i: number) => this.createRow(m, i));
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
                <TableRowColumn><RaisedButton onClick={this.onEditClick(i)} label="编辑" primary={true} /></TableRowColumn>
            </TableRow>
        );
    }

    onEditClick(num: number) {
        const { setCurrent, history } = this.props;
        return () => {
            setCurrent(num);
            history.push('/map');
        }
    }

    render() {
        this.update();
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

function mapStateToProps({ video: { current, videos } }: StoreState) {
    return { current, videos };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        setCurrent: (num:number) => dispatch(actions.setCurrent(num)),
        getVideos: bindActionCreators(actions.videoFetch, dispatch),
    };
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoList);