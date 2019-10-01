import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
import '../utils/util.css';
// MUI Stuff
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

dayjs.locale('pt-br')
const styles = {
    card: {
        maxHeight: '400px'
    },
    image: {
        minWidth: 200,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        textAlign: 'center'
    },
    cardHeader: {
        display: 'flex'
    }
}

export class Product extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, product : { nome, valor, descricao, categoria, dataPublicacao, urlFotoVendedor, urlImagem, vendedor, idVendedor, idProduto } } = this.props;
        return (
            <Card className={classes.card}>            
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                    <Avatar src={urlFotoVendedor}/>
                    }
                    title={
                        <Typography 
                            variant="h5" 
                            component={Link} 
                            to={`/users/${vendedor}`} 
                            color="primary">{vendedor}
                        </Typography>   
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
        )
    }
}

export default withStyles(styles)(Product);
