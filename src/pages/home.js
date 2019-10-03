import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';  
import '../utils/util.css';

export class home extends Component {
    state = {
        screams: null
    }
    componentDidMount(){
        axios.get('/products')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        let recentProductMarkup = this.state.products ? (
            this.state.products.map(product => <Product key={product.idProduto} product={product} />)
        ) : <p>Loading...</p>
        return (
            <div className="box">
                {recentProductMarkup}
            </div>
        )
    }
}

export default home
