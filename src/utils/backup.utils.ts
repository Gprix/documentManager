import pako from "pako";
import { createHash } from "crypto";

export const generateSHA = (data: unknown) => {
  const flatData = JSON.stringify(data);
  return createHash("sha256").update(flatData).digest("hex");
};

export const compressData = (data: unknown) => {
  const flatData = JSON.stringify(data);
  const compressedData = pako.deflate(flatData);
  return btoa(compressedData.toString());
};

export const decompressData = (data: string) => {
  const compressedData = atob(data);
  const compressedUint8Array = new Uint8Array(compressedData.length);

  for (let i = 0; i < compressedData.length; i++) {
    compressedUint8Array[i] = compressedData.charCodeAt(i);
  }

  const inflatedData = pako.inflate(compressedUint8Array);
  const jsonString = new TextDecoder("utf-8").decode(inflatedData);
  return JSON.parse(jsonString);
};
