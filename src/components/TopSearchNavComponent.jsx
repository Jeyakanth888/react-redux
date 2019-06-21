import React, { Component } from "react";
import { Redirect } from 'react-router'
const user = {
    firstName: 'Jeyakanth ',
    lastName: 'V'
};
function userName(user) {
    return user.firstName + ' ' + user.lastName;
}
class TopSearchNavComponent extends Component {
    constructor(props) {
        
        super(props) ;
        this.state = {"redirect": false,"searchVal": "" };
      }
    handleViewCartItems = showType => {
        const cartModal = document.getElementById("view_cart_modal");
        cartModal.classList.remove('cart');
        cartModal.classList.remove('wishlist');
        cartModal.classList.add(showType);
        const Flag = (' ' + cartModal.className + ' ').indexOf('active') > -1;
        if (Flag) {
            cartModal.classList.remove("active");
            cartModal.style.display = "none";
        } else {
            cartModal.classList.add("active");
            cartModal.style.display = "block";
        }
    }
    handleSearchItem  = ()=>{
       const searchItem = this.refs.search_item.value.trim() ;
      
       if(searchItem!==""){
         this.setState({searchVal:searchItem,redirect:true}) ;
         
       } 
    }
    render() {
        const _states = this.props.states.states;
        let wishCount = 0, cartCount =0;
        if (_states !== undefined) {
            if (_states.wishLists !== undefined && _states.wishLists !== null) {
                wishCount = _states.wishLists.length
            }
            if (_states.userCarts !== undefined && _states.userCarts !== null) {
                cartCount = _states.userCarts.length;
            } 
        }
        const  checkRedirect  = this.state.redirect;
        const  searchVal  = this.state.searchVal;
        
     
        if (checkRedirect) {
            return <Redirect to={'/search/'+searchVal} />;
          }
        return <div className="row search-bar-row">
            <div className="col-md-8">
                <div className="input-group">
                    <input type="text" className="form-control search-input" placeholder="Search..." ref="search_item"/>
                    <span className="input-group-addon" onClick={()=>this.handleSearchItem()}><i className="fa fa-search" aria-hidden="true"></i></span>
                </div>
            </div>
            <div className="col-md-4">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" onClick={() => { this.handleViewCartItems('wishlist') }}>
                        <a className="nav-link" href="#">  <span className="wishlist_count" >{wishCount}</span> <i className="fa fa-cog" aria-hidden="true"></i></a>
                    </li>
                    <li className="nav-item" onClick={() => { this.handleViewCartItems('cart') }}>
                        <a className="nav-link" href="#"> <span className="cart_count">{cartCount}</span><i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        {userName(user)}
                    </li>
                </ul>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                {userName(user)}
                            </li>

                        </ul>
                    </div>
            </div>
        </div>
    }
}
export default TopSearchNavComponent;