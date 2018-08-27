import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import './bootstrap.min.css';

class CoinList extends React.Component {

constructor(props){
	super(props);
	this.state = {
		coinSymbol : "",
		coinPriceUsd : "",
		inputValue : ""

	}
	this.handleClick = this.handleClick.bind(this);
}

handleClick(){

	const url = "http://localhost:3000/coin?search=" + this.state.inputValue;
	axios.get(url)
      .then(res => {
        const coinData = res.data;
        this.setState({ 
        	coinSymbol: coinData.symbol,
        	coinPriceUsd : coinData.price_usd
         });
      })
      .catch(err => {
      	alert(err.response.data.status + " Coin " + this.state.inputValue + " " + err.response.statusText);
			this.setState({inputValue : "", coinSymbol : "", coinPriceUsd: ""});
      })
}

updateInputValue(e){
	const upperInputValue = e.target.value.toUpperCase();
	this.setState({inputValue : upperInputValue});
}

render() {
	return (
		<div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card my-5">
          <div className="card-body">
            <h2 className="card-title text-center">Crypto Search</h2>
            <h6 className="card-title text-center">Search Coins to Get Its Price</h6>
            <div className="form">
              <div className="form-label-group">
                <label>Enter Crypto Currency Symbol:</label>
                <input type="text" className="form-control" placeholder="Symbol" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}  required autoFocus />
              </div>
              <br/>
              <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.handleClick} type="submit">Search</button>
              <hr className="my-4" />
            </div>
            <div>
                <label>Coin Symbol:</label>
              <p>{this.state.coinSymbol}</p>
                <label>Coin Price:</label>
              <p>{this.state.coinPriceUsd}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
		);
}
}

ReactDOM.render(
<CoinList />,
document.getElementById("index")
)