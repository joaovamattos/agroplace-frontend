import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Product from '../components/products/Product';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { getUserData, resetProduct } from '../redux/actions/dataActions';
import ProfileSkeleton from '../utils/skeletons/ProfileSkeleton';
import ProductSkeleton from '../utils/skeletons/ProductSkeleton';
import '../utils/util.css';

class user extends Component {
    state = {
        profile: null,
        idProdutoParam: null
    }
    componentDidMount(){
        this.props.resetProduct();

        const userId = this.props.match.params.id;
        const idProduto = this.props.match.params.idProduto;
        
        if(idProduto) this.setState({ idProdutoParam: idProduto });
        
        this.props.getUserData(userId);
        axios.get(`/user/${userId}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        const { products, loading } = this.props.data;       
        
        const { idProdutoParam } = this.state;
        const productsMarkup = loading ? (
            <ProductSkeleton />
        ) : products === null ? (
            <p className="no-products">Desculpe, não encontramos nenhum produto para esse usuário!</p>
        ) : !idProdutoParam ? (
            products.map(product => <Product key={product.idProduto} product={product} />)
        ) : (
            products.map(product => {
                if(product.idProduto !== idProdutoParam)
                    return <Product key={product.idProduto} product={product} />
                else return  <Product key={product.idProduto} product={product} openDialog/>
            })
        )
        return (
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
                <Grid item sm={12} xs={12}>
                    <div className="box">
                        {productsMarkup}
                    </div>
                </Grid>
            </Grid>   
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    resetProduct: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserData, resetProduct })(user);
