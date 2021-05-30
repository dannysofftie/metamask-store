import { default as authMutations } from './auth';
import { default as invoiceMutations } from './invoice';

export default {
  ...authMutations,
  ...invoiceMutations,
};
