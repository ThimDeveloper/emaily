import React, { Component } from 'react';

export default class Test extends Component {
  state = {
    didMount: 'Before'
  };
  ApiCall = async () => {
    const url = 'api/current_user';
    const user = await fetch(url, (err, res) => {
      if (err) {
        return err;
      }
      return user;
    });
    console.log(user);
    return user;
  };

  async componentDidMount() {
    const user = await this.ApiCall();
    console.log(user);
    this.setState({
      didMount: 'Mounted'
    });
  }
  render() {
    return <div>{this.state.didMount}</div>;
  }
}
