import React, { Component } from "react";
import TopNavComponent from '../components/TopNavComponent.jsx';
import CartListsComponent from '../components/ViewCartComponent.jsx';
import TopSearchNavComponent from '../components/TopSearchNavComponent.jsx';
class ProductLists extends Component {
    displayProducts = () => {
       
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        let lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
        lastSegment = lastSegment.replace("#", "");
        const productCategory = this.props.states.products[lastSegment];
      
        const _this = this;
        // const products = _this.props.states.products;
        // return Object.keys(products).map(function (product, index) {
        // const productCategory = products[product];
        return productCategory.map(function (item, i) {
            const productName = item.productName;
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
            return <div className="col-md-2 products-cards" key={i} data-product-id={item.productId} data-product-type={item.category}>
                <div className="card">
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
        return (<div>
              
            <TopNavComponent states={this.props} />
            <CartListsComponent states={this.props.states} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                    <TopSearchNavComponent states={this.props.states} />
                        <div className="products_row row">
                            {this.displayProducts()}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default ProductLists;