//import Album from "./album";
const Album = require("./album");
//node.js no soporta export
//export default Artista;


class Artista {

    constructor (_id,_name, _country, _albums) {
        this.id = _id;
        this.name = _name;
        this.country = _country;

        if (_albums === undefined){
            this.albums = new Array();
        } else {
            this.albums = _albums;//Array<Album>
        }

    }

    addAlbum(_album) {
        this.albums.push(_album);
    }

    getAllTracks() {
        let tracks = new Array()
        this.albums.forEach(elem => {
            tracks = new Array(...tracks,...elem.tracks);
        });
        let sinRepetidos = new Set(tracks);
        return Array.from(sinRepetidos);
    }
}

module.exports = Artista;
