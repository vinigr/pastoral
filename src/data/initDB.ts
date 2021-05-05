import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

export default function initDB() {
  console.log("Entrou no init");
  console.log(SQLite);

  SQLite.create({ name: "matricula.db" })
    .then((db: SQLiteObject) => {
      console.log(db);

      console.log("Entrou no db");

      db.executeSql("create table IF NOT EXISTS aluno (nome VARCHAR)")
        .then(() => console.log("rodou"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
