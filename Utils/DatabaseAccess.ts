import { openDatabase } from "expo-sqlite";

export const startDatabaseIfNot = () => {
  const db = openDatabase("passwords");
  db.transaction((tx) =>
    tx.executeSql(
      "CREATE TABLE IF NOT exists Contraseñas (nombre text primary key not null, link text, username text, password text)",
      [],
      () => {},
      (_, error) => {
        console.log(error);
        return false;
      }
    )
  );
};

export const addPassword = (
  nombre: string,
  link: string | undefined,
  username: string,
  password: string
) => {
  const db = openDatabase("passwords");
  db.transaction((tx) =>
    tx.executeSql(
      "Insert into Contraseñas (nombre, link, username, password ) values (?,?,?,?)",
      [nombre, link, username, password],
      () => {},
      (_, error) => {
        console.log(error);
        return false;
      }
    )
  );
};

export const updatePassword = (
  nombre: string,
  link: string | undefined,
  username: string,
  password: string
) => {
  const db = openDatabase("passwords");
  db.transaction((tx) =>
    tx.executeSql(
      "Update Contraseñas set link = ?, username = ?, password = ? where nombre like ?",
      [link, username, password, nombre],
      () => {},
      (_, error) => {
        console.log(error);
        return false;
      }
    )
  );
};

export const removePassword = (nombre: string) => {
  const db = openDatabase("passwords");
  db.transaction((tx) =>
    tx.executeSql(
      "Delete from Contraseñas where nombre like ?",
      [nombre],
      () => {},
      (_, error) => {
        console.log(error);
        return false;
      }
    )
  );
};
