import { MqttClient } from 'mqtt';
import { createContext } from 'react';

export type MqttActions = 'SET_CLIENT' | 'RESET_TOPICS' | 'TRANSACTION_CONFIRMATION'; // e.t.c, to add as we continue to discover more topics

export interface IMqttActions {
  type: MqttActions;
  payload: {
    client?: MqttClient;
    topic?: string;
    data?: any;
  };
}

export interface IMqttIncomingMessagePayload {
  cmd: string;
  messageId: number;
  qos: number;
  dup: boolean;
  topic: string;
  payload: string;
  retain: false;
  properties: {
    // optional properties MQTT 5.0
    payloadFormatIndicator: boolean;
    messageExpiryInterval: number;
    topicAlias: number;
    responseTopic: string;
    correlationData: string;
    userProperties: {
      test: string;
    };
    subscriptionIdentifier: number; // can be an Array in message from broker, if message included in few another subscriptions
    contentType: string;
  };
}

export interface IMqttState {
  client: MqttClient;
  topic?: string;
}

export interface IMqttProps {
  state: IMqttState;
  dispatch(type: IMqttActions, payload?: IMqttState): void;
}

declare function MqttReducer(state: IMqttState, action: IMqttActions): IMqttState;

declare const MqttContext = createContext<Partial<IMqttProps>>({});

declare function MqttContextProvider({ children }): JSX.Element;
