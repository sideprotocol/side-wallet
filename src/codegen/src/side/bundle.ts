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
import * as _18 from "./incentive/genesis";
import * as _19 from "./incentive/incentive";
import * as _20 from "./incentive/params";
import * as _21 from "./incentive/query";
import * as _22 from "./incentive/tx";
import * as _23 from "./lending/genesis";
import * as _24 from "./lending/lending";
import * as _25 from "./lending/params";
import * as _26 from "./lending/query";
import * as _27 from "./lending/tx";
import * as _28 from "./liquidation/genesis";
import * as _29 from "./liquidation/liquidation";
import * as _30 from "./liquidation/params";
import * as _31 from "./liquidation/query";
import * as _32 from "./liquidation/tx";
import * as _33 from "./oracle/genesis";
import * as _34 from "./oracle/oracle";
import * as _35 from "./oracle/params";
import * as _36 from "./oracle/query";
import * as _37 from "./oracle/tx";
import * as _38 from "./tss/genesis";
import * as _39 from "./tss/params";
import * as _40 from "./tss/query";
import * as _41 from "./tss/tss";
import * as _42 from "./tss/tx";
import * as _43 from "./btcbridge/tx.amino";
import * as _44 from "./dlc/tx.amino";
import * as _45 from "./incentive/tx.amino";
import * as _46 from "./lending/tx.amino";
import * as _47 from "./liquidation/tx.amino";
import * as _48 from "./oracle/tx.amino";
import * as _49 from "./tss/tx.amino";
import * as _50 from "./btcbridge/tx.registry";
import * as _51 from "./dlc/tx.registry";
import * as _52 from "./incentive/tx.registry";
import * as _53 from "./lending/tx.registry";
import * as _54 from "./liquidation/tx.registry";
import * as _55 from "./oracle/tx.registry";
import * as _56 from "./tss/tx.registry";
import * as _57 from "./btcbridge/query.rpc.Query";
import * as _58 from "./dlc/query.rpc.Query";
import * as _59 from "./incentive/query.rpc.Query";
import * as _60 from "./lending/query.rpc.Query";
import * as _61 from "./liquidation/query.rpc.Query";
import * as _62 from "./oracle/query.rpc.Query";
import * as _63 from "./tss/query.rpc.Query";
import * as _64 from "./btcbridge/tx.rpc.msg";
import * as _65 from "./dlc/tx.rpc.msg";
import * as _66 from "./incentive/tx.rpc.msg";
import * as _67 from "./lending/tx.rpc.msg";
import * as _68 from "./liquidation/tx.rpc.msg";
import * as _69 from "./oracle/tx.rpc.msg";
import * as _70 from "./tss/tx.rpc.msg";
import * as _71 from "./rpc.query";
import * as _72 from "./rpc.tx";
export namespace side {
  export const btcbridge = {
    ..._8,
    ..._9,
    ..._10,
    ..._11,
    ..._12,
    ..._43,
    ..._50,
    ..._57,
    ..._64
  };
  export const dlc = {
    ..._13,
    ..._14,
    ..._15,
    ..._16,
    ..._17,
    ..._44,
    ..._51,
    ..._58,
    ..._65
  };
  export const incentive = {
    ..._18,
    ..._19,
    ..._20,
    ..._21,
    ..._22,
    ..._45,
    ..._52,
    ..._59,
    ..._66
  };
  export const lending = {
    ..._23,
    ..._24,
    ..._25,
    ..._26,
    ..._27,
    ..._46,
    ..._53,
    ..._60,
    ..._67
  };
  export const liquidation = {
    ..._28,
    ..._29,
    ..._30,
    ..._31,
    ..._32,
    ..._47,
    ..._54,
    ..._61,
    ..._68
  };
  export const oracle = {
    ..._33,
    ..._34,
    ..._35,
    ..._36,
    ..._37,
    ..._48,
    ..._55,
    ..._62,
    ..._69
  };
  export const tss = {
    ..._38,
    ..._39,
    ..._40,
    ..._41,
    ..._42,
    ..._49,
    ..._56,
    ..._63,
    ..._70
  };
  export const ClientFactory = {
    ..._71,
    ..._72
  };
}