import { app, ipcMain } from "electron";

import { createCapacitorElectronApp } from "@capacitor-community/electron";
import { promisify } from "util";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./matricula.db");

const getPromise = promisify(db.get.bind(db));

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on("ready", () => {
  myCapacitorApp.init();

  db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS aluno (nome VARCHAR)");
    db.run("CREATE TABLE IF NOT EXISTS USUARIOS (USUARIO VARCHAR, SENHA VARCHAR)");
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  db.close();
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) myCapacitorApp.init();
});

ipcMain.handle("fazerLogin", async (event, args) => {
  const {usuario, senha} = args;

  const existeUsuario = await getPromise("SELECT * FROM USUARIOS WHERE USUARIO = ? AND SENHA = ?", [usuario, senha])

  return !!existeUsuario;
});

// Define any IPC or other custom functionality below here
