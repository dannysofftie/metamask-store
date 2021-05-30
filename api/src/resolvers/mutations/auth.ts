import { pseudoRandomBytes } from 'crypto';
import { IResolvers } from 'mercurius';
import * as ethSigUtils from 'eth-sig-util';
import * as ethUtils from 'ethereumjs-util';
import { token } from '../../utils/jwt';

const authMutations: IResolvers['Mutation'] = {
  async generateNonce(root, args, ctx, info) {
    let user = await ctx.app.models.User.findOne({ publicAddress: args.address });

    if (!user)
      user = await ctx.app.models.User.create({
        publicAddress: args.address,
        nonce: pseudoRandomBytes(18).toString('hex'),
      });

    return { nonce: user.nonce };
  },
  async verifySignature(root, args, ctx, info) {
    const user = await ctx.app.models.User.findOne({ publicAddress: args.input.address });

    const params = {
      nonceBuffer: ethUtils.bufferToHex(Buffer.from(user.nonce, 'utf-8')),
    };

    const address = ethSigUtils.recoverPersonalSignature({ data: params.nonceBuffer, sig: args.input.signature });

    if (address.toLowerCase() !== user.publicAddress.toLowerCase()) {
      return { error: { field: 'adress', message: 'Public address verification failed' } };
    }

    const nonce = pseudoRandomBytes(18).toString('hex');
    // update nonce after successfull verification
    await ctx.app.models.User.updateOne({ publicAddress: args.input.address }, { $set: { nonce } }).exec();

    return {
      payload: {
        token: token.sign({ id: user._id, address: user.publicAddress }),
        user: {
          ...user,
          id: user._id,
        },
      },
    };
  },
};

export default authMutations;
