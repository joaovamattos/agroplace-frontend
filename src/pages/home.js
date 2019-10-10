import React, { Component } from 'react';
import Product from '../components/Product';  
import PropTypes from 'prop-types';
import '../utils/util.css';
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions/dataActions';
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";

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
            <Link to="/product">
                <Tooltip title="Cadastrar um produto">
                <Fab color="primary" onClick={this.handleOpen} aria-label="add" className="floating-button">
                    <AddIcon />
                </Fab>
                </Tooltip>
            </Link>
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
