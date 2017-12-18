import { connect, Dispatch } from 'react-redux';
import * as React from 'react';

import * as actions from '../actions';
import { StoreState } from '../types';

interface Props {
    isOpen?: boolean;
    onEditStart?: () => void;
    onEditEnd?: () => void;
}

class Map extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    editView() { 
        const { isOpen } = this.props;
        if (isOpen) {
            return (
                <div className="map_editview"></div>
            );
        }
        return null;
    }

    render() {
        const { onEditStart, onEditEnd } = this.props;
        return (
            <div id="map" className="map">
                <div className="map_btns">
                    <button onClick={onEditStart}>start</button>
                    <button onClick={onEditEnd}>end</button>
                </div>  
                {this.editView()}
            </div>
        );
    }
}

function mapStateToProps({ map: { isOpen }}: StoreState) {
    return {
        isOpen,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.EditAction>) {
    return {
        onEditStart: () => dispatch(actions.startEdit()),
        onEditEnd: () => dispatch(actions.endEdit()),
    };
}

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Map);