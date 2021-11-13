import { app, ipcMain } from "electron";
import path from "path"

import "reflect-metadata";

import { createCapacitorElectronApp } from "@capacitor-community/electron";
import electronReload from "electron-reload";
import { createConnection } from "typeorm";

import { Usuario } from "./entity/Usuario"
import { Aluno } from "./entity/Aluno"
import { Instituicao } from "./entity/Instituicao"
import { Oficina } from "./entity/Oficina"
import { Matricula } from "./entity/Matricula"

import { fazerLogin } from "./use-cases/fazer-login"
import { buscarAlunosMatriculados } from "./use-cases/buscar-alunos-matriculados"
import { buscarAluno } from "./use-cases/buscar-aluno"
import { buscarMatriculaComAluno } from "./use-cases/buscar-matricula-com-aluno"
import { buscarMatricula } from "./use-cases/buscar-matricula"
import { buscarOficina } from "./use-cases/buscar-oficina"
import { criarOficina } from "./use-cases/criar-oficina"
import { editarOficina } from "./use-cases/editar-oficina"
import { listarOficinas } from "./use-cases/listar-oficinas"
import { buscarInformacoesInstituicao } from "./use-cases/buscar-informacoes-instituicao"
import { listarMatriculas } from "./use-cases/listar-matriculas"


electronReload(path.resolve(__dirname, ".."), {
  electron: path.resolve(__dirname, "..", 'node_modules', '.bin', 'electron')
})

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on("ready", () => {
  myCapacitorApp.init();

  createConnection(
    {
      type: "sqlite",
      database: "matriculas.db",
      entities: [
        Usuario,
        Aluno,
        Instituicao,
        Oficina,
        Matricula
      ],
      synchronize: true,
      logging: false
    }
  )
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  //db.close();
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

ipcMain.handle("fazerLogin", async (_event, args) => {
  const { usuario, senha } = args;

  const existeUsuario = await fazerLogin(usuario, senha)

  return existeUsuario;
});

ipcMain.handle("buscarAlunosMatriculados", async (_event, term) => {
  const alunos = await buscarAlunosMatriculados(term)

  return alunos;
});

ipcMain.handle("buscarInformacoesAluno", async (_event, id) => {
  const aluno = await buscarAluno(id)

  return aluno
})

ipcMain.handle("buscarInformacoesCompletas", async (_event, idMatricula) => {
  const aluno = await buscarMatriculaComAluno(idMatricula)

  return aluno
})

ipcMain.handle("buscarInformacoesInstituicao", async (_event) => {
  const instituicao = await buscarInformacoesInstituicao()

  return instituicao
})

ipcMain.handle("buscarInformacoesMatriculaAluno", async (_event, idMatricula) => {
  const aluno = await buscarMatricula(idMatricula)

  return aluno
})

ipcMain.handle("buscarMatriculas", async (_event) => {
  const matriculas = await listarMatriculas()

  return matriculas
})

ipcMain.handle("buscarOficina", async (_event, idOficina) => {
  const oficina = await buscarOficina(idOficina)

  return oficina
})

ipcMain.handle("buscarOficinas", async (_event) => {
  const oficinas = await listarOficinas()

  return oficinas
})

ipcMain.handle("cadastrarOficina", async (_event, oficina) => {
  const oficinaCriada = await criarOficina(oficina)

  return oficinaCriada
})

ipcMain.handle("editarOficina", async (_event, id, oficina) => {
  const oficinaAtualizada = await editarOficina(id, oficina)

  return oficinaAtualizada
})

// Define any IPC or other custom functionality below here
