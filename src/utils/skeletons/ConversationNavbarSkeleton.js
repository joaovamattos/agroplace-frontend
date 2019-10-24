import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    card: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: '55px',
        width: '100%',
        marginLeft: 16
    },
    noUserImg: {
        minWidth: 45,
        height: 45,
        backgroundColor: '#20CE6C',
        borderRadius: '50%',
    },
    name:{
        width: "40%",
        height: 16,
        backgroundColor: '#848484',
        marginBottom: 7
    },
    message: {
        height: 12,
        width: '75%',
        marginTop: 10,
        backgroundColor: '#848484'
    },
}

const ConversationNavbarSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 2 }).map((item, index) => (
        <div className={classes.card} key={index}>
            <div className={classes.header}>
                <div className={classes.noUserImg} />
                <div style={{width: '100%', marginLeft: 10, height: 40}}>
                    <div className={classes.name}/>
                    <div className={classes.message}/>
                </div>
            </div>
        </div>
    ));

    return <Fragment>{content}</Fragment>
}

ConversationNavbarSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConversationNavbarSkeleton);