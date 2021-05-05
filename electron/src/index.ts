import { app } from "electron";
import { createCapacitorElectronApp } from "@capacitor-community/electron";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./matricula.db");

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on("ready", () => {
  myCapacitorApp.init();

  db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS aluno (nome VARCHAR)");
  });

  db.close();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
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

// Define any IPC or other custom functionality below here
