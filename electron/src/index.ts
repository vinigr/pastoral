import type { CapacitorElectronConfig } from "@capacitor-community/electron";
import {
  getCapacitorElectronConfig,
  setupElectronDeepLinking,
} from "@capacitor-community/electron";
import type { MenuItemConstructorOptions } from "electron";
import { app, ipcMain, MenuItem } from "electron";
import electronIsDev from "electron-is-dev";
import unhandled from "electron-unhandled";
import { autoUpdater } from "electron-updater";
import { createConnection } from "typeorm";
import { Aluno } from "./entity/Aluno";
import { Instituicao } from "./entity/Instituicao";
import { Matricula } from "./entity/Matricula";
import { Oficina } from "./entity/Oficina";
import { Usuario } from "./entity/Usuario";
import {
  ElectronCapacitorApp,
  setupContentSecurityPolicy,
  setupReloadWatcher,
} from "./setup";
import { adicionarAlunoAOficina } from "./use-cases/adicionar-aluno-a-oficina";
import { buscarAluno } from "./use-cases/buscar-aluno";
import { buscarAlunosMatriculados } from "./use-cases/buscar-alunos-matriculados";
import { buscarAlunosRelatorio } from "./use-cases/buscar-alunos-relatorio";
import { buscarInformacoesInstituicao } from "./use-cases/buscar-informacoes-instituicao";
import { buscarMatricula } from "./use-cases/buscar-matricula";
import { buscarMatriculaComAluno } from "./use-cases/buscar-matricula-com-aluno";
import { buscarOficina } from "./use-cases/buscar-oficina";
import { cadastrarMatricula } from "./use-cases/cadastrar-matricula";
import { criarOficina } from "./use-cases/criar-oficina";
import { editarAluno } from "./use-cases/editar-aluno";
import { editarMatricula } from "./use-cases/editar-matricula";
import { editarOficina } from "./use-cases/editar-oficina";
import { editarUsuario } from "./use-cases/editar-usuario";
import { fazerLogin } from "./use-cases/fazer-login";
import { listarMatriculas } from "./use-cases/listar-matriculas";
import { listarOficinas } from "./use-cases/listar-oficinas";
import { pesquisarAlunos } from "./use-cases/pesquisar-alunos";
import { removerAluno } from "./use-cases/remover-aluno";
import { removerAlunoDaOficina } from "./use-cases/remover-aluno-da-oficina";
import { removerMatricula } from "./use-cases/remover-matricula";
import { removerMatriculasDoAno } from "./use-cases/remover-matriculas-do-ano";
import { removerOficina } from "./use-cases/remover-oficina";
import { salvarInformacoesInstituicao } from "./use-cases/salvar-informacoes-instituicao";

// Graceful handling of unhandled errors.
unhandled();

// Define our menu templates (these are optional)
const trayMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
  new MenuItem({ label: "Quit App", role: "quit" }),
];
const appMenuBarMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
  { role: process.platform === "darwin" ? "appMenu" : "fileMenu" },
  { role: "viewMenu" },
];

// Get Config options from capacitor.config
const capacitorFileConfig: CapacitorElectronConfig =
  getCapacitorElectronConfig();

// Initialize our app. You can pass menu templates into the app here.
// const myCapacitorApp = new ElectronCapacitorApp(capacitorFileConfig);
const myCapacitorApp = new ElectronCapacitorApp(
  capacitorFileConfig,
  trayMenuTemplate,
  appMenuBarMenuTemplate
);

// If deeplinking is enabled then we will set it up here.
if (capacitorFileConfig.electron?.deepLinkingEnabled) {
  setupElectronDeepLinking(myCapacitorApp, {
    customProtocol:
      capacitorFileConfig.electron.deepLinkingCustomProtocol ??
      "mycapacitorapp",
  });
}

// If we are in Dev mode, use the file watcher components.
if (electronIsDev) {
  setupReloadWatcher(myCapacitorApp);
}

// Run Application
(async () => {
  // Wait for electron app to be ready.
  await app.whenReady();
  // Security - Set Content-Security-Policy based on whether or not we are in dev mode.
  setupContentSecurityPolicy(myCapacitorApp.getCustomURLScheme());
  // Initialize our app, build windows, and load content.
  await myCapacitorApp.init();

  createConnection({
    type: "better-sqlite3",
    database: "matriculas.db",
    entities: [Usuario, Aluno, Instituicao, Oficina, Matricula],
    synchronize: true,
    logging: true,
  });

  // Check for updates if we are in a packaged app.
  if (process.env.NODE_ENV === "development") {
    autoUpdater.checkForUpdatesAndNotify();
  }
})();

// Handle when all of our windows are close (platforms have their own expectations).
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// When the dock icon is clicked.
app.on("activate", async function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) {
    await myCapacitorApp.init();
  }
});

// Place all ipc or other electron api calls and custom functionality under this line

ipcMain.handle("fazerLogin", async (_event, args) => {
  const { usuario, senha } = args;

  const existeUsuario = await fazerLogin(usuario, senha);

  return existeUsuario;
});

ipcMain.handle("buscarAlunosMatriculados", async (_event, term) => {
  const alunos = await buscarAlunosMatriculados(term);

  return alunos;
});

ipcMain.handle("buscarInformacoesAluno", async (_event, id) => {
  const aluno = await buscarAluno(id);

  return aluno;
});

ipcMain.handle("buscarInformacoesCompletas", async (_event, idMatricula) => {
  const aluno = await buscarMatriculaComAluno(idMatricula);

  return aluno;
});

ipcMain.handle("buscarInformacoesInstituicao", async (_event) => {
  const instituicao = await buscarInformacoesInstituicao();

  return instituicao;
});

ipcMain.handle("salvarInformacoesInstituicao", async (_event, instituicao) => {
  const instituicaoSalva = await salvarInformacoesInstituicao(instituicao);

  return instituicaoSalva;
});

ipcMain.handle(
  "buscarInformacoesMatriculaAluno",
  async (_event, idMatricula) => {
    const aluno = await buscarMatricula(idMatricula);

    return aluno;
  }
);

ipcMain.handle("buscarMatriculas", async (_event) => {
  const matriculas = await listarMatriculas();

  return matriculas;
});

ipcMain.handle("buscarOficina", async (_event, idOficina) => {
  const oficina = await buscarOficina(idOficina);

  return oficina;
});

ipcMain.handle("buscarOficinas", async (_event) => {
  const oficinas = await listarOficinas();

  return oficinas;
});

ipcMain.handle("cadastrarOficina", async (_event, oficina) => {
  const oficinaCriada = await criarOficina(oficina);

  return oficinaCriada;
});

ipcMain.handle("editarOficina", async (_event, id, oficina) => {
  const oficinaAtualizada = await editarOficina(id, oficina);

  return oficinaAtualizada;
});

ipcMain.handle("editarMatricula", async (_event, id, matricula) => {
  const matriculaAtualizada = await editarMatricula(id, matricula);

  return matriculaAtualizada;
});

ipcMain.handle("cadastrarMatriculaEAluno", async (_event, args) => {
  const matricula = await cadastrarMatricula(args);

  return matricula;
});

ipcMain.handle("editarAluno", async (_event, id, aluno) => {
  const alunoAtualizado = await editarAluno(id, aluno);

  return alunoAtualizado;
});

ipcMain.handle("pesquisaAlunos", async (_event, term) => {
  const alunos = await pesquisarAlunos(term);

  return alunos;
});

ipcMain.handle("adicionarAlunoAOficina", async (_event, idAluno, idOficina) => {
  const oficina = await adicionarAlunoAOficina(idAluno, idOficina);

  return oficina;
});

ipcMain.handle("removerAlunoDaOficina", async (_event, idAluno, idOficina) => {
  const oficina = await removerAlunoDaOficina(idAluno, idOficina);

  return oficina;
});

ipcMain.handle("removerAluno", async (_event, idAluno) => {
  const aluno = await removerAluno(idAluno);

  return aluno;
});

ipcMain.handle("removerOficina", async (_event, idOficina) => {
  const oficina = await removerOficina(idOficina);

  return oficina;
});

ipcMain.handle("removerMatricula", async (_event, idMatricula) => {
  const matricula = await removerMatricula(idMatricula);

  return matricula;
});

ipcMain.handle("removerMatriculasDoAno", async (_event, ano) => {
  const matriculas = await removerMatriculasDoAno(ano);

  return matriculas;
});

ipcMain.handle("editarUsuario", async (_event, usuario, senha) => {
  const usuarioEditado = await editarUsuario(usuario, senha);

  return usuarioEditado;
});

ipcMain.handle("buscarAlunosRelatorio", async (_event, sexo, turma) => {
  const alunos = await buscarAlunosRelatorio(sexo, turma);

  return alunos;
});
