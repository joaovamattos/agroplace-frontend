import React, { Component } from "react";
import Product from "../components/products/Product";
import PropTypes from "prop-types";
import "../utils/util.css";
import { connect } from "react-redux";
import { getProducts, resetProduct } from "../redux/actions/dataActions";
// MUI Stuff
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// Icons
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmptyIcon from "../images/empty.svg";

import { Link } from "react-router-dom";
import ProductSkeleton from "../utils/skeletons/ProductSkeleton";

export class home extends Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.resetProduct();
  }

  state = {
    name: "",
    category: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange(value) {
    this.setState({ category: value });
  }

  render() {
    const { products, loading } = this.props.data;
    const { name, category } = this.state;

    let recentProductsMarkup = products
      .filter(p => p.categoria.toUpperCase().includes(category.toUpperCase()))
      .filter(p => p.nome.toUpperCase().includes(name.toUpperCase()))
      .map(product => <Product key={product.idProduto} product={product} />);

    return (
      <>
        <ExpansionPanel className="search-panel">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1">
              Pesquisar por nome ou filtrar por categoria
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="search-panel-details">
            <TextField
              name="name"
              type="text"
              label="Nome do produto"
              placeholder="Ex: Alface"
              value={name}
              onChange={this.handleChange}
            />
            <FormControl className="search-select">
              <InputLabel htmlFor="category">Categoria</InputLabel>
              <Select
                name="category"
                value={category}
                onChange={event => this.handleSelectChange(event.target.value)}
                input={<Input id="category" />}
              >
                <MenuItem value={""}>Mostrar Todos</MenuItem>
                <MenuItem value={"Frutas"}>Frutas</MenuItem>
                <MenuItem value={"Verduras"}>Verduras</MenuItem>
                <MenuItem value={"Organicos"}>Organicos</MenuItem>
                <MenuItem value={"PANC"}>PANC</MenuItem>
                <MenuItem value={"Sementes"}>Sementes</MenuItem>
                <MenuItem value={"Flores"}>Flores</MenuItem>
              </Select>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {loading ? (
          <div className="box">
            <ProductSkeleton />
          </div>
        ) : 
        recentProductsMarkup.length > 0 ? (
          <div className="box"> {recentProductsMarkup} </div>
        ) : (
          <div className="empty-box">
            <img src={EmptyIcon} alt="Nenhum produto" width={360} />
            <p>Nenhum produto encontrado!</p>
          </div>
        )}
        <Link to="/product">
          <Tooltip title="Cadastrar um produto">
            <Fab
              color="primary"
              onClick={this.handleOpen}
              aria-label="add"
              className="floating-button"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      </>
    );
  }
}

home.propTypes = {
  getProducts: PropTypes.func.isRequired,
  resetProduct: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});
export default connect(
  mapStateToProps,
  { getProducts, resetProduct }
)(home);
