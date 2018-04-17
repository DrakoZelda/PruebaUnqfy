//import Album from "./album";
const Album = require("./album");
//node.js no soporta export
//export default Artista;


class Artista {
    
    //no tiene que explotar si no recibe los parametros
    /*constructor(parametros) {
        
    }*/

    constructor (_name, _country, _albums) {
        this.name = _name;
        this.country = _country;

        if (_albums !== null){
            this.albums = albums;//Array<Album>
        } else {
            this.albums = new Array();
        }
        
    }

    addAlbum(_album) {
        this.albums.add(_album);
    }

    getAllTracks() {
        let tracks = new Set();
        this.albums.forEach(element => {
            track.add(elem.tracks);
        });
        return Array.from(tracks);
    }
}

module.exports = Artista;