/**
 * @class         :	404
 * @description   : Not Found
 * @Created by    : smartData
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import ADDQUOTE from './AddQuote';
import { getQuoteData, deleteQuote } from '../../actions';

class ListQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime : null,
            quoteData : []
        };
    }

    componentWillMount() {
        let currentTime = moment().format('HH:MM');
        this.setState({ currentTime : currentTime });
        let This = this;
        this.props.getQuoteData();
        setInterval(function(){ 
            This.props.getQuoteData();            
         }, 30000); // 30 sec - 30000
    }

    componentWillReceiveProps( nextProps ) {

        if ( nextProps.quoteData && this.props.quoteData !== nextProps.quoteData ) {
            let quote = nextProps.quoteData;
            this.setState( { quoteData : quote } );
        }
    }

    deleteRow(e, deleteId) {
        e.preventDefault();        
        // call api to delete row
        this.props.deleteQuote(deleteId);       
    }

    showMessage() {console.log(this.props.statusColor);
        
        setTimeout(function() {
            document.getElementById("success_msg").innerHTML = "";
        }, 5000);

        return(
            <div id="success_msg" 
                 className={this.props.statusColor === true ? 'field-error margin-top-msg' : 'field-success margin-top-msg'} >
                {this.props.statusText ? this.props.statusText : ''}
            </div>
        );
    }

    renderLists() {
        
        if(this.props.isFetching) {
            <li className="col-sm-12">
                <div className="row">
                    Loading ...
                </div>
            </li>
        }

        if(this.state.quoteData.length === 0) {
            <li className="col-sm-12">
                <div className="row">
                    No quote available.
                </div>
            </li>
        }
        
        if(this.state.quoteData) {
            
            return this.state.quoteData.map((quote) => {
                return(
                    <li className="col-sm-12" key={quote.id} id={`row_${quote.id}`}>
                            <div className="row">
                                <div className="col-sm-2">
                                    <h5>{ quote.symbol }</h5>
                                </div>
                                <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <h5>LAST <span>{ quote.last }</span></h5>
                                    </div>
                                    <div className="col-sm-4">
                                        <h5>High <span>{ quote.high }</span></h5>
                                    </div>
                                    <div className="col-sm-4">
                                        <h5>Low <span>{ quote.low }</span></h5>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-4">
                                    <h5>Vol <span>{ quote.volume }</span></h5>
                                    <span className="pull-right">
                                        <a href="javascript:void(0)" 
                                           className="remove"
                                           onClick={(e)=>this.deleteRow(e, quote.id)}>
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </a>
                                    </span>
                                </div>
                            </div>
                    </li>
                    );
            });
        }        
    }

    render() {
        return (

          <div className="col-sm-12">
            <div className="col-sm-6">
                <ADDQUOTE />
                {this.showMessage()}
            </div>
            
            <p className="time text-right">{ this.state.currentTime } EST</p>
            <ul className="row">
                { this.renderLists() }                
            </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
     return {
         isFetching : state.quoteData.isFetching,
         quoteData : state.quoteData.data,
         isAuthenticating : state.quoteData.isAuthenticating,
         statusText : state.quoteData.statusText,
         isSubmitting : state.quoteData.isSubmitting,
         statusColor : state.quoteData.statusColor
     }
}

export default connect(mapStateToProps, { getQuoteData, deleteQuote })(ListQuote);