//node.js no soporta export
//export default Track;


class Track {

    /*
    constructor (_name, _duration, _genres) {
        this.name = _name;//String
        this.duration = this.stringASegundos(_duration);//Int (segundos totales)
        this.genres = _genres;//String (solo un genero)
    }
    */

    constructor (_name, _duration, _genres) {
        this.name = _name;//String
        this.duration = _duration//Int (segundos totales)
        this.genres = _genres;//String (solo un genero)
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
        return this.genres === genero;
    }

}

module.exports = Track;