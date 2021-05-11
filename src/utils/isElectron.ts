export function isElectron(): boolean {
  return !!window.navigator.userAgent.match(/Electron/);
}
