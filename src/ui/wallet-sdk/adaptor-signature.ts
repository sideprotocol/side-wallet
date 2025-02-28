// @ts-nocheck

/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
/**
 * 4KB JS implementation of secp256k1 signatures & ECDH. Compliant with RFC6979.
 * @module
 */
const B256 = 2n ** 256n;
const P = B256 - 0x1000003d1n; // curve's field prime
const N = B256 - 0x14551231950b75fc4402da1732fc9bebfn; // curve (group) order
const Gx = 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n; // base point x
const Gy = 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n; // base point y
/**
 * secp256k1 curve parameters. Equation is x³ + ax + b.
 * Gx and Gy are generator coordinates. p is field order, n is group order.
 */
const CURVE = {
  p: P,
  n: N,
  a: 0n,
  b: 7n,
  Gx,
  Gy
}; // exported variables incl. a, b
const fLen = 32; // field / group byte length
const curve = (x) => M(M(x * x) * x + CURVE.b); // x³ + ax + b weierstrass formula; a=0
const err = (m = '') => {
  throw new Error(m);
}; // error helper, messes-up stack trace
const isB = (n) => typeof n === 'bigint'; // is big integer
const isS = (s) => typeof s === 'string'; // is string
const fe = (n) => isB(n) && 0n < n && n < P; // is field element (invertible)
const ge = (n) => isB(n) && 0n < n && n < N; // is group element
const isu8 = (a) => a instanceof Uint8Array || (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array');
const au8 = (
  a,
  l // assert is Uint8Array (of specific length)
) => (!isu8(a) || (typeof l === 'number' && l > 0 && a.length !== l) ? err('Uint8Array expected') : a);
const u8n = (data) => new Uint8Array(data); // creates Uint8Array
const toU8 = (a, len) => au8(isS(a) ? h2b(a) : u8n(au8(a)), len); // norm(hex/u8a) to u8a
const M = (a, b = P) => {
  const r = a % b;
  return r >= 0n ? r : b + r;
};
const aPoint = (p) => (p instanceof Point ? p : err('Point expected')); // is 3d point
/** Point in 3d xyz projective coordinates. 3d takes less inversions than 2d. */
class Point {
  constructor(px, py, pz) {
    this.px = px;
    this.py = py;
    this.pz = pz;
    Object.freeze(this);
  }
  /** Create 3d xyz point from 2d xy. (0, 0) => (0, 1, 0), not (0, 0, 1) */
  static fromAffine(p) {
    return p.x === 0n && p.y === 0n ? I : new Point(p.x, p.y, 1n);
  }
  /** Convert Uint8Array or hex string to Point. */
  static fromHex(hex) {
    hex = toU8(hex); // convert hex string to Uint8Array
    let p = undefined;
    const head = hex[0],
      tail = hex.subarray(1); // first byte is prefix, rest is data
    const x = slc(tail, 0, fLen),
      len = hex.length; // next 32 bytes are x coordinate
    if (len === 33 && [0x02, 0x03].includes(head)) {
      // compressed points: 33b, start
      if (!fe(x)) err('Point hex invalid: x not FE'); // with byte 0x02 or 0x03. Check if 0<x<P
      let y = sqrt(curve(x)); // x³ + ax + b is right side of equation
      const isYOdd = (y & 1n) === 1n; // y² is equivalent left-side. Calculate y²:
      const headOdd = (head & 1) === 1; // y = √y²; there are two solutions: y, -y
      if (headOdd !== isYOdd) y = M(-y); // determine proper solution
      p = new Point(x, y, 1n); // create point
    } // Uncompressed points: 65b, start with 0x04
    if (len === 65 && head === 0x04) p = new Point(x, slc(tail, fLen, 2 * fLen), 1n);
    return p ? p.ok() : err('Point invalid: not on curve'); // Verify the result
  }
  /** Create point from a private key. */
  static fromPrivateKey(k) {
    return G.mul(toPriv(k));
  }
  get x() {
    return this.aff().x;
  } // .x, .y will call expensive toAffine:
  get y() {
    return this.aff().y;
  } // should be used with care.
  /** Equality check: compare points P&Q. */
  equals(other) {
    const { px: X1, py: Y1, pz: Z1 } = this;
    const { px: X2, py: Y2, pz: Z2 } = aPoint(other); // isPoint() checks class equality
    const X1Z2 = M(X1 * Z2),
      X2Z1 = M(X2 * Z1);
    const Y1Z2 = M(Y1 * Z2),
      Y2Z1 = M(Y2 * Z1);
    return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
  }
  /** Flip point over y coordinate. */
  negate() {
    return new Point(this.px, M(-this.py), this.pz);
  }
  /** Point doubling: P+P, complete formula. */
  double() {
    return this.add(this);
  }
  /**
   * Point addition: P+Q, complete, exception-free formula
   * (Renes-Costello-Batina, algo 1 of [2015/1060](https://eprint.iacr.org/2015/1060)).
   * Cost: 12M + 0S + 3*a + 3*b3 + 23add.
   */
  add(other) {
    const { px: X1, py: Y1, pz: Z1 } = this;
    const { px: X2, py: Y2, pz: Z2 } = aPoint(other);
    const { a, b } = CURVE;
    let X3 = 0n,
      Y3 = 0n,
      Z3 = 0n;
    const b3 = M(b * 3n);
    let t0 = M(X1 * X2),
      t1 = M(Y1 * Y2),
      t2 = M(Z1 * Z2),
      t3 = M(X1 + Y1); // step 1
    let t4 = M(X2 + Y2); // step 5
    t3 = M(t3 * t4);
    t4 = M(t0 + t1);
    t3 = M(t3 - t4);
    t4 = M(X1 + Z1);
    let t5 = M(X2 + Z2); // step 10
    t4 = M(t4 * t5);
    t5 = M(t0 + t2);
    t4 = M(t4 - t5);
    t5 = M(Y1 + Z1);
    X3 = M(Y2 + Z2); // step 15
    t5 = M(t5 * X3);
    X3 = M(t1 + t2);
    t5 = M(t5 - X3);
    Z3 = M(a * t4);
    X3 = M(b3 * t2); // step 20
    Z3 = M(X3 + Z3);
    X3 = M(t1 - Z3);
    Z3 = M(t1 + Z3);
    Y3 = M(X3 * Z3);
    t1 = M(t0 + t0); // step 25
    t1 = M(t1 + t0);
    t2 = M(a * t2);
    t4 = M(b3 * t4);
    t1 = M(t1 + t2);
    t2 = M(t0 - t2); // step 30
    t2 = M(a * t2);
    t4 = M(t4 + t2);
    t0 = M(t1 * t4);
    Y3 = M(Y3 + t0);
    t0 = M(t5 * t4); // step 35
    X3 = M(t3 * X3);
    X3 = M(X3 - t0);
    t0 = M(t3 * t1);
    Z3 = M(t5 * Z3);
    Z3 = M(Z3 + t0); // step 40
    return new Point(X3, Y3, Z3);
  }
  mul(n, safe = true) {
    if (!safe && n === 0n) return I; // in unsafe mode, allow zero
    if (!ge(n)) err('scalar invalid'); // must be 0 < n < CURVE.n
    if (this.equals(G)) return wNAF(n).p; // use precomputes for base point
    let p = I,
      f = G; // init result point & fake point
    for (let d = this; n > 0n; d = d.double(), n >>= 1n) {
      // double-and-add ladder
      if (n & 1n) p = p.add(d); // if bit is present, add to point
      else if (safe) f = f.add(d); // if not, add to fake for timing safety
    }
    return p;
  }
  mulAddQUns(R, u1, u2) {
    return this.mul(u1, false).add(R.mul(u2, false)).ok(); // Unsafe: do NOT use for stuff related
  } // to private keys. Doesn't use Shamir trick
  /** Convert point to 2d xy affine point. (x, y, z) ∋ (x=x/z, y=y/z) */
  toAffine() {
    const { px: x, py: y, pz: z } = this;
    if (this.equals(I)) return { x: 0n, y: 0n }; // fast-path for zero point
    if (z === 1n) return { x, y }; // if z is 1, pass affine coordinates as-is
    const iz = inv(z, P); // z^-1: invert z
    if (M(z * iz) !== 1n) err('inverse invalid'); // (z * z^-1) must be 1, otherwise bad math
    return { x: M(x * iz), y: M(y * iz) }; // x = x*z^-1; y = y*z^-1
  }
  /** Checks if the point is valid and on-curve. */
  assertValidity() {
    const { x, y } = this.aff(); // convert to 2d xy affine point.
    if (!fe(x) || !fe(y)) err('Point invalid: x or y'); // x and y must be in range 0 < n < P
    return M(y * y) === curve(x) // y² = x³ + ax + b, must be equal
      ? this
      : err('Point invalid: not on curve');
  }
  multiply(n) {
    return this.mul(n);
  } // Aliases to compress code
  aff() {
    return this.toAffine();
  }
  ok() {
    return this.assertValidity();
  }
  toHex(isCompressed = true) {
    const { x, y } = this.aff(); // convert to 2d xy affine point
    const head = isCompressed ? ((y & 1n) === 0n ? '02' : '03') : '04'; // 0x02, 0x03, 0x04 prefix
    return head + n2h(x) + (isCompressed ? '' : n2h(y)); // prefix||x and ||y
  }
  toRawBytes(isCompressed = true) {
    return h2b(this.toHex(isCompressed)); // re-use toHex(), convert hex to bytes
  }
}
/** Generator / base point */
Point.BASE = new Point(Gx, Gy, 1n);
/** Identity / zero point */
Point.ZERO = new Point(0n, 1n, 0n);
const { BASE: G, ZERO: I } = Point; // Generator, identity points
const padh = (n, pad) => n.toString(16).padStart(pad, '0');
const b2h = (b) =>
  Array.from(au8(b))
    .map((e) => padh(e, 2))
    .join(''); // bytes to hex
const C = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 }; // ASCII characters
const _ch = (ch) => {
  if (ch >= C._0 && ch <= C._9) return ch - C._0; // '2' => 50-48
  if (ch >= C.A && ch <= C.F) return ch - (C.A - 10); // 'B' => 66-(65-10)
  if (ch >= C.a && ch <= C.f) return ch - (C.a - 10); // 'b' => 98-(97-10)
  return;
};
const h2b = (hex) => {
  const e = 'hex invalid';
  if (!isS(hex)) return err(e);
  const hl = hex.length,
    al = hl / 2;
  if (hl % 2) return err(e);
  const array = u8n(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    // treat each char as ASCII
    const n1 = _ch(hex.charCodeAt(hi)); // parse first char, multiply it by 16
    const n2 = _ch(hex.charCodeAt(hi + 1)); // parse second char
    if (n1 === undefined || n2 === undefined) return err(e);
    array[ai] = n1 * 16 + n2; // example: 'A9' => 10*16 + 9
  }
  return array;
};
const b2n = (b) => BigInt('0x' + (b2h(b) || '0')); // bytes to number
const slc = (b, from, to) => b2n(b.slice(from, to)); // slice bytes num
const n2b = (num) => {
  return isB(num) && num >= 0n && num < B256 ? h2b(padh(num, 2 * fLen)) : err('bigint expected');
};
const n2h = (num) => b2h(n2b(num)); // number to 32b hex
const concatB = (...arrs) => {
  const r = u8n(arrs.reduce((sum, a) => sum + au8(a).length, 0)); // create u8a of summed length
  let pad = 0; // walk through each array,
  arrs.forEach((a) => {
    r.set(a, pad);
    pad += a.length;
  }); // ensure they have proper type
  return r;
};
const inv = (num, md) => {
  if (num === 0n || md <= 0n) err('no inverse n=' + num + ' mod=' + md); // no neg exponent for now
  let a = M(num, md),
    b = md,
    x = 0n,
    y = 1n,
    u = 1n,
    v = 0n;
  while (a !== 0n) {
    // uses euclidean gcd algorithm
    const q = b / a,
      r = b % a; // not constant-time
    const m = x - u * q,
      n = y - v * q;
    (b = a), (a = r), (x = u), (y = v), (u = m), (v = n);
  }
  return b === 1n ? M(x, md) : err('no inverse'); // b is gcd at this point
};
const sqrt = (n) => {
  let r = 1n; // So, a special, fast case. Paper: "Square Roots from 1;24,51,10 to Dan Shanks".
  for (let num = n, e = (P + 1n) / 4n; e > 0n; e >>= 1n) {
    // powMod: modular exponentiation.
    if (e & 1n) r = (r * num) % P; // Uses exponentiation by squaring.
    num = (num * num) % P; // Not constant-time.
  }
  return M(r * r) === n ? r : err('sqrt invalid'); // check if result is valid
};
const toPriv = (p) => {
  if (!isB(p)) p = b2n(toU8(p, fLen)); // convert to bigint when bytes
  return ge(p) ? p : err('private key invalid 3'); // check if bigint is in range
};
const high = (n) => n > N >> 1n; // if a number is bigger than CURVE.n/2
/** Creates 33/65-byte public key from 32-byte private key. */
const getPublicKey = (privKey, isCompressed = true) => {
  return Point.fromPrivateKey(privKey).toRawBytes(isCompressed);
};
/** ECDSA Signature class. Supports only compact 64-byte representation, not DER. */
class Signature {
  constructor(r, s, recovery) {
    this.r = r;
    this.s = s;
    if (recovery != null) this.recovery = recovery;
    this.assertValidity(); // recovery bit is optional when
    Object.freeze(this);
  } // constructed outside.
  /** Create signature from 64b compact (r || s) representation. */
  static fromCompact(hex) {
    hex = toU8(hex, 64); // compact repr is (32b r)||(32b s)
    return new Signature(slc(hex, 0, fLen), slc(hex, fLen, 2 * fLen));
  }
  assertValidity() {
    return ge(this.r) && ge(this.s) ? this : err();
  } // 0 < r or s < CURVE.n
  /** Create new signature, with added recovery bit. */
  addRecoveryBit(rec) {
    return new Signature(this.r, this.s, rec);
  }
  hasHighS() {
    return high(this.s);
  }
  normalizeS() {
    return high(this.s) ? new Signature(this.r, M(-this.s, N), this.recovery) : this;
  }
  /** ECDSA public key recovery. Requires msg hash and recovery id. */
  recoverPublicKey(msgh) {
    const { r, s, recovery: rec } = this; // secg.org/sec1-v2.pdf 4.1.6
    if (![0, 1, 2, 3].includes(rec)) err('recovery id invalid'); // check recovery id
    const h = bits2int_modN(toU8(msgh, fLen)); // Truncate hash
    const radj = rec === 2 || rec === 3 ? r + N : r; // If rec was 2 or 3, q.x is bigger than n
    if (radj >= P) err('q.x invalid'); // ensure q.x is still a field element
    const head = (rec & 1) === 0 ? '02' : '03'; // head is 0x02 or 0x03
    const R = Point.fromHex(head + n2h(radj)); // concat head + hex repr of r
    const ir = inv(radj, N); // r^-1
    const u1 = M(-h * ir, N); // -hr^-1
    const u2 = M(s * ir, N); // sr^-1
    return G.mulAddQUns(R, u1, u2); // (sr^-1)R-(hr^-1)G = -(hr^-1)G + (sr^-1)
  }
  /** Uint8Array 64b compact (r || s) representation. */
  toCompactRawBytes() {
    return h2b(this.toCompactHex());
  }
  /** Hex string 64b compact (r || s) representation. */
  toCompactHex() {
    return n2h(this.r) + n2h(this.s);
  }
}
const bits2int = (bytes) => {
  const delta = bytes.length * 8 - 256; // RFC suggests optional truncating via bits2octets
  if (delta > 1024) err('msg invalid'); // our CUSTOM check, "just-in-case"
  const num = b2n(bytes); // FIPS 186-4 4.6 suggests the leftmost min(nBitLen, outLen) bits, which
  return delta > 0 ? num >> BigInt(delta) : num; // matches bits2int. bits2int can produce res>N.
};
const bits2int_modN = (bytes) => {
  return M(bits2int(bytes), N); // with 0: BAD for trunc as per RFC vectors
};
const i2o = (num) => n2b(num); // int to octets
const cr = () =>
  // We support: 1) browsers 2) node.js 19+ 3) deno, other envs with crypto
  typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
const optS = { lowS: true }; // opts for sign()
const optV = { lowS: true }; // standard opts for verify()
const prepSig = (msgh, priv, opts = optS) => {
  if (['der', 'recovered', 'canonical'].some((k) => k in opts)) err('option not supported'); // legacy opts
  let { lowS } = opts; // generates low-s sigs by default
  if (lowS == null) lowS = true; // RFC6979 3.2: we skip step A
  const h1i = bits2int_modN(toU8(msgh)); // msg bigint
  const h1o = i2o(h1i); // msg octets
  const d = toPriv(priv); // validate private key, convert to bigint
  const seed = [i2o(d), h1o]; // Step D of RFC6979 3.2
  let ent = opts.extraEntropy; // RFC6979 3.6: additional k' (optional)
  if (ent)
    // K = HMAC_K(V || 0x00 || int2octets(x) || bits2octets(h1) || k')
    seed.push(ent === true ? etc.randomBytes(fLen) : toU8(ent)); // true == fetch from CSPRNG
  const m = h1i; // convert msg to bigint
  const k2sig = (kBytes) => {
    const k = bits2int(kBytes); // RFC6979 method.
    if (!ge(k)) return; // Check 0 < k < CURVE.n
    const ik = inv(k, N); // k^-1 mod n, NOT mod P
    const q = G.mul(k).aff(); // q = Gk
    const r = M(q.x, N); // r = q.x mod n
    if (r === 0n) return; // r=0 invalid
    const s = M(ik * M(m + M(d * r, N), N), N); // s = k^-1(m + rd) mod n
    if (s === 0n) return; // s=0 invalid
    let normS = s; // normalized S
    let rec = (q.x === r ? 0 : 2) | Number(q.y & 1n); // recovery bit
    if (lowS && high(s)) {
      // if lowS was passed, ensure s is always
      normS = M(-s, N); // in the bottom half of CURVE.n
      rec ^= 1;
    }
    return new Signature(r, normS, rec); // use normS, not s
  };
  return { seed: concatB(...seed), k2sig };
};
function hmacDrbg(asynchronous) {
  let v = u8n(fLen); // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
  let k = u8n(fLen); // Steps B, C of RFC6979 3.2: set hashLen, in our case always same
  let i = 0; // Iterations counter, will throw when over 1000
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const _e = 'drbg: tried 1000 values';
  if (asynchronous) {
    // asynchronous=true
    const h = (...b) => etc.hmacSha256Async(k, v, ...b); // hmac(k)(v, ...values)
    const reseed = async (seed = u8n()) => {
      k = await h(u8n([0x00]), seed); // k = hmac(K || V || 0x00 || seed)
      v = await h(); // v = hmac(K || V)
      if (seed.length === 0) return;
      k = await h(u8n([0x01]), seed); // k = hmac(K || V || 0x01 || seed)
      v = await h(); // v = hmac(K || V)
    };
    const gen = async () => {
      if (i++ >= 1000) err(_e);
      v = await h(); // v = hmac(K || V)
      return v;
    };
    return async (seed, pred) => {
      reset(); // the returned fn, don't, it's: 1. slower (JIT). 2. unsafe (async race conditions)
      await reseed(seed); // Steps D-G
      let res = undefined; // Step H: grind until k is in [1..n-1]
      while (!(res = pred(await gen()))) await reseed(); // test predicate until it returns ok
      reset();
      return res;
    };
  } else {
    const h = (...b) => {
      const fn = etc.hmacSha256Sync;
      if (typeof fn !== 'function') err('etc.hmacSha256Sync not set');
      return fn(k, v, ...b); // hmac(k)(v, ...values)
    };
    const reseed = (seed = u8n()) => {
      k = h(u8n([0x00]), seed); // k = hmac(k || v || 0x00 || seed)
      v = h(); // v = hmac(k || v)
      if (seed.length === 0) return;
      k = h(u8n([0x01]), seed); // k = hmac(k || v || 0x01 || seed)
      v = h(); // v = hmac(k || v)
    };
    const gen = () => {
      if (i++ >= 1000) err(_e);
      v = h(); // v = hmac(k || v)
      return v;
    };
    return (seed, pred) => {
      reset();
      reseed(seed); // Steps D-G
      let res = undefined; // Step H: grind until k is in [1..n-1]
      while (!(res = pred(gen()))) reseed(); // test predicate until it returns ok
      reset();
      return res;
    };
  }
}
/** ECDSA signature generation. via secg.org/sec1-v2.pdf 4.1.2 + RFC6979 deterministic k. */
/**
 * Sign a msg hash using secp256k1. Async.
 * It is advised to use `extraEntropy: true` (from RFC6979 3.6) to prevent fault attacks.
 * Worst case: if randomness source for extraEntropy is bad, it would be as secure as if
 * the option has not been used.
 * @param msgh - message HASH, not message itself e.g. sha256(message)
 * @param priv - private key
 * @param opts - `lowS: true` to prevent malleability (s >= CURVE.n/2), `extraEntropy: boolean | Hex` to improve sig security.
 */
const signAsync = async (msgh, priv, opts = optS) => {
  const { seed, k2sig } = prepSig(msgh, priv, opts); // Extract arguments for hmac-drbg
  return hmacDrbg(true)(seed, k2sig); // Re-run drbg until k2sig returns ok
};
/**
 * Sign a msg hash using secp256k1.
 * It is advised to use `extraEntropy: true` (from RFC6979 3.6) to prevent fault attacks.
 * Worst case: if randomness source for extraEntropy is bad, it would be as secure as if
 * the option has not been used.
 * @param msgh - message HASH, not message itself e.g. sha256(message)
 * @param priv - private key
 * @param opts - `lowS: true` to prevent malleability (s >= CURVE.n/2), `extraEntropy: boolean | Hex` to improve sig security.
 * @example
 * const sig = sign(sha256('hello'), privKey, { extraEntropy: true }).toCompactRawBytes();
 */
const sign = (msgh, priv, opts = optS) => {
  const { seed, k2sig } = prepSig(msgh, priv, opts); // Extract arguments for hmac-drbg
  return hmacDrbg(false)(seed, k2sig); // Re-run drbg until k2sig returns ok
};
/**
 * Verify a signature using secp256k1.
 * @param sig - signature, 64-byte or Signature instance
 * @param msgh - message HASH, not message itself e.g. sha256(message)
 * @param pub - public key
 * @param opts - { lowS: true } is default, prohibits s >= CURVE.n/2 to prevent malleability
 */
const verify = (sig, msgh, pub, opts = optV) => {
  let { lowS } = opts; // ECDSA signature verification
  if (lowS == null) lowS = true; // Default lowS=true
  if ('strict' in opts) err('option not supported'); // legacy param
  let sig_, h, P; // secg.org/sec1-v2.pdf 4.1.4
  const rs = sig && typeof sig === 'object' && 'r' in sig; // Previous ver supported DER sigs. We
  if (!rs && toU8(sig).length !== 2 * fLen)
    // throw error when DER is suspected now.
    err('signature must be 64 bytes');
  try {
    sig_ = rs ? new Signature(sig.r, sig.s).assertValidity() : Signature.fromCompact(sig);
    h = bits2int_modN(toU8(msgh)); // Truncate hash
    P = pub instanceof Point ? pub.ok() : Point.fromHex(pub); // Validate public key
  } catch (e) {
    return false;
  } // Check sig for validity in both cases
  if (!sig_) return false;
  const { r, s } = sig_;
  if (lowS && high(s)) return false; // lowS bans sig.s >= CURVE.n/2
  let R; // Actual verification code begins here
  try {
    const is = inv(s, N); // s^-1
    const u1 = M(h * is, N); // u1 = hs^-1 mod n
    const u2 = M(r * is, N); // u2 = rs^-1 mod n
    R = G.mulAddQUns(P, u1, u2).aff(); // R = u1⋅G + u2⋅P
  } catch (error) {
    return false;
  }
  if (!R) return false; // stop if R is identity / zero point
  const v = M(R.x, N); // R.x must be in N's field, not P's
  return v === r; // mod(R.x, n) == r
};
/**
 * Elliptic Curve Diffie-Hellman (ECDH) on secp256k1.
 * Result is **NOT hashed**. Use hash on it if you need.
 * @param privA private key A
 * @param pubB public key B
 * @param isCompressed 33-byte or 65-byte output
 * @returns public key C
 */
const getSharedSecret = (privA, pubB, isCompressed = true) => {
  return Point.fromHex(pubB).mul(toPriv(privA)).toRawBytes(isCompressed); // ECDH
};
const hashToPrivateKey = (hash) => {
  hash = toU8(hash); // produces private keys with modulo bias
  if (hash.length < fLen + 8 || hash.length > 1024) err('expected 40-1024b'); // being neglible.
  const num = M(b2n(hash), N - 1n); // takes n+8 bytes
  return n2b(num + 1n); // returns (hash mod n-1)+1
};
const crRandom = (len = 32) => {
  const c = cr(); // Must be shimmed in node.js <= 18 to prevent error. See README.
  if (!c || !c.getRandomValues) err('crypto.getRandomValues must be defined');
  return c.getRandomValues(u8n(len));
};
/** Math, hex, byte helpers. Not in `utils` because utils share API with noble-curves. */
const etc = {
  au8: au8,
  hexToBytes: h2b,
  bytesToHex: b2h,
  concatBytes: concatB,
  bytesToNumberBE: b2n,
  numberToBytesBE: n2b,
  mod: M,
  invert: inv, // math utilities
  hmacSha256Async: async (key, ...msgs) => {
    const s = subtle();
    const k = await s.importKey('raw', key, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
    return u8n(await s.sign('HMAC', k, concatB(...msgs)));
  },
  hmacSha256Sync: undefined, // For TypeScript. Actual logic is below
  hashToPrivateKey: hashToPrivateKey,
  sqrt: sqrt,
  err: err,
  randomBytes: crRandom
};
/** Curve-specific utilities for private keys. */
const utils = {
  normPrivateKeyToScalar: toPriv,
  isValidPrivateKey: (key) => {
    try {
      return !!toPriv(key);
    } catch (e) {
      return false;
    }
  },
  randomPrivateKey: () => hashToPrivateKey(etc.randomBytes(fLen + 16)), // FIPS 186 B.4.1.
  precompute: (w = 8, p = G) => {
    p.multiply(3n);
    w;
    return p;
  } // no-op
};
const subtle = () => {
  const c = cr();
  return (c && c.subtle) || err('crypto.subtle must be defined');
};
const W = 8; // Precomputes-related code. W = window size
const precompute = () => {
  const points = []; // 10x sign(), 2x verify(). To achieve this,
  const windows = 256 / W + 1; // app needs to spend 40ms+ to calculate
  let p = G,
    b = p; // a lot of points related to base point G.
  for (let w = 0; w < windows; w++) {
    // Points are stored in array and used
    b = p; // any time Gx multiplication is done.
    points.push(b); // They consume 16-32 MiB of RAM.
    for (let i = 1; i < 2 ** (W - 1); i++) {
      b = b.add(p);
      points.push(b);
    }
    p = b.double(); // Precomputes don't speed-up getSharedKey,
  } // which multiplies user point by scalar,
  return points; // when precomputes are using base point
};
let Gpows = undefined; // precomputes for base point G
const wNAF = (n) => {
  // Compared to other point mult methods,
  const comp = Gpows || (Gpows = precompute()); // stores 2x less points using subtraction
  const neg = (cnd, p) => {
    let n = p.negate();
    return cnd ? n : p;
  }; // negate
  let p = I,
    f = G; // f must be G, or could become I in the end
  const windows = 1 + 256 / W; // W=8 17 windows
  const wsize = 2 ** (W - 1); // W=8 128 window size
  const mask = BigInt(2 ** W - 1); // W=8 will create mask 0b11111111
  const maxNum = 2 ** W; // W=8 256
  const shiftBy = BigInt(W); // W=8 8
  for (let w = 0; w < windows; w++) {
    const off = w * wsize;
    let wbits = Number(n & mask); // extract W bits.
    n >>= shiftBy; // shift number by W bits.
    if (wbits > wsize) {
      wbits -= maxNum;
      n += 1n;
    } // split if bits > max: +224 => 256-32
    const off1 = off,
      off2 = off + Math.abs(wbits) - 1; // offsets, evaluate both
    const cnd1 = w % 2 !== 0,
      cnd2 = wbits < 0; // conditions, evaluate both
    if (wbits === 0) {
      f = f.add(neg(cnd1, comp[off1])); // bits are 0: add garbage to fake point
    } else {
      //          ^ can't add off2, off2 = I
      p = p.add(neg(cnd2, comp[off2])); // bits are 1: add to result point
    }
  }
  return { p, f }; // return both real and fake points for JIT
}; // !! you can disable precomputes by commenting-out call of the wNAF() inside Point#mul()
export {
  CURVE,
  etc,
  getPublicKey, // Remove the export to easily use in REPL
  getSharedSecret,
  Point as ProjectivePoint,
  sign,
  signAsync,
  Signature,
  utils,
  verify
}; // envs like browser console
// import { type Bytes, type Hex, type PrivKey, CURVE, etc, utils as eutils, ProjectivePoint as Point } from './index.ts';
// const { p: P, n: N } = CURVE;
// const { mod: M, sqrt, concatBytes: concatB, numberToBytesBE: n2b, bytesToNumberBE: num, au8, err } = etc;
// const { normPrivateKeyToScalar: toPriv } = eutils;
// const G = Point.BASE;
// Schnorr signatures are superior to ECDSA from above. Below is Schnorr-specific BIP0340 code.
// https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
const etc_schnorr = {
  sha256Async: async (...msgs) => {
    return u8n(await subtle().digest('SHA-256', concatB(...msgs)));
  },
  sha256Sync: undefined,
  randomBytes: crRandom
};
const utf8 = (m) => Uint8Array.from(m, (c) => c.charCodeAt(0));
const taggedHash = (tag, ...messages) => {
  const fn = etc_schnorr.sha256Sync;
  if (typeof fn !== 'function') return err('etc_schnorr.sha256Sync not set');
  const tagH = fn(utf8(tag));
  return fn(concatB(tagH, tagH, ...messages));
};
const taggedHashAsync = async (tag, ...messages) => {
  const fn = etc_schnorr.sha256Async;
  const tagH = await fn(utf8(tag));
  return await fn(concatB(tagH, tagH, ...messages));
};
// ECDSA compact points are 33-byte. Schnorr is 32: we strip first byte 0x02 or 0x03
const pointToBytes = (point) => point.toRawBytes(true).slice(1);
const modP = (x) => M(x, P);
const modN = (x) => M(x, N);
const hasEvenY = (p) => (p.y & 1n) !== 1n;
// Calculate point, scalar and bytes
function schnorrGetExtPubKey(priv) {
  let d_ = toPriv(priv); // same method executed in fromPrivateKey
  let p = Point.fromPrivateKey(d_); // P = d'⋅G; 0 < d' < n check is done inside
  const scalar = hasEvenY(p) ? d_ : modN(-d_);
  return { scalar: scalar, bytes: pointToBytes(p) };
}
function inRange(num, max) {
  return 1n <= num && num < max; // 1..num..max
}
/**
 * lift_x from BIP340. Convert 32-byte x coordinate to elliptic curve point.
 * @returns valid point checked for being on-curve
 */
function lift_x(x) {
  if (!inRange(x, P)) err('expected x >= p'); // Fail if x ≥ p.
  const xx = modP(x * x);
  const c = modP(xx * x + BigInt(7)); // Let c = x³ + 7 mod p.
  let y = sqrt(c); // Let y = c^(p+1)/4 mod p.
  if (y % 2n !== 0n) y = modP(-y); // Return the unique point P such that x(P) = x and
  const p = new Point(x, y, 1n); // y(P) = y if y mod 2 = 0 or y(P) = p-y otherwise.
  p.assertValidity();
  return p;
}
const TG = {
  cl: 'BIP0340/challenge',
  aux: 'BIP0340/aux',
  nonce: 'BIP0340/nonce'
};
const challenge = (...args) => modN(b2n(taggedHash(TG.cl, ...args)));
const challengeAsync = async (...args) => modN(b2n(await taggedHashAsync(TG.cl, ...args)));
/**
 * Schnorr public key is just `x` coordinate of Point as per BIP340.
 */
function getPublicKeySch(privateKey) {
  return schnorrGetExtPubKey(privateKey).bytes; // d'=int(sk). Fail if d'=0 or d'≥n. Ret bytes(d'⋅G)
}
// Common preparation function for both sync and async signing
function prepareSchnorrSign(message, privateKey, auxRand) {
  const m = au8(message);
  const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
  const a = au8(auxRand, 32);
  return { m, px, d, a };
}
function extractK(rand) {
  const k_ = modN(b2n(rand)); // Let k' = int(rand) mod n
  if (k_ === 0n) err('sign failed: k is zero'); // Fail if k' = 0.
  const res = schnorrGetExtPubKey(k_); // Let R = k'⋅G.
  return { rx: res.bytes, k: res.scalar };
}
// Common signature creation helper
function createSchnorrSignature(k, rx, e, d) {
  const sig = new Uint8Array(64);
  sig.set(rx, 0);
  sig.set(n2b(modN(k + e * d)), 32);
  return sig;
}
/**
 * Creates Schnorr signature as per BIP340. Verifies itself before returning anything.
 * auxRand is optional and is not the sole source of k generation: bad CSPRNG won't be dangerous.
 */
function signSch(message, privateKey, auxRand = etc_schnorr.randomBytes(32)) {
  const { m, px, d, a } = prepareSchnorrSign(message, privateKey, auxRand);
  const aux = taggedHash(TG.aux, a);
  const t = n2b(d ^ b2n(aux)); // Let t be the byte-wise xor of bytes(d) and hash/aux(a)
  const rand = taggedHash(TG.nonce, t, px, m); // Let rand = hash/nonce(t || bytes(P) || m)
  const { rx, k } = extractK(rand);
  const e = challenge(rx, px, m); // Let e = int(hash/challenge(bytes(R) || bytes(P) || m)) mod n.
  const sig = createSchnorrSignature(k, rx, e, d);
  if (!verifySch(sig, m, px)) err('invalid signature produced');
  return sig;
}
async function signAsyncSch(message, privateKey, auxRand = etc_schnorr.randomBytes(32)) {
  const { m, px, d, a } = prepareSchnorrSign(message, privateKey, auxRand);
  const aux = await taggedHashAsync(TG.aux, a);
  const t = n2b(d ^ b2n(aux)); // Let t be the byte-wise xor of bytes(d) and hash/aux(a)
  const rand = await taggedHashAsync(TG.nonce, t, px, m); // Let rand = hash/nonce(t || bytes(P) || m)
  const { rx, k } = extractK(rand);
  const e = await challengeAsync(rx, px, m); // Let e = int(hash/challenge(bytes(R) || bytes(P) || m)) mod n.
  const sig = createSchnorrSignature(k, rx, e, d);
  // If Verify(bytes(P), m, sig) (see below) returns failure, abort
  if (!(await verifyAsyncSch(sig, m, px))) err('invalid signature produced');
  return sig;
}
function prepVerif(signature, message, publicKey) {
  const sig = au8(signature, 64);
  const m = au8(message);
  const pub = au8(publicKey, 32);
  const P = lift_x(b2n(pub)); // P = lift_x(int(pk)); fail if that fails
  const r = b2n(sig.subarray(0, 32)); // Let r = int(sig[0:32]); fail if r ≥ p.
  if (!inRange(r, CURVE.p)) return false;
  const s = b2n(sig.subarray(32, 64)); // Let s = int(sig[32:64]); fail if s ≥ n.
  if (!inRange(s, N)) return false;
  const input = concatB(n2b(r), pointToBytes(P), m);
  return { input, P, r, s };
}
function endVerif(P, r, s, e) {
  const R = G.mulAddQUns(P, s, modN(-e)); // R = s⋅G - e⋅P
  if (!R || !hasEvenY(R) || R.toAffine().x !== r) return false; // -eP == (n-e)P
  return true; // Fail if is_infinite(R) / not has_even_y(R) / x(R) ≠ r.
}
/**
 * Verifies Schnorr signature.
 * Will swallow errors & return false except for initial type validation of arguments.
 */
function verifySch(signature, message, publicKey) {
  try {
    const obj = prepVerif(signature, message, publicKey) || err('failed');
    const { input, P, r, s } = obj;
    const e = challenge(input); // int(challenge(bytes(r)||bytes(P)||m))%n
    return endVerif(P, r, s, e);
  } catch (error) {
    return false;
  }
}
async function verifyAsyncSch(signature, message, publicKey) {
  try {
    const obj = prepVerif(signature, message, publicKey) || err('failed');
    const { input, P, r, s } = obj;
    const e = await challengeAsync(input); // int(challenge(bytes(r)||bytes(P)||m))%n
    return endVerif(P, r, s, e);
  } catch (error) {
    return false;
  }
}
function extractKWithAdaptorPoint(rand, AP) {
  const k_ = modN(b2n(rand)); // Let k' = int(rand) mod n
  if (k_ === 0n) err('sign failed: k is zero'); // Fail if k' = 0.
  let d_ = toPriv(k_); // same method executed in fromPrivateKey
  let r = Point.fromPrivateKey(d_); // P = d'⋅G; 0 < d' < n check is done inside
  const scalar = hasEvenY(r.add(AP)) ? d_ : modN(-d_); // negate k if not hasEvenY(R+AP)
  return { rx: pointToBytes(r.add(AP)), k: scalar }; // rx = bytes(R+AP)
}
/**
 * Creates Schnorr adaptor signature. Verifies itself before returning anything.
 * auxRand is optional and is not the sole source of k generation: bad CSPRNG won't be dangerous.
 */
function signSchAdaptor(message, privateKey, adaptorPoint, auxRand = etc_schnorr.randomBytes(32)) {
  const { m, px, d, a } = prepareSchnorrSign(message, privateKey, auxRand);
  const aux = taggedHash(TG.aux, a);
  const t = n2b(d ^ b2n(aux)); // Let t be the byte-wise xor of bytes(d) and hash/aux(a)
  const rand = taggedHash(TG.nonce, t, px, m); // Let rand = hash/nonce(t || bytes(P) || m)
  const AP = Point.fromHex(adaptorPoint);
  const { rx, k } = extractKWithAdaptorPoint(rand, AP);
  const e = challenge(rx, px, m); // Let e = int(hash/challenge(bytes(R+AP) || bytes(P) || m)) mod n.
  const sig = createSchnorrSignature(k, rx, e, d);
  if (!verifySch(sig, m, px)) err('invalid signature produced');
  return sig;
}
async function signAsyncSchAdaptor(message, privateKey, adaptorPoint, auxRand = etc_schnorr.randomBytes(32)) {
  const { m, px, d, a } = prepareSchnorrSign(message, privateKey, auxRand);
  const aux = await taggedHashAsync(TG.aux, a);
  const t = n2b(d ^ b2n(aux)); // Let t be the byte-wise xor of bytes(d) and hash/aux(a)
  const rand = await taggedHashAsync(TG.nonce, t, px, m); // Let rand = hash/nonce(t || bytes(P) || m)
  const AP = Point.fromHex(adaptorPoint);
  const { rx, k } = extractKWithAdaptorPoint(rand, AP);
  const e = await challengeAsync(rx, px, m); // Let e = int(hash/challenge(bytes(R+AP) || bytes(P) || m)) mod n.
  const sig = createSchnorrSignature(k, rx, e, d);
  // If Verify(bytes(P), m, sig) (see below) returns failure, abort
  if (!(await verifyAsyncSch(sig, m, px))) err('invalid signature produced');
  return sig;
}
function prepVerifAdaptor(signature, message, publicKey, adaptorPoint) {
  const sig = au8(signature, 64);
  const m = au8(message);
  const pub = au8(publicKey, 32);
  const P = lift_x(b2n(pub)); // P = lift_x(int(pk)); fail if that fails
  const r = b2n(sig.subarray(0, 32)); // Let r = int(sig[0:32]); fail if r ≥ p.
  if (!inRange(r, CURVE.p)) return false;
  const s = b2n(sig.subarray(32, 64)); // Let s = int(sig[32:64]); fail if s ≥ n.
  if (!inRange(s, N)) return false;
  const R = lift_x(r); // R = lift_x(r)
  const AP = Point.fromHex(adaptorPoint);
  const input = concatB(pointToBytes(R.add(AP)), pointToBytes(P), m);
  return { input, P, r, s, AP };
}
function endVerifAdaptor(P, r, s, e, AP) {
  const ER = G.mulAddQUns(P, s, modN(-e)); // R = s⋅G - e⋅P
  if (!ER) return false; // Fail if is_infinite(ER)
  const R = lift_x(r);
  if (!hasEvenY(R.add(AP))) {
    return ER.equals(R.negate()); // Fail if ER is not negative R when not hasEvenY(R+AP)
  }
  return ER.toAffine().x === r; // Fail if x(ER) ≠ r when hasEvenY(R+AP)
}
/**
 * Verifies Schnorr adaptor signature.
 * Will swallow errors & return false except for initial type validation of arguments.
 */
function verifySchAdaptor(signature, message, publicKey, adaptorPoint) {
  try {
    const obj = prepVerifAdaptor(signature, message, publicKey, adaptorPoint) || err('failed');
    const { input, P, r, s, AP } = obj;
    const e = challenge(input); // int(challenge(bytes(R+AP)||bytes(P)||m))%n
    return endVerifAdaptor(P, r, s, e, AP);
  } catch (error) {
    return false;
  }
}
async function verifyAsyncSchAdaptor(signature, message, publicKey, adaptorPoint) {
  try {
    const obj = prepVerifAdaptor(signature, message, publicKey, adaptorPoint) || err('failed');
    const { input, P, r, s, AP } = obj;
    const e = await challengeAsync(input); // int(challenge(bytes(R+AP)||bytes(P)||m))%n
    return endVerifAdaptor(P, r, s, e, AP);
  } catch (error) {
    return false;
  }
}
// Decrypt the adaptor signature with the given secret.
function adapt(signature, secret) {
  const sig = au8(signature, 64); // Ensure the signature is 64 bytes
  const r = b2n(sig.subarray(0, 32)); // Let r = int(sig[0:32]); fail if r ≥ p.
  if (!inRange(r, CURVE.p)) err('invalid signature');
  const s = b2n(sig.subarray(32, 64)); // Let s = int(sig[32:64]); fail if s ≥ n.
  if (!inRange(s, N)) err('invalid signature');
  const R = lift_x(r); // R = lift_x(r)
  const AP = Point.fromPrivateKey(secret); // AP = secret⋅G
  const adaptedPoint = R.add(AP); // Adapted Point = R+AP
  const adaptedR = pointToBytes(adaptedPoint); // adapted r = bytes(R+AP)
  const adaptedS = s + toPriv(secret); // adapted s = s + secret if hasEvenY(R+AP)
  if (!hasEvenY(adaptedPoint)) {
    adaptedS = s - toPriv(secret); // adapted s = s - secret if not hasEvenY(R+AP)
  }
  return new Signature(adaptedR, adaptedS).toCompactRawBytes();
}
export const schnorr = {
  getPublicKey: getPublicKeySch,
  sign: signSch,
  verify: verifySch,
  signAsync: signAsyncSch,
  verifyAsync: verifyAsyncSch
};
export const schnorrAdaptor = {
  getPublicKey: getPublicKeySch,
  sign: signSchAdaptor,
  verify: verifySchAdaptor,
  signAsync: signAsyncSchAdaptor,
  verifyAsync: verifyAsyncSchAdaptor,
  adapt: adapt
};
