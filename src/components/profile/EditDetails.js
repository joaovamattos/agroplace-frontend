import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import InputMask from "react-input-mask";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

import MyButton from "../../utils/MyButton";

const styles = theme => ({
  ...theme.spreadThis,
  button: {
    float: "right"
  },
  dialogTitle: {
    fontSize: ".5em"
  }
});

class EditDetails extends Component {
  state = {
    nome: "",
    telefone: "",
    open: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  onChange = (event) => {
    this.setState({
      telefone: event.target.value
    });
  }

  handleSubmit = () => {
    const userDetails = {
      nome: this.state.nome,
      telefone: this.state.telefone
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const credentials = this.props;
    this.mapUserDetailsToState(credentials);
  }

  mapUserDetailsToState = credentials => {
    this.setState({
    telefone: credentials.telefone ? credentials.telefone : "",
      nome: credentials.nome ? credentials.nome : "",
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Editar perfil"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className={classes.dialogTitle}>
            Editar perfil
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="nome"
                type="text"
                label="Nome"
                placeholder="Seu nome completo"
                className={classes.textField}
                value={this.state.nome}
                onChange={this.handleChange}
                fullWidth
              />
              <InputMask
                mask="(99) 99999-9999"
                name="telefone"
                type="number"
                className={classes.textField}
                value={this.state.telefone}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    label="Telefone"
                    placeholder="Seu telefone"
                    fullWidth
                  />
                )}
              </InputMask>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Savar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
