import React from 'react';
import PayMethodComponent from '../components/PayMethodComponent.jsx';
import ShowSelectedItems from '../components/ShowSelectedLists.jsx';

class viewCartComponent extends React.Component {
    constructor(props) {
        super();
        this.state = { "total_amount": 0, "total_item": 0, "pay_method": false, "pay_option": 0 };
        this.handleProceedPurchase = this.handleProceedPurchase.bind(this);
      
    }
    handleProceedPurchase() {
        this.setState({ "pay_method": true });
    }
    handleProceedPayMethod() {
        console.log(this.state.pay_option);
        
    }
    render() {
        return (
           <div>
                {!this.state.pay_method ? <ShowSelectedItems states={this.props.states} parentState ={this.state} triggerProceedPurchase={this.handleProceedPurchase} /> : <PayMethodComponent  triggerProceedPayMethod={this.handleProceedPayMethod} state={this.state}/>}
            </div>
        )
    }
}
export default viewCartComponent;
