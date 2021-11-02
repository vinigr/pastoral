import { app, ipcMain } from "electron";
import path from "path"

import { createCapacitorElectronApp } from "@capacitor-community/electron";
import { promisify } from "util";
import electronReload from "electron-reload";

electronReload(path.resolve(__dirname, ".."), {
  electron: path.resolve(__dirname, "..", 'node_modules', '.bin', 'electron')
})

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
    db.run("CREATE TABLE IF NOT EXISTS ALUNO (NOME VARCHAR, SEXO VARCHAR, CPF VARCHAR, DATA_NASCIMENTO DATE, RG VARCHAR, DATA_EXPEDICAO_RG DATE, ENDERECO TEXT, NATURALIDADE VARCHAR, NACIONALIDADE VARCHAR, CERTIDAO_NASCIMENTO_TERMO VARCHAR, CERTIDAO_NASCIMENTO_FOLHA VARCHAR, CERTIDAO_NASCIMENTO_LIVRO VARCHAR, EMAIL VARCHAR, TELEFONE VARCHAR, TEM_PARENTE TINYINT, NOME_PARENTE VARCHAR, CONTATO_NOME VARCHAR, CONTATO_TELEFONE VARCHAR, RESPONSAVEL_TIPO CHARACTER, RESPONSAVEL_CPF VARCHAR, RESPONSAVEL_RG VARCHAR, RESPONSAVEL_ENDERECO TEXT, RESPONSAVEL_TELEFONE VARCHAR, RESPONSAVEL_RECEBE_AUXILIO, RESPONSAVEL_PROFISSAO, VARCHAR RENDA_FAMILIAR DECIMAL, PERMITE_CATEQUESE TINYINT);");
    db.run("CREATE TABLE IF NOT EXISTS INSTITUICAO (NOME VARCHAR, CNPJ VARCHAR, ENDERECO VARCHAR, EMAIL VARCHAR, TELEFONE VARCHAR);");
    db.run("CREATE TABLE IF NOT EXISTS USUARIOS (USUARIO VARCHAR, SENHA VARCHAR);");
    db.run("CREATE TABLE IF NOT EXISTS OFICINA (NOME VARCHAR, PROFESSOR VARCHAR, NIVEL VARCHAR, HORARIO DATETIME);");
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
  const { usuario, senha } = args;

  const existeUsuario = await getPromise("SELECT * FROM USUARIOS WHERE USUARIO = ? AND SENHA = ?", [usuario, senha])

  return !!existeUsuario;
});

// Define any IPC or other custom functionality below here
