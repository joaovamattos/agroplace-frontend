import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getProduct,
  postProduct,
  uploadProductImage
} from "../redux/actions/dataActions";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Fab from "@material-ui/core/Fab";
import FormHelperText from "@material-ui/core/FormHelperText";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: "20px",
    marginBottom: "20px"
  },
  progressSpinner: {
    position: "absolute"
  },
  progressSpinnerPic: {
    position: "fixed",
    color: "#fff",
    top: "18%",
    margin: "0 auto",
    left: 0,
    right: 0
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5px"
  },
  picture: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "85%",
        right: "10px",
        color: "#fff",
        background: "#20CE6C",
        marginBottom: "30px"
      }
    },
    "& .picture-image": {
      width: "100%",
      height: 260,
      objectFit: "cover",
      backgroundSize: "cover",
      borderRadius: "4px"
    }
  },
  formBox: {
    maxWidth: "800px",
    width: "90%",
    margin: "0 auto"
  }
});

class editProduct extends Component {
  
  componentDidMount() {
    this.props.getProduct('1nzJUHgpLiLSu7w0O68d');
  }

  state = {
    open: false,
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    errors: {}
  };

  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.UI.errors) {
  //       this.setState({
  //         errors: nextProps.UI.errors
  //       });
  //     }
  //     if (!nextProps.UI.errors && !nextProps.UI.loading) {
  //       this.setState({
  //         name: '',
  //         price: '',
  //         description: '',
  //         category: '',
  //         imageUrl: ''
  //       });
  //     }
  //   }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange(value) {
    this.setState({ category: value });
  }

  handleSubmit = event => {
    const url =
      "https://firebasestorage.googleapis.com/v0/b/agroplace-project.appspot.com/o/form_background.jpg?alt=media";
    if (this.props.data.product.urlImagem === url) return;
    event.preventDefault();
    let product = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      imageUrl: this.props.data.product.urlImagem
    };
    this.props.postProduct(product);
    this.setState({
      name: "",
      price: "",
      description: "",
      category: "",
      imageUrl: ""
    });
    this.props.data.product.urlImagem = url;
    const history = this.props.history;
    history.push("/");
  };

  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadProductImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render() {
    const { errors, category } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className={classes.formBox}>
          <div className={classes.picture}>
            <div className="image-wrapper">
              <img
                src={this.props.data.product.urlImagem}
                alt="Foto do produto"
                className="picture-image"
              />
              {this.props.data.product.loadingPic && (
                <CircularProgress
                  size={90}
                  className={classes.progressSpinnerPic}
                />
              )}
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <Tooltip title="Alterar foto do produto">
                <Fab
                  onClick={this.handleEditPicture}
                  className="Fab"
                  disabled={this.props.data.product.loadingPic}
                >
                  <EditIcon />
                </Fab>
              </Tooltip>
            </div>
          </div>

          <TextField
            name="name"
            type="text"
            label="Nome do produto"
            ṕlaceholder="Ex: Alface"
            error={errors.name ? true : false}
            helperText={errors.name}
            className={classes.textField}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="price"
            type="text"
            label="Valor (Kg)"
            ṕlaceholder="R$ 03.00"
            error={errors.price ? true : false}
            helperText={errors.price}
            className={classes.textField}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="description"
            type="text"
            label="Descrição do produto"
            ṕlaceholder="Ex: Alface"
            error={errors.description ? true : false}
            helperText={errors.description}
            className={classes.textField}
            onChange={this.handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel htmlFor="category">Categoria</InputLabel>
            <Select
              name="category"
              value={category}
              onChange={event => this.handleSelectChange(event.target.value)}
              input={<Input id="category" />}
            >
              <MenuItem value={"Frutas"}>Frutas</MenuItem>
              <MenuItem value={"Verduras"}>Verduras</MenuItem>
              <MenuItem value={"Organicos"}>Organicos</MenuItem>
              <MenuItem value={"PANC"}>PANC</MenuItem>
              <MenuItem value={"Sementes"}>Sementes</MenuItem>
              <MenuItem value={"Flores"}>Flores</MenuItem>
            </Select>
            {errors.category && (
              <FormHelperText> errors.category </FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={loading}
          >
            Cadastrar
            {loading && (
              <CircularProgress size={30} className={classes.progressSpinner} />
            )}
          </Button>
        </form>
      </Fragment>
    );
  }
}

editProduct.propTypes = {
  postProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  uploadProductImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  data: state.data
});

export default connect(
  mapStateToProps,
  { postProduct, uploadProductImage, getProduct }
)(withStyles(styles)(editProduct));
