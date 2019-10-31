import React, { useState, useMemo } from "react";
import { postProduct } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import InputMask from "react-input-mask";
// MUI Stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Icons
import CameraIcon from "@material-ui/icons/CameraAlt";
// --- //
import "../utils/util.css";

const styles = makeStyles(theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: "20px",
    marginBottom: "20px"
  },
  formBox: {
    maxWidth: "720px",
    width: "90%",
    margin: "0 auto"
  },
  title: {
    fontSize: "1.6em",
    marginBottom: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  progressSpinnerPic: {
    position: "absolute",
    color: "#fff",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
}));

export default function New({ history }) {
  const loadingPic = useSelector(state => state.data.loadingPic);
  const loading = useSelector(state => state.UI.loading);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Frutas");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const product = {
      name: name,
      price: price,
      description: description,
      category: category
    };

    dispatch({ type: "LOADING_PIC" });
    await axios
      .post("/product/image", formData)
      .then(res => {
        return res;
      })
      .then(res => {
        return (product.imageUrl = res.data.urlImage);
      })
      .catch(err => console.log(err));
    dispatch({ type: "STOP_LOADING_PIC" });
    dispatch(postProduct(product));
    history.push("/products");
  }

  const classes = styles();
  return (
    <form onSubmit={handleSubmit} className={classes.formBox}>
      <Typography className={classes.title}>Cadastrar novo produto</Typography>
      <div className="thumb-holder">
        <label
          id="thumbnail"
          style={preview ? { backgroundImage: `url(${preview})` } : {}}
          className={thumbnail ? "hasThumbnail" : ""}
        >
          <input
            type="file"
            onChange={event => setThumbnail(event.target.files[0])}
            disabled={loadingPic}
          />
          <CameraIcon />
        </label>
        {loading && (
          <CircularProgress size={120} className={classes.progressSpinnerPic} />
        )}
        {loadingPic && (
          <CircularProgress size={120} className={classes.progressSpinnerPic} />
        )}
      </div>

      <TextField
        name="name"
        type="text"
        label="Nome do produto"
        ṕlaceholder="Ex: Alface"
        value={name}
        onChange={event => setName(event.target.value)}
        required
        className={classes.textField}
        fullWidth
        disabled={loadingPic}
      />

      <InputMask
        mask="R$ 99.99"
        name="price"
        type="number"
        className={classes.textField}
        disabled={loadingPic}
        value={price}
        onChange={event => setPrice(event.target.value)}
        >
        {() => (
          <TextField
          label="Valor (Kg)"
          ṕlaceholder="R$ 03.00"
          required
          fullWidth
          />
        )}
      </InputMask>

      <TextField
        name="description"
        type="text"
        label="Descrição do produto"
        ṕlaceholder="Ex: Alface"
        value={description}
        onChange={event => setDescription(event.target.value)}
        required
        className={classes.textField}
        fullWidth
        disabled={loadingPic}
      />

      <FormControl fullWidth>
        <InputLabel htmlFor="category">Categoria *</InputLabel>
        <Select
          name="category"
          value={category}
          onChange={event => setCategory(event.target.value)}
          input={<Input id="category" />}
          disabled={loadingPic}
        >
          <MenuItem value={"Frutas"}>Frutas</MenuItem>
          <MenuItem value={"Verduras"}>Verduras</MenuItem>
          <MenuItem value={"Legumes"}>Legumes</MenuItem>
          <MenuItem value={"PANC"}>PANC</MenuItem>
          <MenuItem value={"Sementes"}>Sementes</MenuItem>
          <MenuItem value={"Flores"}>Flores</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
        disabled={loadingPic}
      >
        Cadastrar
        {loadingPic && (
          <CircularProgress size={30} className={classes.progressSpinner} />
        )}
      </Button>
    </form>
  );
}
