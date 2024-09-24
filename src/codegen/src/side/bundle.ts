//@ts-nocheck
import * as _4 from './btcbridge/btcbridge';
import * as _5 from './btcbridge/genesis';
import * as _6 from './btcbridge/params';
import * as _7 from './btcbridge/query';
import * as _8 from './btcbridge/tx';
import * as _13 from './btcbridge/tx.amino';
import * as _14 from './btcbridge/tx.registry';
import * as _15 from './btcbridge/query.rpc.Query';
import * as _16 from './btcbridge/tx.rpc.msg';
import * as _17 from './rpc.query';
import * as _18 from './rpc.tx';
export namespace side {
  export const btcbridge = {
    ..._4,
    ..._5,
    ..._6,
    ..._7,
    ..._8,
    ..._13,
    ..._14,
    ..._15,
    ..._16
  };
  export const ClientFactory = {
    ..._17,
    ..._18
  };
}