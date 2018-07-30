let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8000;


function invalidJsonHandler(err, req, res, next) {
      res.status(400).send({status:400,errorCode:"BAD_REQUEST"})
  }

// app.use(bodyParser.json({ type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(invalidJsonHandler);

const artistCtrl = require('./controllers/artista_controller');
const albumCtrl = require('./controllers/album_controller');


// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });
// router.post('/artists/', artistCtrl.saveArtist);

//PROCESANDO POST
router.route('/track')
.post(function(req, res) {
    console.log(req.body.title);
    res.json({ message: 'Track created!' });
});

//PROCESANDO GET
router.route('/track')
.get(function(req,res){
    if (req.query.ping){
        res.json({ message: 'pong! tu ping es: ' + req.query.ping});
    } else {
        res.json({ message: 'no mandaste el ping'});
    }
})

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

router.route('/youtube/').get(artistCtrl.youtube);




app.use('/api', router);
app.use(function(req, res){
    res.status(404).send({status:404,errorCode:"RESOURCE_NOT_FOUND"});
});
app.listen(port);
console.log('La magia esta en el puerto: '+ port);