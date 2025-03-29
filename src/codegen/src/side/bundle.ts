//@ts-nocheck
import * as _8 from "./btcbridge/btcbridge";
import * as _9 from "./btcbridge/genesis";
import * as _10 from "./btcbridge/params";
import * as _11 from "./btcbridge/query";
import * as _12 from "./btcbridge/tx";
import * as _13 from "./dlc/dlc";
import * as _14 from "./dlc/genesis";
import * as _15 from "./dlc/params";
import * as _16 from "./dlc/query";
import * as _17 from "./dlc/tx";
import * as _18 from "./lending/genesis";
import * as _19 from "./lending/lending";
import * as _20 from "./lending/params";
import * as _21 from "./lending/query";
import * as _22 from "./lending/tx";
import * as _23 from "./liquidation/genesis";
import * as _24 from "./liquidation/liquidation";
import * as _25 from "./liquidation/params";
import * as _26 from "./liquidation/query";
import * as _27 from "./liquidation/tx";
import * as _28 from "./btcbridge/tx.amino";
import * as _29 from "./dlc/tx.amino";
import * as _30 from "./lending/tx.amino";
import * as _31 from "./liquidation/tx.amino";
import * as _32 from "./btcbridge/tx.registry";
import * as _33 from "./dlc/tx.registry";
import * as _34 from "./lending/tx.registry";
import * as _35 from "./liquidation/tx.registry";
import * as _36 from "./btcbridge/query.rpc.Query";
import * as _37 from "./dlc/query.rpc.Query";
import * as _38 from "./lending/query.rpc.Query";
import * as _39 from "./liquidation/query.rpc.Query";
import * as _40 from "./btcbridge/tx.rpc.msg";
import * as _41 from "./dlc/tx.rpc.msg";
import * as _42 from "./lending/tx.rpc.msg";
import * as _43 from "./liquidation/tx.rpc.msg";
import * as _44 from "./rpc.query";
import * as _45 from "./rpc.tx";
export namespace side {
  export const btcbridge = {
    ..._8,
    ..._9,
    ..._10,
    ..._11,
    ..._12,
    ..._28,
    ..._32,
    ..._36,
    ..._40
  };
  export const dlc = {
    ..._13,
    ..._14,
    ..._15,
    ..._16,
    ..._17,
    ..._29,
    ..._33,
    ..._37,
    ..._41
  };
  export const lending = {
    ..._18,
    ..._19,
    ..._20,
    ..._21,
    ..._22,
    ..._30,
    ..._34,
    ..._38,
    ..._42
  };
  export const liquidation = {
    ..._23,
    ..._24,
    ..._25,
    ..._26,
    ..._27,
    ..._31,
    ..._35,
    ..._39,
    ..._43
  };
  export const ClientFactory = {
    ..._44,
    ..._45
  };
}