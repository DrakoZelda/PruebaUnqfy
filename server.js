let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8000;


function invalidJsonHandler(err, req, res, next) {
      res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
  }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(invalidJsonHandler);

const artistCtrl = require('./controllers/artista_controller');
const albumCtrl = require('./controllers/album_controller');

router.route('/allArtists/').get(artistCtrl.getAll);
router.route('/artists/:artistId').get(artistCtrl.getArtist);
router.route('/artists/:artistId').delete(artistCtrl.deleteArtist);
router.route('/artists/').get(artistCtrl.searchArtists);
router.route('/artists/').post(artistCtrl.saveArtist);
router.route('/existArtist/:artistId').get(artistCtrl.getExistArtist);

router.route('/albums/:albumId').get(albumCtrl.getAlbum);
router.route('/albums/:albumId').delete(albumCtrl.deleteAlbum);
router.route('/albums/').get(albumCtrl.searchAlbums);
router.route('/albums/').post(albumCtrl.addAlbum);


app.use('/api', router);
app.use(function(req, res){
    res.status(404).send({status:404,errorCode:"RESOURCE_NOT_FOUND"});
});
app.listen(port);
console.log('La magia esta en el puerto: '+ port);