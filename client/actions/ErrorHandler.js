/**
 * @action        : LoginActions
 * @description   : Handles all login actions
 * @Created by    : smartData
 */

import React from 'react';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';

  //@TODO check for props passing
  export function successHandler( SUCCESS, success ) {console.log("eee--", success);
    
    let alertText = success.response.statusText;

    Alert.success(alertText, {
        timeout: 1000,
    });
  }

  /**
   * [errorHandler description]
   * @param  {[type]} FAILURE [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   * @TODO Error handing for validation - api
   */
  export function errorHandler(FAILURE, error) {

        let alertText = error.response.statusText;
        Alert.error(alertText, {
            timeout: 1000,
            html: true
        });
  }
