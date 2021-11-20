const electron = window.require("electron");

export async function chamarFuncaoElectron(funcao: string, ...args: any) {
  return await electron.ipcRenderer.invoke(funcao, ...args);
}
