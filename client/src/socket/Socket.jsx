import React, { Component } from 'react';

import SocketService from './service';

export default class Socket extends Component {
  state = {
    timestamp: '',
  };
  
  componentDidMount() {
    SocketService.subscribeToTimer((error, result) => {
      this.setState({
        timestamp: result,
      })
    });
  }

  render() {
    return (
      <div>{this.state.timestamp}</div>
    );
  }
}
