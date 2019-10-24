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
        height: '60px',
        maxWidth: '90%',
        paddingLeft: 10,
        marginBottom: 10
    },
    noUserImg: {
        minWidth: 40,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: '50%',
    },
    name:{
        width: "40%",
        height: 14,
        backgroundColor: '#fff',
        marginBottom: 5
    },
    message: {
        height: 12,
        width: '75%',
        marginTop: 10,
        backgroundColor: '#e3fbe3'
    },
}

const ConversationSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 4 }).map((item, index) => (
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

ConversationSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConversationSkeleton);