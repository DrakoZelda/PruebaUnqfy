//node.js no soporta export
//export default Track;
const rp = require('request-promise');


class Track {

    /*
    constructor (_name, _duration, _genres) {
        this.name = _name;//String
        this.duration = this.stringASegundos(_duration);//Int (segundos totales)
        this.genres = _genres;//String (solo un genero)
    }
    */

    constructor (_name, _duration, _genres, _lyrics) {
        this.name = _name;//String

        if (new String(_duration).indexOf(":")!==-1){
            this.duration = this.stringASegundos(_duration);
        } else {
            this.duration = _duration//Int (segundos totales)
        }
        //this.duration = _duration//Int (segundos totales)
        
        this.genres = _genres;//ArrayStrings

        if(_lyrics === undefined){
            this.lyrics = "";
        } else {
            this.lyrics = _lyrics;
        }

        this.pkMusixMatch = '3cb04b919e2723060f606f784838cf4a';
    }

    

    stringASegundos(str) {
        //Parseo el formato "minutos":"segundos"
        let minutos = /\d+:/.exec(str)[0];
        minutos = minutos.substring(0,minutos.length-1);
        let segundos = /:\d+$/.exec(str)[0];
        segundos = segundos.substring(1,);

        //Paso de string a int
        minutos = +minutos;
        segundos = +segundos;

        //Retorno la cantidad de segundos total
        return (minutos*60)+segundos;

    }

    esGenero(genero) {
        return this.genres.indexOf(genero)!==-1;
    }

    esDeAlgunGenero(generos){
         //recibe una lista de genero
        let ret = false;
        generos.forEach(element => {
            ret = ret || (this.genres === genero);
        });
        return ret;
    }

    getLyrics() {
        if(this.lyrics === ""){
            this.loadLyricsMusixMatch(); //COMPLETAR, FALTA RETORNAR LA LETRA CONSEGUIDA
           //let algo = await this.loadLyricsMusixMatch(); //COMPLETAR, FALTA RETORNAR LA LETRA CONSEGUIDA
            //while(this.lyrics === ""){
                //console.log("Cargando letra ...")
            //}
            //return algo//this.lyrics
        } else {
            return this.lyrics
        }        
    }

    loadLyricsMusixMatch() {
        console.log("load")
        let promiseId = this.getTrackIdMusixMatch();

        promiseId.then((idMusixMatch) => {

            let options = {
                url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey='+this.pkMusixMatch+'&track_id='+idMusixMatch,
                 json: true,
               };
            rp.get(options).then((response) => this.lyrics=(response.message.body.lyrics.lyrics_body)).then(() => console.log(this.getLyrics()));//Esto se saca, es para testing

        });

    }

    getTrackIdMusixMatch(){

        let options = {
            url: 'http://api.musixmatch.com/ws/1.1/track.search?apikey='+this.pkMusixMatch+'&q_track='+this.name,
             json: true,
           };
        return rp.get(options).then((response) => response.message.body.track_list[0].track.track_id);

    }

}

module.exports = Track;