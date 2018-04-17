const UNQfy = require('./unqfy');

let unqfy = new UNQfy.UNQfy();

function main(){
    let params = process.argv.slice(2);

    switch (params[0]){
    //addTrack nombreAlbum nombreTrack duracionTrack listaGenerosTrack
        //case "addTrack" :{
          //  unqfy.addTrack(params[1], {name: params[2], duration: params[3], genres: params[4]})
        //}
        case "addArtist":{
            unqfy.addArtist({name: params[1], country: params[2]});
            console.log(unqfy.artistas);
            break;
        } 

        case "addAlbum":{
            unqfy.addAlbum(params[1], {name: params[2], year: params[3]});
            break;
        }

        case "addTrack":{
            unqfy.addTrack(params[1], {name: params[2], duration: params[3], genres: params[4]});
            break;
        }

        case "addPlaylist":{
            console.log(params[2].substring(1,params[2].length-1).split(","));
            unqfy.addPlaylist(params[1], params[2].substring(1,params[2].length-1).split(","), params[3]);
            break;
        }
        
        case "getTracksMatchingGenres":{
            console.log(params[1].substring(1, params[1].length-1).split(','));
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

        default:{
            console.log("No existe el comando dado");
        }
    }

}
main();