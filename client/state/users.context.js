import { createContext, useReducer } from 'react';

/**
 * @type {import('./users.context').IUserState}
 */
export const UserInitialState = {
  authenticated: false,
  token: null,
  user: {
    id: null,
    nonce: null,
    publicAddress: null,
  },
};

export const UserContext = createContext({
  state: UserInitialState,
});

/**
 *
 * @param {import('./users.context').IUserState} state
 * @param {import('./users.context').IUserActions} action
 */
export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN_USER':
      return { ...state, ...action.payload };

    case 'SIGNOUT_USER':
      return { ...UserInitialState };

    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, UserInitialState);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
