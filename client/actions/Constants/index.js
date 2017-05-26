/**
 * @constants
 * @description   : Hold CONSTANTS and APIs
 * @Created by    : smartData
 */

import axios from 'axios';

/******************************* Define Pagination Constants *****************************/

export const PAGINATION_DEFAULT_LIMIT = '10';

/******************************* Define and Export Constants ****************************/

export const GET_ROW_CONST = {
                            GET_ROW_REQUEST : 'GET_ROW_REQUEST',
                            GET_ROW_SUCCESS : 'GET_ROW_SUCCESS',
                            GET_ROW_FAILURE : 'GET_ROW_FAILURE',

                            POST_ROW_REQUEST : 'POST_ROW_REQUEST',
                            POST_ROW_SUCCESS : 'POST_ROW_SUCCESS',
                            POST_ROW_FAILURE : 'POST_ROW_FAILURE',

                            REMOVE_ROW__REQUEST : 'REMOVE_ROW__REQUEST',
                            REMOVE_ROW__SUCCESS : 'REMOVE_ROW__SUCCESS',
                            REMOVE_ROW__FAILURE : 'REMOVE_ROW__FAILURE',

                            QUOTE_ELIGIBILITY_REQUEST : 'QUOTE_ELIGIBILITY_REQUEST',
                            QUOTE_ELIGIBILITY_SUCCESS : 'QUOTE_ELIGIBILITY_SUCCESS'
};

/************************************* API CONSTANTS ***************************************/

// creating global instance for the axios to call apis
export const AXIOS_INSTANCE = axios.create();
AXIOS_INSTANCE.defaults.headers.post['Content-Type'] = 'application/json';

//--------------------------------------------------------------------------------------------

// Define APIS

// GET http://52.39.212.226:4070/quote
// POST http://52.39.212.226:4070/quote
// DELETE: http://52.39.212.226:4070/quote/{ID}

const SERVER_URL = `http://52.39.212.226:4070`;
export const GET_QUOTE_DATA_API = `${SERVER_URL}/quote`; // GET - /quoteData?symbol=AAPL&field=4+10+11

