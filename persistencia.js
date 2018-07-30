const fs = require('fs');
const unqmod = require('./unqfy');

function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  let direccion = './'+filename;//Esto funciona si lo que se ejecuta con node esta en la misma carpeta que BaseDeDatos.
  if (fs.existsSync(direccion)) {
    console.log();
    unqfy = unqmod.UNQfy.load(direccion);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}


module.exports = {
    getUNQfy,
    saveUNQfy
  }
  