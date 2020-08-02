import { observable, action } from "mobx";
import { createContext } from "react";
import 'mobx-react-lite/batchingForReactNative'

class LogedInStorage {
    @observable UnlockPassword: string | null = null

    @action setUnlockPassword = (unlockPassword: string) => {
        this.UnlockPassword = unlockPassword;
    }
}

export const LogedInContext = createContext(new LogedInStorage())