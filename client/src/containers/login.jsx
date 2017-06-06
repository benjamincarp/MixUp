import { connect } from 'react-redux'
import LoginComponent from '../components/login.jsx';
import * as userActions from '../actions/user';

const mapStateToProps = (state, ownProps) => {
    return {isLoggedIn: state.user.isLoggedIn}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    submitAction: () => dispatch(userActions.login()),
    fieldUpdateAction: (key, value) => dispatch(userActions.updateCredentialsField(key, value))
});

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

export default Login