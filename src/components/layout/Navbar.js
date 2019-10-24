import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Conversation from "./Conversations";
// Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import Logo from "../../images/white-agroplace.svg";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";

const styles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    maxWidth: "80px",
    cursor: "pointer",
    marginTop: "5px"
  },
  center: {
    display: "flex"
  },
  link: {
    color: "#212121"
  }
}));

export default function Navbar(props) {
  const authenticated = useSelector(state => state.user.authenticated);
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.id);

  function handleLogout() {
    dispatch(logoutUser());
    handleClose();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = styles();
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <Link to="/">
              <Tooltip title="Página inicial">
                <img src={Logo} alt="Agroplace" className={classes.title} />
              </Tooltip>
            </Link>
            <div>
              <Conversation />
              <Tooltip title="Perfil">
                <IconButton
                  aria-label="Meu perfil"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to={`/users/${id}`} className={classes.link}>
                  <MenuItem onClick={handleClose}>Meus produtos</MenuItem>
                </Link>
                <Link to="/user" className={classes.link}>
                  <MenuItem onClick={handleClose}>Editar perfil</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/">
              <img src={Logo} alt="Agroplace" className={classes.title} />
            </Link>
            <div>
              <Button color="inherit" component={Link} to="/login">
                Entrar
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Crie uma conta
              </Button>
            </div>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
