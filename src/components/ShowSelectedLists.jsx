import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import removeCart from '../actions/removeCart';
import removeWishList from '../actions/removeWishlist';
export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeCart: removeCart,
        removeWishList: removeWishList
    }, dispatch);
}
export const mapStateToProps = (state) => {
    return {
        products: state.productsInfo, userCarts: state.userShoppingCart
    }
}
let totalSelected = 0, totalPrice = 0;
class ShowSelectedLists extends React.Component {
    constructor(props) {
        super();
        this.state = { "total_amount": 0, "total_item": 0, "pay_method": false, "pay_option": 0,"show_addeded":[] };
       // this.showCartItems = this.showCartItems.bind(this);
    }
    handleRemoveListWithDispatch = (id, category, removeCartType) => {
        //console.log(id+"......."+category);
        if (removeCartType === "cart")
            this.props.removeCart({ "id": id, "category": category });
        else
            this.props.removeWishList({ "id": id, "category": category });
    }
    showCartItems = () => {
        const _this = this;
        const _thisStates = _this.props.states;
        const popModal = _this.refs.view_cart_modal;
        //const popModal = document.getElementById("view_cart_modal");
        const cart_items = document.getElementById("cart_items");
        const cartFooter = document.getElementById("cartFooter");
        //const target = popModal.target || popModal.srcElement;
        let cartClass = false;
        if (popModal !== undefined && popModal !== null) {
            cartClass = (' ' + popModal.className + ' ').indexOf('cart') > -1;
            let userSelectedProducts, addRemoveClass;
            if (cartClass) {
                userSelectedProducts = _thisStates.states.userCarts;
                _this.refs.listType.innerText = "Cart";
                _this.refs.cartFooter.style.display = "block";
                // cart_items.innerText = "Cart";
                // cartFooter.style.display = "block";
                addRemoveClass = "cart";
            }
            else {
                userSelectedProducts = _thisStates.states.wishLists;
                _this.state = { "total_item": 0, "total_amount": 0, "pay_method": false };
                _this.refs.listType.innerText = "WishList";
                _this.refs.cartFooter.style.display = "none";
                // cart_items.innerText = "WishList";
                // cartFooter.style.display = "none";
                addRemoveClass = "wishlist"
            }
            let itemTotalPrice = 0, itemCount = 0;
            const emptyCountArr = [];
             _this.callCartListApi(userSelectedProducts,addRemoveClass) .then(foundProducts => {
                return foundProducts;
            }).catch(err => {
             
            });
            /*  if (userSelectedProducts !== undefined)
                  return userSelectedProducts.map(function (addedCartLists) {
                      const itemId = parseInt(addedCartLists.id);
                      let itemCategory = addedCartLists.category;
                      if (itemCategory === "Watch") {
                          itemCategory = "watches"
                      } else {
                          itemCategory = "bags"
                      }
                      //    const products = _thisStates.products[itemCategory];
                      const products = _thisStates.states.products;
                      products.map(function (productLists) {
                          const lists = productLists.lists ;
                          const findIndex = lists.map(function (e) { return e.productId; }).indexOf(itemId);
                          if (findIndex > -1) {
                              itemCount++;
                              const productName = lists[findIndex].productName;
                              const offerPercentage = parseInt(lists[findIndex].offerPercentage);
                              let priceElem, price;
                              if (offerPercentage !== 0) {
                                  const newPriceAmount = lists[findIndex].price - lists[findIndex].price * offerPercentage / 100;
                                  price = newPriceAmount;
                                  priceElem = <span className={"new_price price"}>Rs {newPriceAmount}</span>;
                              } else {
                                  price = lists[findIndex].price;
                                  priceElem = <span className={"old_price price"}>Rs {price}</span>;
                              }
                              itemTotalPrice += parseInt(price);
                              if (emptyCountArr.indexOf(itemCount) === -1) {
                                  totalSelected = itemCount;
                                  totalPrice = itemTotalPrice;
                                  //   _this.state = { "total_item": itemCount, "total_amount": itemTotalPrice,"pay_method":false };
                                  emptyCountArr.push(itemCount);
                              }
                              return <li className="list-group-item" key={itemId}>
                                  <span><img src={lists[findIndex].image} alt="" className="img-fluid cart-images" /></span>
                                  <span>{productName}</span>
                                  <p className="price-with-offer">{priceElem}</p>
                                  <button className={addRemoveClass + " btn btn-default btn-remove-cart"} type="button" onClick={(event) => { event.preventDefault(); _this.handleRemoveListWithDispatch(itemId, products[findIndex].category, addRemoveClass) }}>Remove</button>
                              </li>
                          }
                      })
                  });*/
        }
    }
    callCartListApi = async(getDetails,addRemoveClass) => {
        const _this = this;
        const response = await fetch('/api/getCartProductDetails',
            {
                method: 'POST',
                body: JSON.stringify({
                    data: getDetails
                }),
                headers: { "Content-Type": "application/json" }
            });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.status === "OK") {
            const datas = body.data.filter(product => product.productId);
            let itemTotalPrice = 0, itemCount = 0;
            const emptyCountArr = [];
           return datas.map((productLists)=> {
                const lists = productLists ;
                    itemCount++;
                    const itemId = lists.productId;
                    const productName = lists.productName;
                    const offerPercentage = parseInt(lists.offerPercentage);
                    let priceElem, price;
                    if (offerPercentage !== 0) {
                        const newPriceAmount = lists.price - lists.price * offerPercentage / 100;
                        price = newPriceAmount;
                        priceElem = <span className={"new_price price"}>Rs {newPriceAmount}</span>;
                    } else {
                        price = lists.price;
                        priceElem = <span className={"old_price price"}>Rs {price}</span>;
                    }
                    itemTotalPrice += parseInt(price);
                    if (emptyCountArr.indexOf(itemCount) === -1) {
                        totalSelected = itemCount;
                        totalPrice = itemTotalPrice;
                        //   _this.state = { "total_item": itemCount, "total_amount": itemTotalPrice,"pay_method":false };
                        emptyCountArr.push(itemCount);
                    }
                   return <li className="list-group-item" key={itemId}>
                        <span><img src={lists.image} alt="" className="img-fluid cart-images" /></span>
                        <span>{productName}</span>
                        <p className="price-with-offer">{priceElem}</p>
                        <button className={addRemoveClass + " btn btn-default btn-remove-cart"} type="button" onClick={(event) => { event.preventDefault(); _this.handleRemoveListWithDispatch(itemId, lists.category, addRemoveClass) }}>Remove</button>
                    </li>
            });
        }
    }
    showCartAmountDetails = () => {
        // this.setState({ "total_item": totalSelected });
        // this.setState({ "total_amount": totalPrice });
        // const totalAmount = this.state.total_amount;
        //  const totalItem = this.state.total_item;
        const totalAmount = totalPrice;
        const totalItem = totalSelected;
        const selectedItems = this.props.states.userCarts
        if (totalAmount > 0 && totalItem > 0 && selectedItems.length > 0) {
            return <div><p>Cart Subtotal ({totalItem} items): <span className="total_amount">Rs {totalAmount}</span></p>
                <button type="button" className="btn btn-success btn-proceed" onClick={this.handleProceedPurchase.bind(this)}>Proceed Items</button>
            </div>
        } else {
            return <p>Your Cart is Empty!</p>
        }
    }
    handleProceedPurchase = () => {
        this.props.parentState.total_amount = totalPrice;
        this.props.parentState.total_item = totalSelected;
        this.props.triggerProceedPurchase();
    }
    render() {
        return (
            <div className="modal" ref="view_cart_modal" id="view_cart_modal">
                <div className="model-header">
                    <p>Your <span ref="listType" id="listType">Cart</span> Items</p>
                </div>
                <div className="model-body">
                    <ul className="list-group cart-items" ref="cart_items">
                        {this.showCartItems()}
                    </ul>
                </div>
                <div className="model-footer" ref="cartFooter" id="cartFooter">
                    {this.showCartAmountDetails()}
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSelectedLists);
