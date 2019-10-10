import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
import '../utils/util.css';
import DeleteProduct from './DeleteProduct';
// MUI Stuff
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MyButton from '../utils/MyButton';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

dayjs.locale('pt-br')
const styles = {
    card: {
        maxHeight: '400px',
        position: 'relative'
    },
    image: {
        minWidth: 200,
    },
    media: {
        height: '220px',
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        textAlign: 'center',
        maxHeight: '100px'
    },
    cardHeader: {
        display: 'flex'
    },
    updateBtn: {
        position: 'absolute',
        right: '20%'
    }
}

export class Product extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, product : { nome, valor, descricao, categoria, dataPublicacao, urlFotoVendedor, urlImagem, vendedor, idVendedor, idProduto }, user: { authenticated, id } } = this.props;
        
        const deleteButton = authenticated && id === idVendedor ? (
            <DeleteProduct idProduto={idProduto} />
        ) : null
        const updateButton = authenticated && id === idVendedor ? (
            <MyButton tip="Editar produto" btnClassName={classes.updateBtn}>
                <Link to={`/product/${idProduto}`}>
                    <EditIcon color="primary" />
                </Link>
            </MyButton>
        ) : null
        return (
            <Card className={classes.card}>            
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                    <Avatar src={urlFotoVendedor}/>
                    }
                    title={
                        <>
                        <Typography 
                            variant="h5" 
                            component={Link} 
                            to={`/users/${vendedor}`} 
                            color="primary">{vendedor}
                        </Typography>
                        {updateButton}   
                        {deleteButton}
                        </>
                    }
                    subheader={
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(dataPublicacao).fromNow()}
                        </Typography>
                    }
                />      
                <CardMedia
                    className={classes.media}
                    image={urlImagem}
                    title={nome}
                />
            <CardContent className={classes.content}>
                    <Typography 
                        variant="h5"
                        component={Link} 
                        to={`/products/${idProduto}`} 
                        color="primary"
                    >{nome}
                    </Typography>
            </CardContent>
            </Card>
        )}
}

Product.propTypes = {
    user: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Product));
