import { default as authQueries } from './auth';
import { default as invoiceQueries } from './invoices';
export default {
  ...invoiceQueries,
  ...authQueries,
};
