import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/green-agroplace.svg';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux Stuff
import { connect } from 'react-redux';
import { sendEmail } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

export class resetPass extends Component {    
    constructor(){
        super();
        this.state = {
            email: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors)
            this.setState({ errors: nextProps.UI.errors });
        if(!nextProps.UI.errors)
            this.setState({ 
                errors: {},
                email: ''
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
        }
        this.props.sendEmail(userData, this.props.history);
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <div className='formCenter'>
                <Grid container className={classes.form}>
                    <Grid item sm/>
                    <Grid item sm>
                        <img src={AppIcon} alt="Agroplace" className={classes.image}></img>
                        <Typography variant="h5" className={classes.pageTitle}>Enviar e-mail de redefinição de senha</Typography>
                        <form noValidate onSubmit={this.handleSubmit}>

                            <TextField 
                                id="email" 
                                name="email" 
                                type="email" 
                                label="E-mail" 
                                className={classes.textField} 
                                value={this.state.email} 
                                onChange={this.handleChange} 
                                error={errors.error ? true : false}
                                helperText={errors.error}
                                fullWidth
                            />
                            {errors.general && (
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                                disabled={loading}
                            >
                                Enviar e-mail
                                { loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                            </Button>
                        </form>
                    </Grid>
                    <Grid item sm/>
                </Grid>
            </div>
        )
    }
}

resetPass.propTypes = {
    classes: PropTypes.object.isRequired,
    sendEmail: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    sendEmail
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(resetPass));