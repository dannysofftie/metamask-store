import { createContext, useReducer } from 'react';

/**
 * @type {import('./mqtt.context').IMqttState}
 */
export const MqttInitialState = {
  client: null,
  topic: null,
};

export const MqttContext = createContext({ state: MqttInitialState });

/**
 *
 * @param {import('./mqtt.context').IMqttState} state
 * @param {import('./mqtt.context').IMqttActions} action
 *
 * @returns {import('./mqtt.context').IMqttState}
 */
export const MqttReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLIENT':
      return { ...state, client: action.payload.client };

    case 'RESET_TOPICS':
      return { ...state, topic: null };

    case 'TRANSACTION_CONFIRMATION':
      return { ...state };

    default:
      return state;
  }
};

export const MqttContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MqttReducer, MqttInitialState);

  return <MqttContext.Provider value={{ state, dispatch }}>{children}</MqttContext.Provider>;
};
