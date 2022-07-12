import { encryptSafely } from "@metamask/eth-sig-util";
import { Buffer } from "buffer";
import { eth_decrypt } from "@raydeck/metamask-ts";
const version = "x25519-xsalsa20-poly1305";
export const encrypt = (data: Buffer, publicKey: string) => {
  const base64 = data.toString("base64");
  const enc = encryptSafely({
    publicKey,
    data: base64,
    version,
  });
  const buf = Buffer.concat([
    Buffer.from(enc.ephemPublicKey, "base64"),
    Buffer.from(enc.nonce, "base64"),
    Buffer.from(enc.ciphertext, "base64"),
  ]);
  return buf;
};

export const decrypt = async (data: Buffer, account: string) => {
  const structuredData = {
    version,
    ephemPublicKey: data.slice(0, 32).toString("base64"),
    nonce: data.slice(32, 56).toString("base64"),
    ciphertext: data.slice(56).toString("base64"),
  };
  const json = JSON.stringify(structuredData);
  const jsonBuf = Buffer.from(json, "utf8");
  const ct = "0x" + jsonBuf.toString("hex");
  const clearText = await eth_decrypt(ct, account);
  const obj: { data: string; padding?: string } = JSON.parse(clearText);
  const outbuf = Buffer.from(obj.data, "base64");
  return outbuf;
};
