import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// MUI Stuff
import MessageIcon from "@material-ui/icons/Message";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// Redux Stuff
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  markConversationsRead,
  getConversations
} from "../../redux/actions/userActions";
import ConversationNavbar from "../../utils/skeletons/ConversationNavbarSkeleton";
import ConversationsList from "./ConversationsList";
import ConversationsIcon from "./ConversationsIcon";
class Conversations extends Component {
  componentDidMount() {
    this.props.getConversations();
  }
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleItemClick = id => {
    let ids = [];
    ids.push(id);
    this.props.markConversationsRead(ids);
    this.handleClose();
  };

  render() {
    const userId = this.props.userId;
    const anchorEl = this.state.anchorEl;
    const loading = this.props.loading;

    return (
      <Fragment>
        <Tooltip placement="top" title="Mensagens">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {userId ? (
              <ConversationsIcon userId={userId} />
            ) : (
              <MessageIcon style={{ color: "#fff" }} />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.OnMenuOpened}
          style={{ maxWidth: "340px" }}
        >
          {loading && !userId ? (
            <ConversationNavbar />
          ) : (
            <ConversationsList
              userId={userId}
              handleItemClick={this.handleItemClick}
            />
          )}
          <MenuItem
            component={Link}
            to="/messages"
            style={{ color: "#161616" }}
            onClick={this.handleClose}
          >
            Ver todas as mensagens
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

Conversations.propTypes = {
  markConversationsRead: PropTypes.func.isRequired,
  getConversations: PropTypes.func.isRequired,
  conversations: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  conversations: state.user.conversations,
  userId: state.user.id,
  loading: state.user.loading
});

export default connect(
  mapStateToProps,
  { markConversationsRead, getConversations }
)(Conversations);
