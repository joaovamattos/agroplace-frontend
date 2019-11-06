import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_CONVERSATIONS_READ,
  SET_CONVERSATIONS,
  SET_CONTACTS,
  SET_MESSAGES,
  LOADING_MESSAGES,
  SET_AUTHENTICATED
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/products");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginGoogle = (userData, token) => dispatch => {
  dispatch({ type: LOADING_UI });
  
  axios
    .post("/signupGoogle", userData)
    .then(() => {
      setAuthorizationHeader(token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  return "deslogado";
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/products");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const sendEmail = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/sendPasswordResetEmail", userData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(res => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .put("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const updatePassword = pass => dispatch => {
  axios
    .put("/user/updatePassword", pass)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const markConversationsRead = conversationsIds => dispatch => {
  axios
    .put("/conversations", conversationsIds)
    .then(() => {
      dispatch({
        type: MARK_CONVERSATIONS_READ
      });
    })
    .catch(err => console.log(err));
};

export const sendMessage = message => dispatch => {
  axios
    .post("/message", message)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getMessages = id => dispatch => {
  axios
    .get(`/messages/${id}`)
    .then(res => {
      dispatch({ type: LOADING_MESSAGES });
      dispatch({
        type: SET_MESSAGES,
        payload: res.data
      });
    })
    .catch(err => console.log("Nenhuma conversa encontrada"));
};

export const getConversations = () => dispatch => {
  axios
    .get("/conversations")
    .then(res => {
      dispatch({ type: LOADING_USER });
      dispatch({
        type: SET_CONVERSATIONS,
        payload: res.data
      });
    })
    .catch(err => console.log("Nenhuma conversa encontrada"));
};

export const getContacts = () => dispatch => {
  axios
    .get("/contacts")
    .then(res => {
      dispatch({ type: LOADING_USER });
      dispatch({
        type: SET_CONTACTS,
        payload: res.data
      });
    })
    .catch(err => console.log("Nenhum contato encontrado"));
};

export const addContact = (id) => dispatch => {
    axios
      .post(`/contact/${id}`)
      .then(res => {
        dispatch(getContacts());
      })
      .catch(err => console.log("Erro ao adicionar contatos"));
  };

export const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
