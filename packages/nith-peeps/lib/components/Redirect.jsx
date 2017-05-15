import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class RedirectToCompleteProfile extends Component {
  componentDidMount() {
    const { route } = this.props
    browserHistory.push(route);
  }

  render() {
    return <div></div>
  }
}

export default RedirectToCompleteProfile;
