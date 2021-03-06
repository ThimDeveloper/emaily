import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null: {
        return;
      }
      case false: {
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      }
      default: {
        return [
          <li key={0}>
            <Payments />
          </li>,
          <li key={1} style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key={2}>
            <a href="/api/logout">Logout</a>
          </li>
        ];
      }
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{ margin: 8 }}>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            <i className="large material-icons">email</i>
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
