import { observable, action, computed } from "mobx";
import { ILogin } from "../Models/Login";
import { createContext } from "react";
import 'mobx-react-lite/batchingForReactNative'
import { addPassword, updatePassword, removePassword} from "../Utils/DatabaseAccess";
import {encriptPassword, decriptPassword} from "../Utils/Encryption";

class LoginsStore {
  @observable logins: ILogin[]= [];
  @observable currentLogin: ILogin | null = null;
  @observable loginForm: boolean = false;


  @computed get sortedLogins() {
    const logins = this.logins
    return logins.slice().sort((a, b) => (a.nombre > b.nombre) ? 1 : ((a.nombre < b.nombre) ?  -1 : 0))
  }

  @action createLogin = (login: ILogin, encpassword: string) => {
    const password = encriptPassword(login.password, encpassword);
    const {nombre, link, username} = login
    addPassword(nombre, link!, username, password);
    this.logins.push({nombre: nombre, link: link, username: username, password: password});
    this.setLoginForm(false);
  }

  @action loadLogins = (results: any) => {
    const resultset = (results as ILogin[])
    this.logins = [];
    resultset.map((e) => {
      this.logins.push(e);
    })
  }

  @action setCurrentLogin = (nombre: string, encpassword: string) => {
    this.setLoginForm(true);
    const login = this.logins.filter(l => l.nombre === nombre)[0]
    this.currentLogin = {nombre: login.nombre, link: login.link, username: login.username, password: login.password};
    this.currentLogin.password = decriptPassword(this.currentLogin.password, encpassword);
  }

  @action setLoginForm = (value: boolean) => {
    this.loginForm = value;
    this.currentLogin = null;
  }

  @action borrarLogin = (nombre: string) => {
    removePassword(nombre);
    this.logins = this.logins.filter(l => l.nombre !== nombre);
    this.setLoginForm(false);
  }

  @action actualizarLogin = (login: ILogin, encpassword: string) => {
    const password = encriptPassword(login.password, encpassword);
    const {nombre, link, username} = login
    this.logins = this.logins.filter(l => l.nombre !== nombre);
    updatePassword(nombre, link!, username, password);
    this.logins.push({nombre: nombre, link: link, username: username, password: password});
    this.setLoginForm(false);
  }
}

export const LoginsContext = createContext(new LoginsStore());
