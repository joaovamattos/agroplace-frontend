import React, { useEffect } from "react";

import { Chat } from "../chat";
import { NotFound } from "../notFound";
import { MessagesPanel } from "../messagesPanel";
import { Container, Panel, ConversationsIndicator } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getContacts,
  markConversationsRead
} from "../../redux/actions/userActions";
import ConversationSkeleton from "../../utils/skeletons/ConversationSkeleton";
import ContactSkeleton from "../../utils/skeletons/ContactSkeleton";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  appbar: {
    boxShadow: "none"
  },
  tabPanel: {
    padding: "0",
    margin: 0,
    overflow: "auto"
  }
}));

export const Conversation = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [currentConversation, setCurrentConversation] = React.useState({});    
  useEffect(() => {
    const idConversations = props.location.state.currentConversation;
    setCurrentConversation({idConversations});
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const loading = useSelector(state => state.user.loading);
  const conversations = useSelector(state => state.user.conversations);
  const contacts = useSelector(state => state.user.contacts);

  const handleClick = currentConversation => {
    const conv = conversations.filter(c => c.id === currentConversation)[0];
    setCurrentConversation(conv);
    let ids = [];
    ids.push(currentConversation);
    dispatch(markConversationsRead(ids));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Panel>
        <ConversationsIndicator>
          <TabPanel value={value} index={0} className={classes.tabPanel}>
            {loading ? (
              <ConversationSkeleton />
            ) : conversations.length > 0 ? (
              conversations.map(conv => (
                <div key={conv.id} onClick={() => handleClick(conv.id)}>
                  <Chat data={conv} />
                </div>
              ))
            ) : (
              <NotFound conv={true} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabPanel}>
            {loading ? (
              <ContactSkeleton />
            ) : contacts.length > 0 ? (
              contacts.map(con => (
                <div key={con.id} onClick={() => handleClick(con.id)}>
                  <Chat data={con} />
                </div>
              ))
            ) : (
              <NotFound conv={false} />
            )}
          </TabPanel>
          <AppBar position="static" className={classes.appbar}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Conversas" {...a11yProps(0)} />
              <Tab label="Contatos" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
        </ConversationsIndicator>
        <MessagesPanel data={currentConversation} />
      </Panel>
    </Container>
  );
};
