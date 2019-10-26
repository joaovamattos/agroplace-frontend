import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import { borderColor } from '@material-ui/system';

const styles = {
    card: {
        display: 'flex',
        width: '95%',
        flexDirection: 'column',
        margin: '0 auto',
        flex: 1
    },
    messageSender:{
        width: "40%",
        height: 21,
        marginTop: 10,
        backgroundColor: '#eee',
    },
    messageSender2:{
        width: "80%",
        height: 21,
        marginTop: 10,
        backgroundColor: '#eee',
    },
    messageRecipient: {
        height: 21,
        width: '75%',
        marginTop: 10,
        backgroundColor: '#20CE6C',
        alignSelf: 'flex-end'
    },
    messageRecipient2: {
        height: 21,
        width: '50%',
        marginTop: 10,
        backgroundColor: '#20CE6C',
        alignSelf: 'flex-end'
    },
}

const MessagesSkeleton = (props) => {
    const { classes } = props;

    const content = 
        <div className={classes.card}>
            <div className={classes.messageSender2}/>
            <div className={classes.messageSender}/>
            <div className={classes.messageRecipient}/>
            <div className={classes.messageRecipient2}/>
            <div className={classes.messageSender}/>
            <div className={classes.messageSender2}/>
            <div className={classes.messageRecipient2}/>
            <div className={classes.messageRecipient}/>
        </div>

    return <Fragment>{content}</Fragment>
}

MessagesSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessagesSkeleton);