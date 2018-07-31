const Album = require("./album");


class Artista {

    constructor (_id,_name, _country, _albums,_idSpotify,_videos) {
        this.id = _id;
        this.name = _name;
        this.country = _country;

        if (_albums === undefined){
            this.albums = new Array();
        } else {
            this.albums = _albums;//Array<Album>
        }

        //INICIO forma con youtube y spotify

        if (_videos === undefined){
            this.videos = new Array();
        } else {
            this.videos = _videos;//Array<String>
        }

        //FIN forma con youtube y spotify

    }

    addAlbum(_album) {
        if(this.haveSimilarAlbum(_album)){
            console.log('artista.addAlbum()')
            console.log('album: '+_album)
            console.log(_album[0])
            throw new Error ("Album duplicado")
        } else {
            this.albums.push(_album);
        }
    }

    haveSimilarAlbum(_album) {
        console.log('Album que se quiere cargar')
        console.log(_album)
        let findAlbum = this.albums.find((album) => album.name === _album.name);
        console.log('Album similar encontrado')
        console.log(findAlbum)
        return findAlbum !== undefined;
    }

    getAllTracks() {
        let tracks = new Array()
        this.albums.forEach(elem => {
            tracks = new Array(...tracks,...elem.tracks);
        });
        let sinRepetidos = new Set(tracks);
        return Array.from(sinRepetidos);
    }

    haveAlbum(idAlbum) {
        let findAlbum = this.albums.find((album) => album.id === idAlbum);
        return findAlbum !==undefined;
    }

    deleteAlbum(idAlbum) {
        this.albums = this.albums.filter((album) => album.id !== idAlbum);
    }
}

module.exports = Artista;
