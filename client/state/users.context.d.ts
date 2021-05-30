import { createContext, Dispatch } from 'react';

export type UserActions = 'SIGNIN_USER' | 'SIGNOUT_USER';

export interface IUserActions {
  type: UserActions;
  payload?: IUserState;
}

export interface IUser {
  id?: string;
  nonce?: string;
  publicAddress?: string;
}

export interface IUserState {
  authenticated: boolean;
  token: string;
  user: IUser;
}

export interface IUserProps {
  state: IUserState;
  dispatch(type: IUserActions, payload?: IUser): void;
}

declare function UserReducer(state: IUserState, action: IUserActions): IUserState;

declare const UserContext = createContext<{ state: IUserState; dispatch?: Dispatch<IUserActions> }>({});

declare function UserContextProvider({ children }): JSX.Element;
