/**
 * @class         :	header
 * @description   : 
 * @Created by    : smartData
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
    render() {
        return (
          <header>
            <div className="logo-brand">
                <a href="javascript:void(0)"><img src="/client/assets/template/images/logo.png" alt="Logo" /></a>
            </div>
        </header>
        );
    }
}