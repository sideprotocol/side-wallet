//@ts-nocheck
import * as _8 from "./btcbridge/btcbridge";
import * as _9 from "./btcbridge/genesis";
import * as _10 from "./btcbridge/params";
import * as _11 from "./btcbridge/query";
import * as _12 from "./btcbridge/tx";
import * as _13 from "./btcbridge/tx.amino";
import * as _14 from "./btcbridge/tx.registry";
import * as _15 from "./btcbridge/query.rpc.Query";
import * as _16 from "./btcbridge/tx.rpc.msg";
import * as _17 from "./rpc.query";
import * as _18 from "./rpc.tx";
export namespace side {
  export const btcbridge = {
    ..._8,
    ..._9,
    ..._10,
    ..._11,
    ..._12,
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