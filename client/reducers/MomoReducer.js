/**
 * @reducer       : GroupsReducer
 * @description   :
 * @Created by    : smartData
 */

import { createReducer } from '../utils';
import { GET_ROW_CONST } from '../actions/Constants';

const initialState = {
    data: [],
    isFetching: true,
    isFetchingById: true,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isSubmitting: null,
    statusColor: null
};

export default createReducer(initialState, {
    [GET_ROW_CONST.GET_ROW_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    },
    [GET_ROW_CONST.GET_ROW_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'data': payload,
            'isFetching': false
        });
    },
    [GET_ROW_CONST.GET_ROW_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': false
        });
    },
    [GET_ROW_CONST.POST_ROW_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isSubmitting': true,
            'statusText': null
        });
    },
    [GET_ROW_CONST.POST_ROW_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isSubmitting': false,
            'isAuthenticated': true,
            'statusText': 'Quote submitted successfully.'
        });
    },
    [GET_ROW_CONST.POST_ROW_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isSubmitting': false,
            'isAuthenticated': false,
            'statusText': null
        });
    },
    [GET_ROW_CONST.REMOVE_ROW__REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [GET_ROW_CONST.REMOVE_ROW__SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'statusText': 'Quote has beed deleted successfully.'
        });

    },
    [GET_ROW_CONST.REMOVE_ROW__FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'statusText': null
        });
    },
    [GET_ROW_CONST.QUOTE_ELIGIBILITY_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'statusColor': false,
            'statusText': null
        });
    },
    [GET_ROW_CONST.QUOTE_ELIGIBILITY_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'statusColor' : true,
            'statusText' : 'You can not add more than 15 quotes.'
        });
    }
});
