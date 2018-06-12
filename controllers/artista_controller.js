

function getArtist(req, res){
  let artistId = req.params.artistId;
  let artist = unqfy.getArtistById(artistId);
  if(artist){
    res.status(200).send(artist);
  }
  else{
    res.status(404).send('RESOURCE_NOT_FOUND');
  }
}

function saveArtist (req, res) {
  unqfy.addArtist({name:req.name, country:req.country}).then((artist) => {
    unqfy.save();
    res.status(200).send(artist);
  }).catch((err) => {
    res.status(409).send('RESOURCE_ALREADY_EXISTS');
  });
}

function deleteArtist (req, res) {
  unqfy.deleteArtist(req.artistId).then(() => {
    unqfy.save();
    res.status(200).send();
  }).catch((err) => {
    res.status(404).send('RESOURCE_NOT_FOUND');
  });
}

function searchArtists (req, res) {
  let artistas = unqfy.searchArtists(req.query.name)
  res.status(200).send(artistas);
}

module.exports = {
  getArtist,
  saveArtist,
  deleteArtist,
  searchArtists
}
