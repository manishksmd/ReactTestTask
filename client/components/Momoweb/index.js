/**
 * @class         :	Mometic
 * @description   : 
 * @Created by    : smartData
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ANOTHERFORM from './AnotherForm';
import LISTQUOTE from './ListQuotes';
import moment from 'moment';

class Mometic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime : null
        };
    }

    componentDidMount(){
        document.title = "Signout - Users";
    }

    render() {
        return (
        <div>
        <header>
            <div className="logo-brand">
                <a href="javascript:void(0)"><img src="/client/assets/template/images/logo.png" alt="Logo" /></a>
            </div>
        </header>
        <main>
            <div className="top-panel">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="tab_container">
                            <h3 className="d_active tab_drawer_heading" rel="tab1">Tab 1</h3>
                            <div id="tab1" className="tab_content">
                                <img src="/client/assets/template/images/listing-img.png" alt="" />
                            </div>
                            {/*<!-- #tab1 -->*/}
                            <h3 className="tab_drawer_heading" rel="tab2">Tab 2</h3>
                            <div id="tab2" className="tab_content">
                                <div className="">
                                    <ANOTHERFORM />
                                </div>
                            </div>
                            {/*<!-- #tab2 -->*/}
                            <h3 className="tab_drawer_heading" rel="tab3">Tab 3</h3>
                            <div id="tab3" className="tab_content">
                                <h2>Tab 3 content</h2>
                                <p>Nulla eleifend felis vitae velit tristique imperdiet. Etiam nec imperdiet elit. Pellentesque sem lorem, scelerisque sed facilisis sed, vestibulum sit amet eros.</p>
                            </div>
                            {/*<!-- #tab3 -->*/}
                            <h3 className="tab_drawer_heading" rel="tab4">Tab 4</h3>
                            <div id="tab4" className="tab_content">
                                <h2>Tab 4 content</h2>
                                <p>Integer ultrices lacus sit amet lorem viverra consequat. Vivamus lacinia interdum sapien non faucibus. Maecenas bibendum, lectus at ultrices viverra, elit magna egestas magna, a adipiscing mauris justo nec eros.</p>
                            </div>
                            {/*<!-- #tab4 -->*/}
                            </div>
                            {/*<!-- .tab_container -->*/}
                        </div>
                        </div>
                    </div>
                </div>
            
            <div className="bottom-panel">
            <div className="container-fluid">
                <div className="row">
                    <LISTQUOTE />
                    <div className="col-sm-12">
                    <ul className="rows tabs">
                        <li className="col-sm-3 active " rel="tab1">Quote</li>
                        <li rel="tab2" className="col-sm-3">Popular</li>
                        <li rel="tab3" className="col-sm-3">Filter</li>
                        <li rel="tab4" className="col-sm-3">Alert</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
    </main>
    </div>
        );
    }
}

export default connect(null, null)(Mometic);