import React from 'react';
import PropTypes from 'prop-types';
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
// Icons
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

const styles = theme => ({
    ...theme.spreadThis,
    noImg: {
        width: 200,
        height: 200,
        backgroundColor: '#ccc',
        borderRadius: '50%',
        margin: '0 auto',
        marginBottom: 10
    },
    name: {
        height: 20,
        backgroundColor: '#20CE6C',
        width: '20%',
        margin: '0 auto 7px auto'
    },
    line:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '20%',
        margin: '0 auto'
    },
    emailLine: {        
        height: 16,
        backgroundColor: '#ccc',
        width: '100%',
    },
    phoneLine: {        
        height: 16,
        backgroundColor: '#ccc',
        width: '60%',
    }
})

const ProfileSkeleton = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className={classes.noImg} />
                <hr/>
                <div className="profile-details">
                    <div className={classes.name} />
                    <hr/>
                    <div className={classes.line}>
                        <EmailIcon color="primary" /> <div className={classes.emailLine} />
                    </div>
                    <hr/>
                    <div className={classes.line}>
                        <PhoneIcon color="primary" /> <div className={classes.phoneLine} />
                    </div>
                    <hr/>
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
