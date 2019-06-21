import React, { Component } from "react";
import TopNavComponent from '../components/TopNavComponent.jsx';
import TopSearchNavComponent from '../components/TopSearchNavComponent.jsx';
import NotFoundComponent from '../components/NotFoundComponent.jsx';
class SearchListsComponent extends Component {
  constructor(props) {
    super(props);
    this.displaySearchItems = this.displaySearchItems.bind(this);
  }
  displaySearchItems = () => {     
    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    let lastSegment = parts.pop() || parts.pop();  
    lastSegment = lastSegment.replace("#", "");
    return <NotFoundComponent/>
    
  }
  render() {
    return <div>
      <TopNavComponent states={this.props} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <TopSearchNavComponent states={this.props.states} />
            <div className="products_row row">
              {this.displaySearchItems}
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
export default SearchListsComponent;