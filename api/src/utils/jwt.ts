import { configs } from '../configs';
import * as jwt from 'jsonwebtoken';

/**
 * Payload expected by JWT's sign token function.
 *
 * @interface IJWTPayload
 */
export interface IJWTPayload {
  id: string;
  address?: string;
}

export interface IJWTToken {
  /**
   * Use JWT to sign a token
   */
  sign: (options: IJWTPayload) => string;
  /**
   * Verify token, and get passed in variables
   */
  verify: (token: string) => IJWTPayload;
}

/**
 * JWT tokens signing, verification and decoding utility.
 *
 * @export
 * @class Token
 */
export const token = {
  /**
   * Use JWT to sign a token
   */
  sign: (args: IJWTPayload): string => {
    const { id, address }: IJWTPayload = args;

    if (!id || !address) {
      throw new Error('Expects id, and address in payload.');
    }

    return jwt.sign({ id, address }, configs.jwtSecret);
  },
  /**
   * Verify token, and get passed in variables
   */
  verify: (tokn: string): IJWTPayload => {
    try {
      return jwt.verify(tokn, configs.jwtSecret) as IJWTPayload;
    } catch (error) {
      return { id: null, address: null };
    }
  },
};
