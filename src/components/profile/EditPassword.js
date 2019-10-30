import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { updatePassword } from "../../redux/actions/userActions";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockIcon from "@material-ui/icons/Lock";

import MyButton from '../../utils/MyButton';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'left',
    },
    dialogTitle: {
        fontSize: '.5em'
    }
})

class EditPassword extends Component {
    state = {
        newPassword: '',
        confirmNewPassword: '',
        errors: {},
        open: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({
            errors: nextProps.UI.errors
          });
        }
        if (!nextProps.UI.errors) {
          this.setState({
            errors: {},
            newPassword: '',
            confirmNewPassword: ''
          });          
          this.handleClose();
        }
      }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const pass = {
            newPassword: this.state.newPassword,
            confirmNewPassword: this.state.confirmNewPassword
        };
        this.props.updatePassword(pass); 
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { errors } = this.state;
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Alterar senha" onClick={this.handleOpen} btnClassName={classes.button}>
                    <LockIcon color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle className={classes.dialogTitle}>Alterar senha</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="newPassword"
                                type="password"
                                label="Nova senha"
                                placeholder="Sua nova senha"
                                className={classes.textField}
                                value={this.state.newPassword}
                                onChange={this.handleChange}
                                error={errors.error ? true : false}
                                helperText={errors.error}
                                fullWidth
                            />
                            <TextField
                                name="confirmNewPassword"
                                type="password"
                                label="Confirmação de senha"
                                placeholder="Confirme a nova senha"
                                className={classes.textField}
                                value={this.state.confirmNewPassword}
                                onChange={this.handleChange}
                                error={errors.error ? true : false}
                                helperText={errors.error}
                                fullWidth
                            />
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
        )
    }
}

EditPassword.propTypes = {
    updatePassword: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
  });

export default connect(mapStateToProps, { updatePassword })(withStyles(styles)(EditPassword));
