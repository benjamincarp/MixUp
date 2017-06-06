import { connect } from 'react-redux'
import RegisterComponent from '../components/register.jsx';
import * as userActions from '../actions/user';

const mapStateToProps = (state, ownProps) => {
    return {isLoggedIn: state.user.isLoggedIn}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    submitAction: () => dispatch(userActions.register()),
    fieldUpdateAction: (key, value) => dispatch(userActions.updateCredentialsField(key, value))
});

const Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterComponent);

export default Register