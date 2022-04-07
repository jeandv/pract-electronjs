//Objetivo-1
const { app, BrowserWindow } = require('electron');
let URLs = ['https://cadif1.com/', ' https://jeandv.github.io/pokedex/', 'https://github.com/', 'https://www.mercadolibre.com.ve/'];

app.on('ready', () => {
  for (let i = 0; i < URLs.length; i++)
    abrirVentana(URLs[i]);
  //Objetivo-2
  if (process.argv.length > 2) {
    let urlParam = `https://${process.argv[2]}/`;
    abrirVentana(urlParam);
  }
});

app.on('before-quit', () => {
  console.log('se esta cerrando...');
});

app.on('quit', () => {
  console.log('se cerro');
});

function abrirVentana(urls) {
  let w = new BrowserWindow({
    "x": 500,
    "y": 0,
    "width": 500
  });
  w.loadURL(urls);
}