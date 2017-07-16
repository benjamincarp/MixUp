import React, {Component} from 'react';
import { connect } from 'react-redux'

import {fetchUserIfNeeded} from '../actions/user';
import HeaderComponent from '../components/header.jsx';

class HeaderContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { loadUser } = this.props;
        loadUser();
    }
    
    render () {
        console.log(`hideLoginLink=${this.props.hideLoginLink}`);
        return (
            <HeaderComponent hideLoginLink={this.props.hideLoginLink} isLoggedIn={this.props.isLoggedIn} user={this.props.user}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        loadUser: () => dispatch(fetchUserIfNeeded())
    }
);

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);

export default Header;