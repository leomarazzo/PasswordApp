import { AsyncStorage } from "react-native";
import {TextEncoder} from "text-encoding"
import { generatePassword } from "./PasswordGenerator";
import sha256 from "fast-sha256";

const toHexString = (byteArray: Uint8Array) => {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

export const setUnlockPassword = async (value: string) => {
    try{
        const salt = generatePassword(10, false, true, true, false);
        await AsyncStorage.setItem("salt", salt);
        const message = value + salt;
        const hash = toHexString(sha256(new TextEncoder().encode(message)))
        await AsyncStorage.setItem("hash", hash);
        const ishash = (await AsyncStorage.getAllKeys()).includes("hash");
        console.log(ishash)
    } catch (error)
    {
        console.log(error)
    }
}

export const isSet = async () => {
    try{
        const hash = (await AsyncStorage.getAllKeys()).includes("hash");
        return hash
    } catch (error)
    {
        console.log(error)
    }
}

export const checkUnlockPassword = async (value: string) => {
    try {
        const hash = await AsyncStorage.getItem('hash');
        if (hash !== null){
            const salt = await AsyncStorage.getItem('salt');
            const message = value + salt;
            const hash1 = toHexString(sha256(new TextEncoder().encode(message)))
            return hash === hash1
        }else{
            return false;
        }
        
    } catch (error) {
        console.log(error)
    }
}
