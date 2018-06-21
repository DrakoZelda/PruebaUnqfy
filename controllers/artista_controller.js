const fs = require('fs');
const unqmod = require('../unqfy');

function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(`/home/uriel/Documentos/Universidad/DesarrolloWeb/UNQFyAlan/ultimo/${filename}`)) {
    console.log();
    unqfy = unqmod.UNQfy.load(`/home/uriel/Documentos/Universidad/DesarrolloWeb/UNQFyAlan/ultimo/${filename}`);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}

const unqfyA = getUNQfy("BaseDeDatos");

function getArtist(req, res){
  let artistId = req.params.artistId;
  let artist = unqfyA.getArtistById(artistId);
  if(artist){
    res.status(200).send(artist);
  }
  else{
    res.status(404).send('RESOURCE_NOT_FOUND');
  }
}

function saveArtist (req, res) {
  try{
    let artist = unqfyA.addArtist({name:req.body.name, country:req.body.country});
    saveUNQfy(unqfyA, "BaseDeDatos");
    res.status(200).send(artist);
  }catch(e){
    res.status(409).send(e.message);
  }
}

function deleteArtist (req, res) {
  unqfyA.deleteArtist(req.artistId).then(() => {
    unqfyA.save();
    res.status(200).send();
  }).catch((err) => {
    res.status(404).send('RESOURCE_NOT_FOUND');
  });
}

function searchArtists (req, res) {
  let artistas = unqfyA.searchArtists(req.query.name)
  res.status(200).send(artistas);
}

module.exports = {
  getArtist,
  saveArtist,
  deleteArtist,
  searchArtists
}
