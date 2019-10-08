import React, { Component } from 'react';
import Product from '../components/Product';  
import PropTypes from 'prop-types';
import '../utils/util.css';
import PostProduct from '../components/PostProduct';
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions/dataActions';

export class home extends Component {

    componentDidMount(){
        this.props.getProducts();
     }

    render() {
        const { products, loading } = this.props.data;
        
        let recentProductsMarkup =  !loading ? (                      
            products.map((product) => <Product key={product.idProduto} product={product} />)
        ) : ( <p>Loading...</p> )
        return (
            <>
            <div className="box">
                {recentProductsMarkup}
            </div>
            <PostProduct />
            </>
        )
    }
}

home.propTypes = {
    getProducts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})
export default connect(mapStateToProps, { getProducts })(home);
