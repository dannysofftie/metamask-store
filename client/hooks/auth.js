import { gql } from 'graphql-request';
import { graphqlQuery } from 'hooks';
import { useMutation } from 'react-query';

export const useGenerateNonceMutation = () => {
  return useMutation(async params => {
    return await graphqlQuery(
      gql`
        mutation generateNonce($address: String!) {
          data: generateNonce(address: $address) {
            nonce
          }
        }
      `,
      { variables: { address: params?.address } }
    );
  });
};

export const useSignatureVerificationMutation = () => {
  return useMutation(async params => {
    return await graphqlQuery(
      gql`
        mutation verifySignature($input: SignatureVerificationInput!) {
          data: verifySignature(input: $input) {
            error {
              field
              message
            }
            payload {
              token
              user {
                id
                publicAddress
                nonce
                createdAt
                updatedAt
              }
            }
          }
        }
      `,
      { variables: { input: params?.input } }
    );
  });
};
