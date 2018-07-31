const persistencia = require('../persistencia');

const nombreBase = "BaseDeDatos";
var unqfyA = persistencia.getUNQfy(nombreBase);

function actualizar(){
  unqfyA = persistencia.getUNQfy(nombreBase);
}

function guardar(_unq){
  persistencia.saveUNQfy(_unq, nombreBase);
  unqfyA = persistencia.getUNQfy(nombreBase);
}

function isNumeric(n) {
  return !Number.isNaN(parseFloat(n));
}

function getAlbum (req, res) {

  actualizar();
  let albumId;
  if (isNumeric(req.params.albumId)) {

    albumId = parseInt(req.params.albumId);
    try {
      let album = unqfyA.getAlbumById(albumId);
      res.status(200).send(album);
    } catch (e) {
      // res.status(404).send('RESOURCE_NOT_FOUND');
      res.status(404).send({status:404,errorCode:"RESOURCE_NOT_FOUND"});
    }

  } else {
    // res.status(400).send('BAD_REQUEST. El parametro debe ser numerico');
    res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
  }
}

function addAlbum (req, res) {
  actualizar();
  let artistaId = isNumeric(req.body.artistId) ? parseInt(req.body.artistId) : undefined;
  let nombre = req.body.name;
  let año = req.body.year;

  if (artistaId === undefined || nombre === undefined || año === undefined){
    res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
  } else {

    try{
      let album = unqfyA.addAlbum(artistaId,{name:nombre, year:año});
      guardar(unqfyA);
      res.status(200).send(album);
    }catch(e){
      if (e.message === "Album duplicado"){
        console.log(e)
        res.status(409).send({status:409,errorCode:"RESOURCE_ALREADY_EXISTS"});
      } else if (e.message === 'no hay artista con ese id'){
        res.status(404).send({status:404,errorCode:"RELATED_RESOURCE_NOT_FOUND"});
      } else {
        console.log(e)
        res.status(500).send({status:500,errorCode:"INTERNAL_SERVER_ERROR"});
      }
      
    }
  }
}

function deleteAlbum (req, res) {

  actualizar();

  let albumId;
  if(isNumeric(req.params.albumId)){

    albumId = parseInt(req.params.albumId);
    try{
      unqfyA.deleteAlbum(albumId);
      guardar(unqfyA);
      res.status(200).send();
    }catch(e){
      // res.status(404).send('RESOURCE_NOT_FOUND');
      res.status(404).send({status:404,errorCode:"RESOURCE_NOT_FOUND"});
    }

  } else {
    // res.status(400).send('BAD_REQUEST. El parametro debe ser numerico');
    res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
  }
}

function searchAlbums (req, res) {

  actualizar();
  try{
    let nombre = req.query.name === undefined ? "" : req.query.name;
    let albums = unqfyA.searchAlbums(nombre);
    res.status(200).send(albums);
  }catch(e){
    // res.status(500).send("INTERNAL_SERVER_ERROR");
    res.status(500).send({status:500,errorCode:"INTERNAL_SERVER_ERROR"});
  }

}

module.exports = {
  getAlbum,
  addAlbum,
  deleteAlbum,
  searchAlbums
}
