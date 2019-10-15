import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// MUI Stuff
import Card from '@material-ui/core/Card';
import withStyles from "@material-ui/core/styles/withStyles";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

const styles = theme => ({
    card: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        maxHeight: '400px', 
        height: 383
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: '83px',
        width: '100%',
        marginLeft: 16
    },
    noUserImg: {
        minWidth: 40,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: '50%',
    },
    name:{
        width: "55%",
        height: 18,
        backgroundColor: '#20CE6C',
        marginBottom: 7
    },
    date: {
        height: 14,
        width: '25%',
        backgroundColor: '#dbdbdb'
    },
    noProductImg: {
        width: '100%',
        height: 220,
        backgroundColor: '#96fdc3',
    },
    halfLine:{
        height: 20,
        width: '50%',
        backgroundColor: '#20CE6C'        
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        height: 80,
        margin: '0 25px',
        position: 'relative'
    },
    expandButton: {
        position: "absolute",
        right: "8%",
        bottom: "28px"
    },
})

const ProductSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <div className={classes.header}>
                <div className={classes.noUserImg} />
                <div style={{width: '100%', marginLeft: 16, height: 40}}>
                    <div className={classes.name}/>
                    <div className={classes.date}/>
                </div>
            </div>
                <div className={classes.noProductImg} />
                <div className={classes.footer}>
                    <div className={classes.halfLine}/>
                </div>
                <div style={{position: 'relative'}}>
                    <UnfoldMore color="primary" className={classes.expandButton} />
                </div>
        </Card>
    ));

    return <Fragment>{content}</Fragment>
}

ProductSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductSkeleton);