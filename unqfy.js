
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

  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    let tracksConRepetidos = new Array();
    genres.forEach(genere => {

      let setOneGenere = this.getAllTracks().filter(t => t.esGenero(genere));

      tracksConRepetidos = tracksConRepetidos.concat(setOneGenere);
    });
    let setAllOfGeneres = new Set(tracksConRepetidos);
    return Array.from(setAllOfGeneres);

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
    return this.getArtistByName(artist.name).getAllTracks();
    //return artis.getAllTracks();


  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist (params) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    let nuevoArtista = new Artista (params.name, params.country);
    if(this.artistas.indexOf(nuevoArtista) < 0){
    this.artistas.push(nuevoArtista);
    return nuevoArtista;
    }
    else{
      throw new Error('el artista ya existe');
    }
  }

  getArtistById (artistId) {
    let artista = this.artistas.find((artista) => artista.id === artistId);
    return artista;
  }

  deleteArtist(artistId) {
    let artist = this.getArtistById(artistId);
    let indexArtist = this.artistas.indexOf(artist);
    if(indexArtist > -1){
      delete this.artistas[indexArtist];
    }
    else{
      throw new Error("el artista no existe");
    }
  }

  searchArtists(artistsName) {
    return this.artistas.filter(artist => artist.name.toLowerCase().includes(artistsName.toLowerCase()));
  }

  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    this.getArtistByName(artistName).addAlbum(new Album(params.name,params.year));
  }

  addAlbumTo(artistId, params) {
    let artista = this.getArtistById(artistId);
    let album = new Album(params.name, params.year);
    if(artist){
      artist.addAlbum(album);
      return album;
    }
    else{
      throw new Error('No existe el artista dado');
    }
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
    let artista = this.artistas.filter(a => a.name === _name);
    let ret;
    if (artista.length !== 0) {
      ret = artista[0];
    } else {
      throw new Error("no hay un artista con el nombre " + _name)
    }
    return ret;
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
    let album = allAlbums.filter(alb => alb.name === name);
    let ret;

    if (album.length != 0) {
      ret = album[0];
    } else {
      throw new Error("no hay un album con el nombre " + name)
    }
    return ret;
  }

  getAlbumById(albumId) {
    let allAlbums = this.getAllAlbum();
    let album = allAlbums.filter(album => album.id === albumId);
    let ret;

    if (album.length != 0) {
      ret = album[0];
    } else {
      throw new Error("no hay un album con el id proporcionado");
    }
    return ret;
  }

  searchAlbums(albumsName){
    let albums = this.getAllAlbums();
    return albums.filter(album => album.name.toLowerCase().includes(albumsName.toLowerCase()));

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
      throw new Error("no hay un track con el nombre " + name)
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
      throw new Error("no hay una playlist con el nombre " + name)
    }
    return ret;
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */

    //Si las canciones posibles no son suficientes para alcanzar el tiempo pedido, se comenzaran a repetir canciones.
   let cancionesPosibles = this.getTracksMatchingGenres(genresToInclude);

   let playListArmada = new Playlist(name, []);
   if(!cancionesPosibles.length>0){
    throw new Error("No hay canciones candidatas");
   }
   while (playListArmada.duration()<maxDuration){
    let cargaDeCanciones = [].concat(cancionesPosibles);
    while (playListArmada.duration()<maxDuration && cargaDeCanciones.length!=0) {
      playListArmada.agregarTrack(cargaDeCanciones.pop());
    }

   }


   this.playlists.push(playListArmada);
  }

  //save(filename = 'unqfy.json') {
  save(filename) {
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
  UNQfy
};
