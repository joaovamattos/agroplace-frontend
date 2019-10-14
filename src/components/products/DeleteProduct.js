import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";
import { deleteProduct } from "../../redux/actions/dataActions";

const styles = {
    deleteButton: {
        position: 'absolute',
        right: '5%',
    }
};

export class DeleteProduct extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteProduct = () => {
        this.props.deleteProduct(this.props.idProduto);
        this.setState({ open: false });
    }
    render() {
    const { classes } = this.props;
    return (
      <>
        <MyButton
          tip="Deletar produto"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
            <DeleteOutline color="primary"/>
        </MyButton>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Você tem certeza que deseja deletar este produto?
            </DialogTitle>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={this.deleteProduct} color="secondary">
                    Deletar
                </Button>
            </DialogActions>
        </Dialog>
      </>
    );
  }
}

DeleteProduct.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  null,
  { deleteProduct }
)(withStyles(styles)(DeleteProduct));
