import { gql } from 'mercurius-codegen';
import { setupTestEnv } from '../__test_utils__/setup';
setupTestEnv();

const invoiceQuery = gql`
  query invoices {
    invoices {
      id
      name
      number
    }
  }
`;

const createInvoiceMutation = gql`
  mutation createInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      message
    }
  }
`;

const invoice = {
  name: 'Budgeting proposal',
  number: '78909876',
  amount: 4000,
  description: 'Municipal council 2021/2022 town planning',
};

describe('create & query invoices', () => {
  it('should return no invoice', async () => {
    const response = await graphQlClient.query(invoiceQuery);
    expect(response.data).toEqual({ invoices: [] });
  });

  // create invoice
  it('should create an invoice', async () => {
    const response = await graphQlClient.mutate(createInvoiceMutation, { variables: { input: invoice } });
    expect(response.data).toEqual({ createInvoice: { message: 'Invoice created' } });
  });

  // ensure invoice was created
  it('should return one invoice', async () => {
    const response = await graphQlClient.query(invoiceQuery);
    expect(response.data.invoices).toBeDefined();
    expect(response.data.invoices.length).toEqual(1);
    expect(response.data.invoices[0].name).toEqual(invoice.name);
  });
});
