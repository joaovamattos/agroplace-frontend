import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Product from '../components/products/Product';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null
    }
    componentDidMount(){
        const userId = this.props.match.params.id;
        console.log(userId);
        
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
        const productsMarkup = loading ? (
            <p>Loading data...</p>
        ) : products === null ? (
            <p>No products from this user</p>
        ) : (
            products.map(product => <Product key={product.idProduto} product={product} />)
        )
        return (
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading profile...</p>
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
    data: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserData })(user);
