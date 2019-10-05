import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MessageIcon from "@material-ui/icons/Message";
import Logo from "../images/white-agroplace.svg";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
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
      color: '#212121'
  }
}));

export default function Navbar() {
  const authenticated = useSelector(state => state.user.authenticated);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
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
            <img src={Logo} alt="Agroplace" className={classes.title} />
            </Link>
            <div>
              <Tooltip title="Mensagens">
                <IconButton aria-label="veja suas mensagens" color="inherit">
                  <Badge badgeContent={11} color="secondary">
                    <MessageIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

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
                <Link to="/user" className={classes.link}>
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>
                <MenuItem onClick={(handleClose, handleLogout)}>Sair</MenuItem>
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
                Login
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
