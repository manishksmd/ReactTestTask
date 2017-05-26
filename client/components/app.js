'use strict'
/**
 * @class         :	Application Portal
 * @description   : This class handles application header footer and content section
 * @Created by    : smartData
 */

import React, { Component } from 'react';
import {Link} from 'react-router';
import Header from './common/header';
import Alert from 'react-s-alert';

export default class App extends Component {
  
  constructor(props) {
        super(props);
  }

  render() {

    return (
      <div>
          <Header />
          <div id="wrapper">
            {this.props.children}
            <Alert stack={{ limit: 3}} position="top-right" timeout={3000} effect="slide" />
          </div>
      </div>
    );
  }
}
