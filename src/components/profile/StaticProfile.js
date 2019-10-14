import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// Mui Stuffy
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

const styles = theme => ({
    paper: {
        padding: 20,
        paddingBottom: 60,
        margin: '0 auto',
        display: 'block'
      },
      profile: {
        "& .image-wrapper": {
          textAlign: "center",
          position: "relative",
        },
        "& .profile-image": {
          width: 200,
          height: 200,
          objectFit: "cover",
          backgroundSize: "cover",
          maxWidth: "100%",
          borderRadius: "50%"
        },
        "& .profile-details": {
          textAlign: "center",
          "& span, svg": {
            verticalAlign: "middle"
          },
          "& a": {
            color: theme.palette.primary.main
          }
        },
        "& hr": {
          border: "none",
          margin: "0 0 10px 0"
        },
      }
  });

const StaticProfile = (props) => {
    const { classes, profile: { id, nome, email, urlImagem, telefone }} = props;

    return (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={urlImagem} alt="Foto de perfil" className="profile-image" />
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`users/${id}`}
                color="primary"
                variant="h5"
              >
                {nome}
              </MuiLink>
              <hr />
              <Fragment>
                <EmailIcon color="primary" /><span>{` ${email}`}</span>
                <hr />
              </Fragment>
              {telefone && (
                <Fragment>
                  <PhoneIcon color="primary" /> <span>{telefone}</span>
                  <hr />
                </Fragment>
              )}
            </div>
          </div>
        </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);