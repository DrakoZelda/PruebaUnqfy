const unqfy = require('../unqfy');

function getAlbum (req, res) {
  let albumId = req.params.albumId;
  unqfy.getAlbumById(albumId).then((album) => {
    res.status(200).send(album);
  }).catch((err) => {
    res.status(404).send('RESOURCE_NOT_FOUND');
  })
}

function saveAlbum (req, res) {
  unqfy.addAlbumTo(req.artistId, {name:req.name, year:req.year}).then((album) => {
    let artist = unqfy.getArtistById(req.artistId);
    if(artist.albums.indexOf(album) < 0){
      unqfy.save();
      res.status(200).send(album);
    }
    else{
      res.status(409).send('RESOURCE_ALREADY_EXISTS');
    }
  })
}

function deleteAlbum (req, res) {
  unqfy.deleteAlbum(req.albumId).then(() => {
    unqfy.save();
    res.status(200).send()
  }).catch((err) => {
    res.status(404).send('RESOURCE_NOT_FOUND');
  })
}

function searchAlbums (req, res) {
  let albums = unqfy.searchAlbums(req.query.name);
  res.status(200).send(albums);
}

module.exports = {
  getAlbum,
  saveAlbum,
  deleteAlbum,
  searchAlbums
}
