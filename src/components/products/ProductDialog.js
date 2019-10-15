import React, { Component } from "react";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
// Redux Stuff UnfoldMore
import { connect } from "react-redux";
import { getProduct, clearErrors } from "../../redux/actions/dataActions";

dayjs.locale("pt-br");

const styles = theme => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: "none",
    magin: 4
  },
  productImage: {
    width: "100%",
    height: 260,
    objectFit: "cover",
    backgroundSize: "cover",
    borderRadius: "4px",
    marginTop: 30,
    marginBottom: 10
  },
  dialogContent: {
    padding: "20px 20px 10px 20px"
  },
  closeButton: {
    position: "absolute",
    right: "10px"
  },
  expandButton: {
    position: "absolute",
    right: "5%",
    bottom: "16px"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  },
  submitButton: {
    float: "right",
    bottom: 0,
    margin: "10px 0"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  }
});

class ProductDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { idVendedor, idProduto } = this.props;
    const newPath = `/users/${idVendedor}/product/${idProduto}`;

    if (oldPath === newPath) oldPath = `/users/${idVendedor}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getProduct(this.props.idProduto);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      product: {
        nome,
        valor,
        descricao,
        categoria,
        dataPublicacao,
        urlImagem
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} />
      </div>
    ) : (
      <Grid container className={classes.content}>
        <img src={urlImagem} alt={nome} className={classes.productImage} />
        <Grid item sm={12}>
          <Typography color="primary" variant="h4">
            {nome}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(dataPublicacao).fromNow()}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="h6">{descricao}</Typography>
          <Typography variant="body1">{valor}</Typography>
          <Typography variant="body2">{categoria}</Typography>
          <hr className={classes.invisibleSeparator} />
          <Link to="#">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Entrar em contato
            </Button>
          </Link>
        </Grid>
      </Grid>
    );

    return (
      <>
        <MyButton
          onClick={this.handleOpen}
          tip="Expandir produto"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

ProductDialog.propTypes = {
  getProduct: PropTypes.func.isRequired,
  idProduto: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.data.product,
  UI: state.UI
});

const mapActionsToProps = {
  getProduct,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProductDialog));
