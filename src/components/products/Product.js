import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductDialog from './ProductDialog';
import DeleteProduct from './DeleteProduct';
import MyButton from '../../utils/MyButton';
import '../../utils/util.css';

dayjs.locale('pt-br')
const styles = {
    card: {
        maxHeight: '400px',
        position: 'relative',
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
        maxHeight: '100px',
        width: '80%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardHeader: {
        display: 'flex',        
        maxWidth: '60%',
        overflow: 'hidden',
    },
    updateBtn: {
        position: 'absolute',
        right: '15%'
    },    
}

export class Product extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, product : { nome, dataPublicacao, urlFotoVendedor, urlImagem, vendedor, idVendedor, idProduto }, user: { authenticated, id } } = this.props;
        
        const deleteButton = authenticated && id === idVendedor ? (
            <DeleteProduct idProduto={idProduto} />
        ) : null
        const updateButton = authenticated && id === idVendedor ? (
            <Link to={`/product/${idProduto}`}>
                <MyButton tip="Editar produto" btnClassName={classes.updateBtn}>
                    <EditIcon color="primary" />
                </MyButton>
            </Link>
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
                            to={`/users/${idVendedor}`} 
                            color="primary"
                            noWrap>{vendedor}
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
                        color="primary"
                        noWrap
                    >{nome}
                    </Typography>
                    <ProductDialog idProduto={idProduto} idVendedor={idVendedor} openDialog={this.props.openDialog}/>
            </CardContent>
            </Card>
        )}
}

Product.propTypes = {
    user: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Product));
