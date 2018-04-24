//import Track from "./track";
const Track = require("./track");
//node.js no soporta export
//export default Album;


class Album {

    
    constructor (_name, _year, _tracks, _autores) {
        this.name = _name;
        this.year = _year;
        
        if (_tracks !== undefined){
            this.tracks = _tracks; //Array<Track>
        } else {
            this.tracks = new Array()
        }

        if (_autores !== undefined){
            this.autores = _autores; //Va o no va?
        } else {
            this.autores = new Array()
        }
    }
    

    //Tiene que devolver la duracion total del album.
    duration() {
        return this.tracks.reduce(function(t1,t2){
            return t1.duration + t2.duration;
        });
    }

    generes() {
        let retGeneros = new Set();
        this.tracks.forEach(elem => {
            retGeneros.add(elem.generes);
        });
        return Array.from(retGeneros);
    }

    addTrack(track) {
        this.tracks.push(track);
    }

    esGenero(genero) {
        return this.generes().has(genero);
    }

    cancionesDeGenero(genero){
        return this.tracks.filter(elem => elem.generes === genero);
    }

}

module.exports = Album;