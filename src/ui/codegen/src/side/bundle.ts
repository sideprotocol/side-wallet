//@ts-nocheck
import * as _2 from './btcbridge/bitcoin';
import * as _3 from './btcbridge/genesis';
import * as _4 from './btcbridge/params';
import * as _5 from './btcbridge/query';
import * as _10 from './btcbridge/query.rpc.Query';
import * as _6 from './btcbridge/tx';
import * as _8 from './btcbridge/tx.amino';
import * as _9 from './btcbridge/tx.registry';
import * as _11 from './btcbridge/tx.rpc.msg';
import * as _12 from './rpc.query';
import * as _13 from './rpc.tx';

export namespace side {
  export const btcbridge = {
    ..._2,
    ..._3,
    ..._4,
    ..._5,
    ..._6,
    ..._8,
    ..._9,
    ..._10,
    ..._11
  };
  export const ClientFactory = {
    ..._12,
    ..._13
  };
}
