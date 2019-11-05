import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/green-agroplace.svg";
import { Link } from "react-router-dom";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import GoogleIcon from "../images/google.svg";
// Redux Stuff
import { connect } from "react-redux";
import { loginUser, loginGoogle } from "../redux/actions/userActions";
import firebase from "firebase";
import { setAuthorizationHeader } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.spreadThis,
  icon: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "10px"
  },
  socialButton: {
    marginBottom: "20px"
  }
});

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "pt";

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
  }

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  loginGoogle = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.idToken;
        var user = result.user;
        const name = user.displayName;
        const email = user.email;
        const imageUrl = user.photoURL;
        const userData = {
          name,
          email,
          imageUrl
        };
        this.props.loginGoogle(userData);
        setAuthorizationHeader(token);
        this.props.history.push("/products");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <div className="formCenter">
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={AppIcon} alt="Agroplace" className={classes.image}></img>
            <Typography variant="h5" className={classes.pageTitle}>
              Entrar
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="E-mail"
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
                Entrar
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <p>- Ou -</p>
              <Button
                onClick={this.loginGoogle}
                variant="outlined"
                color="secondary"
                className={classes.socialButton}
              >
                <img src={GoogleIcon} alt="Google" className={classes.icon} />{" "}
                Fazer login com Google
              </Button>
              <br />
              <small>
                Esqueceu a senha? <Link to="/resetPassword">Clique aqui</Link>
              </small>
              <br />
              <small>
                Não tem uma conta ainda? Crie uma conta{" "}
                <Link to="/signup">aqui</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  loginGoogle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
