import React, { Component } from "react";
import { Link } from "react-router-dom";
class SideNavComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accessories: false,
            bags: false,
            fashion: false,
            electronics: false,
            appliances: false,
            sports: false
        };
    }
    render() {
        return <div className="nav-side-menu">
            <div className="brand">Categories</div>
            <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
            <div className="menu-list">
                <ul id="menu-content" className="menu-content collapse out">
                    <li>
                        <a href="#">
                            <i className="fa fa-bars fa-lg"></i> All Categories
                        </a>
                    </li>
                    <li data-toggle="collapse" data-target="#accessories" className="collapsed active" onClick={() => this.setState({ accessories: !this.state.accessories })}>
                        <a href="#"><i className="fa fa-cog fa-lg"></i> Accessories<span className="arrow"></span></a>
                    </li>
                    {this.state.accessories ? <ul className="sub-menu collapse" id="accessories">
                        <li><Link to="/products/watches">Watches</Link></li>
                        <li><a href="#">footwear</a></li>
                    </ul> : null}
                    <li data-toggle="collapse" data-target="#bags" className="collapsed" onClick={() => this.setState({ bags: !this.state.bags })}>
                        <a href="#"><i className="fa fa-shopping-bag fa-lg"></i> Bags <span className="arrow"></span></a>
                    </li>
                    {this.state.bags ? <ul className="sub-menu collapse" id="bags">
                        <li><Link to="/products/bags">Suitcase</Link></li>
                        <li><Link to="/products/bags">Travel</Link></li>
                        <li><Link to="/products/bags">Student</Link></li>
                    </ul> : null}
                    <li data-toggle="collapse" data-target="#fashion" className="collapsed" onClick={() => this.setState({ fashion: !this.state.fashion })}>
                        <a href="#"><i className="fa fa-female fa-lg"></i> Fashion <span className="arrow"></span></a>
                    </li>
                    {this.state.fashion ? <ul className="sub-menu collapse" id="fashion">
                        <li>Men</li>
                        <li>Women</li>
                    </ul> : null}
                    <li>
                        <a href="#">
                            <i className="fa fa-tv fa-lg"></i> Electronics
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-home fa-lg"></i> Appliances
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-futbol-o fa-lg"></i> Sports
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    }
}
export default SideNavComponent;