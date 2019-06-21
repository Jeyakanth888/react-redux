import React, { Component } from "react";
class PayMethodComponent extends Component {
    constructor(props) {
        super();
        this.state = { "pay_option": 0 };
    }
    handleProceedPayment = () => {
        const selectedPayMethod = this.state.pay_option;
        if (selectedPayMethod !== 0) {
            this.props.state.pay_option = selectedPayMethod;
            this.props.triggerProceedPayMethod();
        } else {
            alert("select paymethod");
        }
    }
    handleSelectOption = (selEle) => {
        if (selEle.target.checked)
            this.setState({ pay_option: selEle.target.value });
        else
            this.setState({ pay_option: 0 });
    }
    render() {
        return <div>
            <div className="model-header">
                <p>Select Payment Option</p>
            </div>
            <div className="model-body">
                <ul className="list-group" ref="pay_method" id="pay_method">
                    <li className="list-group-item">
                        <input type="radio" id="net_banking" value="1" name="radio-group" onChange={((e) => this.handleSelectOption(e))} />
                        <label htmlFor="net_banking">Net Banking</label>
                    </li>
                    <li className="list-group-item">
                        <input type="radio" id="card" value="2" name="radio-group" onChange={((e) => this.handleSelectOption(e))} />
                        <label htmlFor="card">Credit/Debit Card</label>
                    </li>
                    <li className="list-group-item">
                        <input type="radio" id="cash" value="3" name="radio-group" onChange={((e) => this.handleSelectOption(e))} />
                        <label htmlFor="cash">Cash on Delivary</label>
                    </li>
                    <li className="list-group-item">
                        <input type="radio" id="paytm" value="4" name="radio-group" onChange={((e) => this.handleSelectOption(e))} />
                        <label htmlFor="paytm">PayTM</label>
                    </li>
                </ul>
                <div className="row">
                    <p>You have to Pay : <span className="total_amount">Rs {this.props.state.total_amount}</span></p>
                </div>
            </div>
            <div className="model-footer" ref="cartFooter">
                <button type="button" className="btn btn-success btn-proceed" onClick={this.handleProceedPayment.bind(this)}>Proceed Payment</button>
            </div>
        </div>
    }
}
export default PayMethodComponent;