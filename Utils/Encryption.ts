import { AES, enc } from "crypto-ts";

// Encrypt
export const encriptPassword = (password: string, secret: string): string => {
  try {
    const ciphertext = AES.encrypt(password, secret).toString();
    return ciphertext;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const decriptPassword = (
  encriptedPassword: string,
  secret: string
): string => {
  try {
    var bytes = AES.decrypt(encriptedPassword, secret);
    var plaintext = bytes.toString(enc.Utf8);
    return plaintext;
  } catch (error) {
    console.log(error);
    return "";
  }
};
