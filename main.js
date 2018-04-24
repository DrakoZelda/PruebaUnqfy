

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy');

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log();
  unqfy.save(filename);
}

function main() {
  let unqfy = getUNQfy("BaseDeDatos");

  let params = process.argv.slice(2);

    switch (params[0]){

        case "addArtist":{
            unqfy.addArtist({name: params[1], country: params[2]});
            console.log(unqfy.artistas);
            break;
        } 

        case "addAlbum":{
            unqfy.addAlbum(params[1], {name: params[2], year: parseInt(params[3])});
            break;
        }

        case "addTrack":{
            unqfy.addTrack(params[1], {name: params[2], duration: params[3], genres: params[4]});
            break;
        }

        case "addPlaylist":{
            //console.log(params[2].substring(1,params[2].length-1).split(","));
            unqfy.addPlaylist(params[1], params[2].substring(1,params[2].length-1).split(","), parseInt(params[3]));
            break;
        }
        
        case "getTracksMatchingGenres":{
            //console.log(params[1].substring(1, params[1].length-1).split(','));
            unqfy.getTracksMatchingGenres(params[1].substring(1, params[1].length-1).split(','));
            break;
        }

        case "getTracksMatchingArtist":{
            unqfy.getTracksMatchingArtist(params[1]);
            break;
        }

        case "getAlbumByName":{
            unqfy.getAlbumByName(params[1]);
            break;
        }

        case "getTrackByName":{
            unqfy.getTrackByName(params[1]);
            break;
        }

        case "getPlaylistByName":{
            unqfy.getPlaylistByName(params[1]);
            break;
        }

        case "getAllArtist":{
            console.log(unqfy.artistas);
            break;
        }

        case "getAllAlbums":{
            console.log(unqfy.getAllAlbums());
            break;
        }

        case "getAllTracks":{
            console.log(unqfy.getAllTracks());
            break;
        }

        case "getAllPlayLists":{
            console.log(unqfy.playlists);
            break;
        }

        default:{
            console.log("No existe el comando dado");
        }
    }
    
    saveUNQfy(unqfy,"BaseDeDatos");
}

main();


