import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import { StoreState } from '../types';
import * as actions from '../actions';

import { getMarker } from '../api/feature';

class Map extends React.Component<any, any> {

    componentDidMount() {
        const { initialize } = this.props;
        initialize();
    }

    render() {
        return (
            <div id="map" className="map"></div>
        );
    }
}

function mapStateToProps({ map: { mapObject, source, collection }}: StoreState) {
    return { mapObject, source, collection };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        initialize: () => dispatch(actions.initialize())
    };
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Map);