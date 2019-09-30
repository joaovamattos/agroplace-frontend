import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/green-agroplace.svg';
import { Link } from 'react-router-dom';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux Stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

export class signup extends Component {    
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            phone: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors)
            this.setState({ errors: nextProps.UI.errors });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            name: this.state.name,
            phone: this.state.phone
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    
    nameChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Agroplace" className={classes.image}></img>
                    <Typography variant="h5" className={classes.pageTitle}>Criar uma conta</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField 
                            id="name" 
                            name="name" 
                            type="text" 
                            label="Nome completo" 
                            className={classes.textField} 
                            helperText={errors.name} 
                            error={errors.name ? true : false} 
                            value={this.state.name} 
                            onChange={this.nameChange} 
                            fullWidth
                        />

                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField} 
                            helperText={errors.email} 
                            error={errors.email ? true : false} 
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth
                        />

                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Senha" 
                            className={classes.textField} 
                            helperText={errors.password} 
                            error={errors.password ? true : false} 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth
                        />

                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirmação de senha" 
                            className={classes.textField} 
                            helperText={errors.confirmPassword} 
                            error={errors.confirmPassword ? true : false} 
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                            fullWidth
                        />

                        <TextField 
                            id="phone" 
                            name="phone" 
                            type="text" 
                            label="Telefone" 
                            className={classes.textField} 
                            helperText={errors.phone} 
                            error={errors.phone ? true : false} 
                            value={this.state.phone} 
                            onChange={this.handleChange} 
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
                            Criar conta
                            { loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br />
                        <small>Você já possui uma conta? Faça Login <Link to="/login">aqui</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));