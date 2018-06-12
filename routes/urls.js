const express = require('express');
const artistCtrl = require('../controllers/artista_controller');
const albumCtrl = require('../controllers/album_controller');
const api = express.Router();

//Artist Urls
api.get('/artists/:artistId', artistCtrl.getArtist);
api.post('/artists/', artistCtrl.saveArtist);
api.delete('/artists/:artistId', artistCtrl.deleteArtist);
api.get('/artists', artistCtrl.searchArtists);

//Album Urls
api.get('/albums/:albumId', albumCtrl.getAlbum);
api.post('/albums/', albumCtrl.saveAlbum);
api.delete('/albums/:albumId', albumCtrl.deleteAlbum);
api.get('/albums', albumCtrl.searchAlbums);

module.exports = api;
