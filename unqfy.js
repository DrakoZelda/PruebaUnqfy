
const picklejs = require('picklejs');
/*
//ES6 soporta import pero node.js no
import PlayList from './playList';
import Artista from './artista';
import Album from './album';
import Track from './track';
*/
const Playlist =  require('./playList')
const Artista =  require('./artista')
const Album =  require('./album')
const Track =  require('./track')


class UNQfy {

  constructor (_artistas, _playlists){
    if(_artistas !== undefined){
      this.artistas = _artistas;//Array<Artista>
    } else {
      this.artistas = new Array();
    }

    if(_playlists !== undefined) {
      this.playlists = _playlists;//Array<playlist>
    } else {
      this.playlists = new Array();
    } 
       
   this.artistas = new Array();
   this.playlists = new Array();
    
  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    //let setAllOfGeneres = new Set();
    let tracksConRepetidos = new Array();
    //console.log("genres: -- "+genres);
    genres.forEach(genere => {
      //this.getAllTracks().forEach(t=>console.log("allTracks: ++ name: "+t.name+" | duration: "+t.duration+" | genre: "+t.genres))
      //console.log("genere: -- "+genere)
      let setOneGenere = this.getAllTracks().filter(t => t.esGenero(genere));
      //console.log("setAllOgGeneres: "+setAllOfGeneres);
      //console.log("setOneGenere: "+setOneGenere);
      //setAllOfGeneres = new Set(...setAllOfGeneres, ...setOneGenere);
      tracksConRepetidos = tracksConRepetidos.concat(setOneGenere); 
    });
    let setAllOfGeneres = new Set(tracksConRepetidos);
    //console.log(setAllOfGeneres);
    return Array.from(setAllOfGeneres);
    //console.log(tracksConRepetidos)
    //return tracksConRepetidos;
  }

  //Originalmente decia artistName
  getTracksMatchingArtist(artist) {
    
    /*
    //Artist por la invariante de que no hay artistas con el mismo nombre siempre deberia o ser lista vacia o lista con un solo artista.
    let artist = this.artistas.filter(artista => artista.name === artistName);
    let tracks = new Array();
    artist.forEach(function(elem){track = elem.getAllTracks()})

    return tracks;
    */
    //console.log(this.getArtistByName(artistName));
    //console.log(this.getArtistByName(artist.name).getAllTracks().length)
    return this.getArtistByName(artist.name).getAllTracks();
    //return artis.getAllTracks();

    
  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(params) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    let nuevoArtista = new Artista (params.name, params.country)
    this.artistas.push(nuevoArtista);
    return nuevoArtista;
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    this.getArtistByName(artistName).addAlbum(new Album(params.name,params.year));
  }


  /* Debe soportar (al menos):
       params.name (string)
       params.duration (number)
       params.genres (lista de strings)
  */
  addTrack(albumName, params) {
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
    this.getAlbumByName(albumName).addTrack(new Track(params.name,params.duration,params.genres));
  }

  getArtistByName(_name) {
    //console.log("artistas: " + this.artistas)
    let artista = this.artistas.filter(a => a.name === _name);
    //console.log("esto es del getArtistByName()")
    //console.log(artista);
    let ret;
    if (artista.length !== 0) {
      ret = artista[0];
    } else {
      ret = new Error("no hay un artista con el nombre " + _name)
    }
    return ret;
    //return this.artistas.filter(a => a.name.includes(_name));
  }

  getAllAlbums() {
    let albumes = [];
    this.artistas.forEach(a => albumes = albumes.concat(a.albums));
    return albumes;
  }

  getAllTracks() {
    //Consigo todos los Tracks (puede haber repetidos)
    /*let allTracks = this.getAllAlbums().reduce(function(a1,a2) {
      return a1.tracks().concat(a2.tracks());
    });*/
    let allTracks = [];
    this.getAllAlbums().forEach(a => allTracks = allTracks.concat(a.tracks));

    //Elimino los repetidos haciendo un Set
    let allTracksSinRepetidos = new Set(allTracks);

    //Retorno un Array formado en base al Set
    return Array.from(allTracksSinRepetidos);
    //return [...allTracksSinRepetidos];
    //return allTracksSinRepetidos;
    /*let array = [];
    allTracksSinRepetidos.forEach(v => array.push(v));
    return array;
    */
  }

  /*
  //Verifica por matchin parcial del string recibido como parametro contra el nombre
  getAlbumByName(name) {
    let allAlbums = this.getAllAlbums();

    return allAlbums.filter(album => album.name().includes(name));
  }
  */
  getAlbumByName(name) {
    let allAlbums = this.getAllAlbums();
    //this.artistas.forEach(a => console.log(a.albums));
    //console.log("allAlbums: -- " + allAlbums);
    //console.log("tipo de allAlbums: --" + typeof(allAlbums));
    let album = allAlbums.filter(alb => alb.name === name);
    let ret;

    if (album.length != 0) {
      ret = album[0];
    } else {
      ret = new Error("no hay un album con el nombre " + name)
    }
    return ret;
  }
/*
  //Verifica por matchin parcial del string recibido como parametro contra el nombre
  getTrackByName(name) {
    let allTracks = this.getAllTracks();

    return allTracks.filter(track => track.name().includes(name));
  }
*/

  getTrackByName(name) {
    let track = this.getAllTracks().filter(tra => tra.name === name);
    let ret;

    if (track.length != 0) {
      ret = track[0];
    } else {
      ret = new Error("no hay un track con el nombre " + name)
    }
    return ret;
  }

  /*
  //Verifica por matchin parcial del string recibido como parametro contra el nombre
  getPlaylistByName(name) {
    return this.playlists.filter(playlist => playList.name().includes(name));
  }
  */

 getPlaylistByName(name) {
    let playList = this.playlists.filter(play => play.name === name);
    let ret;

    if (playList.length != 0) {
      ret = playList[0];
    } else {
      ret = new Error("no hay una playlist con el nombre " + name)
    }
    return ret;
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */
   //console.log(genresToInclude);
   let cancionesPosibles = this.getTracksMatchingGenres(genresToInclude);
   //console.log(cancionesPosibles);

   let playListArmada = new Playlist(name, []);
   //console.log(playListArmada.duration());
   //console.log(maxDuration)
   while (playListArmada.duration()<maxDuration) {
     playListArmada.agregarTrack(cancionesPosibles.pop())
     //console.log(playListArmada.tracks)
     //console.log("duracion: "+playListArmada.duration());
   }
   this.playlists.push(playListArmada);
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,Artista,Playlist,Track,Album];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

