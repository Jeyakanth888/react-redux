import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import HomeComponent from './components/Home';
import ProductListsComponent from './components/ProductLists';
import SearchListsComponent from './components/SearchLists';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import './google.fonts.css';
import './styles.css';
import './sidenav.css';

import { bindActionCreators } from 'redux';
import getProducts from './actions/allproducts';

function mapStateToProps(state) {
  let productsInfo = state.productsInfo;
  let userShoppingCart =  state.userShoppingCart;
  let wishLists =  state.userWishLists;
  return { products: productsInfo, userCarts: userShoppingCart,wishLists: wishLists };
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      getAllProducts: getProducts,
  }, dispatch);
}
class App extends Component {
componentDidMount = ()=>{
  this.loadAllProducts();
}
loadAllProducts =()=> { 
  fetch('/api/allProducts')
  .then(response =>  response.text())
  .then(respjson => {                    // 2
    const respData = JSON.parse(respjson);
    if (respData.status === "OK") {
        const responsedata = respData.data;
        this.props.getAllProducts({ "products": responsedata });
    }
  })
  .catch(error => { console.log('request failed', error); });
}
  render() {
    
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <HomeComponent {...props} states={this.props} />} />
          <Route path="/products/" render={(props) => <ProductListsComponent {...props} states={this.props} />} />
          <Route path="/search/" render={(props) => <SearchListsComponent {...props} states={this.props} />} />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);