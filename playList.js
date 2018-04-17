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
        return this.tracks.reduce(function(t1,t2) {
            return t1.duration + t2.duration;
        });
    }

    hasTrack(aTrack) {
        return this.tracks.indexOf(aTrack) !== -1;
    }
}

module.exports = PlayList;