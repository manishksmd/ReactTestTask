/**
 * @class         :	404
 * @description   : Not Found
 * @Created by    : smartData
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getQuoteData, addQuote, notEligibleForQuote } from '../../actions';

class AddQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputVal : null,
            disabled : true,
            quoteData : []
        };
    }

    componentWillReceiveProps( nextProps ) {

        if ( nextProps.quoteData && this.props.quoteData !== nextProps.quoteData ) {
            let quote = nextProps.quoteData;
            this.setState( { quoteData : quote } );
        }
    }

    changeInputState(e) {
        e.preventDefault();
        this.setState({ inputVal : e.target.value, disabled : e.target.value.length > 0 ? false : true });        
    }

    onSubmitHandler(e) {
        e.preventDefault();
        //console.log(this.state.inputVal);
        //Call API for search values
        if(this.state.quoteData.length >= 5) {
            this.props.notEligibleForQuote();
        } else {
            this.props.addQuote(this.state.inputVal);
            this.setState({ disabled : true });
            document.getElementById("inputQuote").value = "";       
        }        
    }

    render() {
        return (               
            <div className="form-group submit">
                <input
                        required
                        type="text"
                        className="form-control"
                        id="inputQuote"
                        placeholder="Symbol"                            
                        maxLength="30"
                        value={this.state.symbol}
                        onChange={(e)=>this.changeInputState(e)} />
            
                <button id="save_quote" disabled={this.state.disabled} type="button" className="btn btn-primary" onClick={(e)=>this.onSubmitHandler(e)}>
                { this.props.isSubmitting === true ? 'Submitting' : 'Submit' }
                </button>
            </div>
               
        );
    }
}

function mapStateToProps(state) {
     return {
         isSubmitting : state.quoteData.isSubmitting,
         statusText : state.quoteData.statusText,
         quoteData : state.quoteData.data
     }
}

export default connect(mapStateToProps, { getQuoteData, addQuote, notEligibleForQuote })(AddQuote);
