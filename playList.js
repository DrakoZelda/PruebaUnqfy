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
        /*console.log("ESTOS SON TODOS LOS TRACKS QUE HAY")
        console.log(this.tracks);
        console.log("FIN TRACKS QUE HAY")
        */
        this.tracks.forEach(track => {
            //console.log("estoy pidiendo duration");
            //console.log(track);
            duracion += track.duration
        });
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