import React, { Component } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import Product from '../components/Product';  

const styles = {
    box: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto'
    }
}

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
        const { classes } = this.props;
        let recentProductMarkup = this.state.products ? (
            this.state.products.map(product => <Product key={product.productId} product={product} />)
        ) : <p>Loading...</p>
        return (
            <div className={classes.box}>
                {recentProductMarkup}
            </div>
        )
    }
}

export default withStyles(styles)(home)
