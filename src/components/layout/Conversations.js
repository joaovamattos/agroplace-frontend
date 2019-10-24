import React, { Component, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// MUI Stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import MessageIcon from "@material-ui/icons/Message";
import BookmarkIcon from "@material-ui/icons/Bookmark";
// Redux Stuff
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { markConversationsRead, getConversations } from "../../redux/actions/userActions";
import ConversationNavbar from "../../utils/skeletons/ConversationNavbarSkeleton";

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
  handleItemClick = (id) => {
    let ids = [];
    ids.push(id);
    this.props.markConversationsRead(ids);    
    this.handleClose();
  };

  render() {
    const conversations = this.props.conversations;
    const anchorEl = this.state.anchorEl;
    const loading = this.props.loading;
    

    let conversationsIcon;
    if (conversations && conversations.length > 0) {
      conversations.filter(conv => conv.visualizada === false).length > 0
        ? (conversationsIcon = (
            <Badge
              badgeContent={
                conversations.filter(conv => conv.visualizada === false).length
              }
              color="secondary"
            >
              <MessageIcon style={{color: '#fff'}} />
            </Badge>
          ))
        : (conversationsIcon = <MessageIcon style={{color: '#fff'}} />);
    } else {
      conversationsIcon = <MessageIcon style={{color: '#fff'}} />;
    }

    dayjs.extend(relativeTime);

    let conversationsMarkup =
      conversations && conversations.length > 0 ? (
        conversations.slice(0, 3).map(conv => {
          return (
            <MenuItem key={conv.id} onClick={() => {this.handleItemClick(conv.id)}}>
              <img
                src={conv.urlImagem}
                alt="Mensagem"
                width={45}
                height={45}
                style={{ borderRadius: "50%", marginRight: 10 }}
              />
              <div style={{display:'flex', flexDirection: 'column'}}>
                <Typography variant="body1">{conv.nome}</Typography>
                <Typography variant="body2">{conv.mensagem}</Typography>
              </div>            
              {!conv.visualizada ? (<BookmarkIcon color="primary" style={{ alignSelf: 'start' }} />) : (null)}
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          Você ainda não possui mensagens
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Mensagens">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {conversationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.OnMenuOpened}
          style={{maxWidth: '340px'}}
        >
          { loading ? <ConversationNavbar /> : conversationsMarkup}
          <MenuItem component={Link} to="/conversations" style={{color: '#161616'}} onClick={this.handleClose}>
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
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  conversations: state.user.conversations,
  loading: state.user.loading
});

export default connect(
  mapStateToProps,
  { markConversationsRead, getConversations }
)(Conversations);
