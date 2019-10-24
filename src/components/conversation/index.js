import React from "react";

import { Chat } from "../chat";
import { MessagesPanel } from "../messagesPanel";
import { Container, Panel, ConversationsIndicator } from "./styles";
import { useSelector } from "react-redux";
import ConversationSkeleton from '../../utils/skeletons/ConversationSkeleton'

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

export const Conversation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const loading = useSelector(state => state.user.loading);
  const conversations = useSelector(state => state.user.conversations);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Panel>
        <ConversationsIndicator>
          <TabPanel value={value} index={0} className={classes.tabPanel}>
            {loading ? <ConversationSkeleton /> : (
              conversations
                ? conversations.map(conv => <Chat key={conv.id} data={conv} />)
                : <p>Você não possui mensagens ainda!</p>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabPanel}>
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
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
        <MessagesPanel />
      </Panel>
    </Container>
  );
};
