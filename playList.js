//import Track from "./track";
const Track = require("./track");
//node.js no soporta export
//export default PlayList;


class PlayList {

    constructor (_name, _tracks) {
        this.name = _name;
        this.tracks = _tracks;//Array<Track>
    }

    duration() {
        /*return this.tracks.reduce(function(t1,t2) {
            return t1.duration + t2.duration;
        },0);*/
        let duracion = 0;
        this.tracks.forEach(track => duracion += track.duration);
        return duracion;
    }

    hasTrack(aTrack) {
        return this.tracks.indexOf(aTrack) !== -1;
    }

    agregarTrack(track) {
        this.tracks.push(track);
    }
}

module.exports = PlayList;