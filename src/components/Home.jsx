import React from 'react';
import Slider from '../components/SliderComponent.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import addCart from '../actions/addCart';
import addWishList from '../actions/addWishlist';
import removeWishList from '../actions/removeWishlist';
import TopNavComponent from '../components/TopNavComponent.jsx';
import CartListsComponent from '../components/ViewCartComponent.jsx';
import SideNavComponent from '../components/SideNavComponent.jsx';
import TopSearchNavComponent from '../components/TopSearchNavComponent.jsx';
//const dispatch = require('dispatch');
export const mapDispatchToProps = (dispatch) => {
    /* return {
         handleAddCartWithDispatch: () => dispatch({ type: 'ADD_CART' })
     }*/
    return bindActionCreators({
        addCart: addCart,
        addWishList: addWishList,
        removeWishList: removeWishList
    }, dispatch);
}
function mapStateToProps(state) {
    return { products: state.productsInfo, userCarts: state.userShoppingCart };
}
class HomeComponent extends React.Component {
    handleAddCartWithDispatch = (id, category) => {
       // this.props.addCart({ "id": id, "category": category });
       this.addCartApiCall(id,category);
    }
    addCartApiCall = async(pid,category)=>{
        const _this = this;
        const response = await fetch('/api/addCart',
            {
                method: 'POST',
                body: JSON.stringify({
                    user_id: 1,
                    product_id: pid,
                    product_type:category
                }),
                headers: { "Content-Type": "application/json" }
            });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.status === "OK") {
           
        }
    }
    handleWishListDispatch = (elem, id, category) => {
        const element = elem.target || elem.source;
        const checkClass = (' ' + element.className + ' ').indexOf('wishlist-selected') > -1;
        if (checkClass) {
            element.classList.remove('wishlist-selected');
            this.props.removeWishList({ "id": id, "category": category });
        } else {
            this.props.addWishList({ "id": id, "category": category });
            element.classList.add('wishlist-selected');
        }
    }

    displayProducts = productCategory => {
        const _this = this;
        // const products = _this.props.states.products;
        // return Object.keys(products).map(function (product, index) {
        // const productCategory = products[product];
        // return <div className={product}>
        const userCartItems = _this.props.states.userCarts;
        const userWishLists = _this.props.states.wishLists;
     
        return productCategory.lists.slice(0, 6).map(function (item, i) {
            const productName = item.productName;
            const productId = item.productId;
            let addCardClass,addWHClass = '';
          
           const findIndex =  userCartItems.map(function (cartlist) { return cartlist.id; }).indexOf(productId);
           const findIndex2 =  userWishLists.map(function (lists) { return lists.id; }).indexOf(productId);
           if(findIndex>-1){
             addCardClass = "selected_item disabled";
           }
           if(findIndex2>-1){
            addWHClass = "wishlist-selected";
           }
            const offerPercentage = parseInt(item.offerPercentage);
            let priceType, showPrice, newPrice;
            if (offerPercentage !== 0) {
                priceType = "old_price";
                showPrice = <strike><span className={priceType + " price"}>Rs {item.price}</span></strike>;
                const newPriceAmount = item.price - item.price * offerPercentage / 100;
                newPrice = <p><span className={"new_price price"}>Rs {Math.round(newPriceAmount)}</span></p>;
            } else {
                priceType = "new_price";
                showPrice = <span className={priceType + " price"}>Rs {item.price}</span>;
                newPrice = "";
            }
            return <div className="col-md-2 products-cards" key={i} >
                <div className= {addCardClass+ " card" } data-product-id={item.productId} data-product-type={item.category}>
                    <span className={addWHClass+" wishlist-icon"} onClick={(event) => { event.preventDefault(); _this.handleWishListDispatch(event, item.productId, item.category) }}><i className="fa fa-cog" aria-hidden="true"></i></span>
                    <img className="card-img-top" src={item.image} className="img-fluid product-images " key={item.image} alt={productName} />
                    <div className="card-block" key={i}>
                        <h6 className="text-bold" key={productName}>{productName}</h6>
                        <p className="price-with-offer" key={item.price}>{showPrice}<span className="price_offer">Offer {item.offerPercentage}%</span></p>
                        {newPrice}
                        <button type="button" className="btn btn-default btn-add-cart" onClick={(event) => { event.preventDefault(); _this.handleAddCartWithDispatch(item.productId, item.category) }}>Add Cart</button>
                    </div>
                </div>
            </div>
        });
        //});
    }
    render() {
        const allProducts = this.props.states.products;
        const _this = this;
        return (<div>
            <CartListsComponent states={this.props} />
            <TopNavComponent  /> 
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-md-2 left-content">
                    <SideNavComponent />
                    </div>
                    <div className="col-md-10 right-content">
                    <TopSearchNavComponent states={this.props} />
                        <Slider />
                        <div className="home-product-lists">
                            <h3>Newest Products</h3>
                            {
                                Object.keys(allProducts).map(function (productWise, index) {
                                    return <div className={productWise} key={index}>
                                        <div className="products_row row">
                                            {_this.displayProducts(allProducts[productWise])}
                                        </div>
                                        <div className="row">
                                            <button type="button" className="btn btn-default btn-view-more"><Link to={"/products/" + productWise}>View More</Link></button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
//export default MainComponent;
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
