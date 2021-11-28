const electron = window.require ? window.require("electron") : null;

export async function chamarFuncaoElectron(funcao: string, ...args: any) {
  return await electron.ipcRenderer.invoke(funcao, ...args);
}
