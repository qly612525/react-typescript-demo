import { connect, Dispatch } from 'react-redux';

import Hello from '../components/Hello';
import * as actions from '../actions';
import { StoreState } from '../types';

function mapStateToProps({ demo: { enthusiasmLevel, languageName }}: StoreState) {
    return {
        enthusiasmLevel,
        name: languageName,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction> ) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    }
}

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);