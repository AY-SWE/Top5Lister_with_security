import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";

/**
 * @author Andy Yang
 */

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  GET_LOGGED_OUT: "GET_LOGGED_OUT",
  REGISTER_USER: "REGISTER_USER",
  LOGIN_USER: "LOGIN_USER",
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
  });
  const history = useHistory();

  useEffect(() => {
    auth.getLoggedIn();
  }, []);

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
        });
      }
      case AuthActionType.GET_LOGGED_OUT: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }

      default:
        return auth;
    }
  };

  auth.getLoggedIn = async function () {
    try {
      const response = await api.getLoggedIn();
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.GET_LOGGED_IN,
          payload: {
            loggedIn: response.data.loggedIn,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      console.log(
        "getLoggedIn error message is: " + error.response.data.errorMessage
      );
    }
  };

  auth.logoutUser = async function () {
    const response = await api.logoutUser();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.GET_LOGGED_OUT,
        payload: {
          loggedIn: response.data.loggedIn, //is false
          user: response.data.user, //is null
        },
      });
    }
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    console.log("user initials: " + initials);
    return initials;
  };

  auth.registerUser = async function (userData, store) {
    try {
      const response = await api.registerUser(userData);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      store.showAccountErrorModal();
    }
  };

  auth.loginUser = async function (userData, store) {
    //console.log(userData);
    try {
      const response = await api.loginUser(userData);
      if (response.status === 200) {
        console.log(response.data.user);
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
        store.loadIdNamePairs();
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      store.showAccountErrorModal();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
