import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from './../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        // Name of the application
        name="Emaily"
        //Amount is in US cents, $5 = 500 cents
        amount={500}
        // Token recieved from STRIPE
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

const mapDispatchToProps = {
  handleToken: actions.handleToken,
  fetchUser: actions.fetchUser
};

export default connect(
  null,
  mapDispatchToProps
)(Payments);
