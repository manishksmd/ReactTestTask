/**
 * @class         :	404
 * @description   : Not Found
 * @Created by    : smartData
 */

import React, { Component } from 'react';

import { Link } from 'react-router';

export default class AddQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime : null
        };
    }

    render() {
        return (
          <div className="col-sm-6 col-sm-offset-3 field-success">
                <h1>Coming Soon...</h1>
            </div>
        );
    }
}
