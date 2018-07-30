const persistencia = require('../persistencia');

const nombreBase = "BaseDeDatos";
var unqfyA = persistencia.getUNQfy(nombreBase);

function guardar(_unq){
  persistencia.saveUNQfy(_unq, nombreBase);
  unqfyA = persistencia.getUNQfy(nombreBase);
}

function actualizar(){
  unqfyA = persistencia.getUNQfy(nombreBase);
}


function getAll(req, res){
  actualizar();
  try{
    let allArtists = unqfyA.artistas;
    res.status(200).send(allArtists);
  }catch(e) {
    res.status(400).send(e);
  }
  
}

function isNumeric(n) {
  return !Number.isNaN(parseFloat(n));
}


function getArtist(req, res){
  actualizar();
  let artistId;
    if(isNumeric(req.params.artistId)){

      artistId = parseInt(req.params.artistId);
      try{
        let artist = unqfyA.getArtistById(artistId);
        res.status(200).send(artist);
      }catch(e){
        //res.status(404).send('RESOURCE_NOT_FOUND');
        res.status(404).send({status:404,errorCode:"RESOURCE_NOT_FOUND"})
      }

    } else {
      // res.status(400).send('BAD_REQUEST. El parametro debe ser numerico');
      res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
    }
}

function saveArtist (req, res) {
  actualizar();
  let nombre = req.body.name;
  let pais = req.body.country;
  
  if (nombre === undefined || pais === undefined){
    res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
  } else {

    try{
      //INICIO forma con youtube y spotify
      
      let artist = unqfyA.addArtist({name:nombre, country:pais});
      artist.then(artista => {
        guardar(unqfyA);
        res.status(200).send(artista);
      })
      
     //FIN forma con youtube y spotify

      //INICIO forma normal
      /*
      let artist = unqfyA.addArtist({name:nombre, country:pais});
      guardar(unqfyA);
      res.status(200).send(artist);
      */
      //FIN forma normal

      //saveUNQfy(unqfyA, nombreBase);
      
      //guardar(unqfyA);
      //res.status(200).send(artist);
    }catch(e){
      // res.status(409).send('RESOURCE_ALREADY_EXISTS');
      //console.log(e)
      res.status(409).send({status:409,errorCode:"RESOURCE_ALREADY_EXISTS"});
    }

  }
  
}

function deleteArtist (req, res) {
  actualizar();

  let artistId;
  if(isNumeric(req.params.artistId)){

    artistId = parseInt(req.params.artistId);
    try{
      unqfyA.deleteArtist(artistId);
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

function searchArtists (req, res) {
  actualizar();
  try{
    let nombre = req.query.name === undefined ? "" : req.query.name;
    let artistas = unqfyA.searchArtists(nombre);
    res.status(200).send(artistas);
  }catch(e){
    // res.status(500).send("INTERNAL_SERVER_ERROR");
    res.status(500).send({status:500,errorCode:"INTERNAL_SERVER_ERROR"});
  }
 
}

function getExistArtist (req, res) {
  actualizar();
  if(isNumeric(req.params.artistId)){
    let id = parseInt(req.params.artistId);
    res.status(200).send({exist: unqfyA.existArtistId(id)});
  } else {
    // res.status(400).send('BAD_REQUEST. El parametro debe ser numerico');
    res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
  }
}

function youtube(req,res) {
  let promiseYoutube = unqfyA.youtube('chayanne torero');
  promiseYoutube.then(respuesta => {
    console.log(respuesta)
    res.status(200).send(respuesta)
  })
  //res.status(200).send();
}

module.exports = {
  getAll,
  getArtist,
  saveArtist,
  deleteArtist,
  searchArtists,
  getExistArtist,
  youtube
}
