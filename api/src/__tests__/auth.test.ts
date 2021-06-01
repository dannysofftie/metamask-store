import { gql } from 'mercurius-codegen';
import { setupTestEnv } from '../__test_utils__/setup';
setupTestEnv();

const publicAddress = process.env.PUBLIC_ADDRESS;

const nonceMutation = gql`
  mutation generateNonce($address: String!) {
    generateNonce(address: $address) {
      nonce
    }
  }
`;

describe('user accounts & authentication', () => {
  it('should have no user', async () => {
    const response = await graphQlClient.query(nonceMutation, { variables: { address: publicAddress } });

    expect(response.data).toBeDefined();
    expect(response.data.generateNonce).toHaveProperty('nonce');
  });
});
