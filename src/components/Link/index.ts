import { connect } from 'react-redux';
import { actions } from 'store';
import Link from './Link';
const mapStateToProps = (state: AppState) => ({
	sceneChanging: state.sceneChanging
});
const mapDispatchToProps = (dispatch: DispatchFunction) => ({
	setScreenChaning: (isChanging: boolean) => dispatch(actions.setScreenChaning(isChanging))
});
export default connect(mapStateToProps, mapDispatchToProps)(Link);
