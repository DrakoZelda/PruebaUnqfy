
const picklejs = require('picklejs');
const rp = require('request-promise');
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

//youtube key
const apiKey = 'AIzaSyDEdjtx9mEESzDIiNfCeYlvEZVpnWkk_WE';
//spotify key
const pk = 'BQAYR58BrI7KpwGhXtFUWBHkUBujs_cTKTRr9WoRYpFOgD2ppVqONKVNEpc1zQCmBZTuZVexzfUV5O9LF3knXsBvMSIC1_q4CrVjKoepgt25ML591S4IFX20FfEynvl6Rxl1GpG5SReXAMqRmE0DdZ6Cy3tGNpWDuJU1'

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

    this.lastIdArtist = 0;
    this.lastIdAlbum = 0;

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
     params = {name:... , country:....}
  */
 //addArtist con Youtube y Spotify
  
 addArtist (params) {
    let nuevoArtista = new Artista (this.lastIdArtist,params.name, params.country);

    if(!this.existArtistLikeThis(nuevoArtista.name, nuevoArtista.country)) {
      
      return this.youtube(nuevoArtista).then(artistYoutube => this.populateAlbumsArtistSpotify(artistYoutube)).then(artistaCargado => {
        this.lastIdArtist = this.lastIdArtist + 1;
        this.artistas.push(artistaCargado);
        console.log('ultima promesa')
        console.log(artistaCargado)
        return artistaCargado;
      });

    }else{
      throw new Error('el artista ya existe');
    }
  }
  

  //addArtist original hasta youtube, sin lo de spotify que lo hice para jugar
  /*
  addArtist (params) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    let nuevoArtista = new Artista (this.lastIdArtist,params.name, params.country);
    //let index = this.artistas.indexOf(nuevoArtista);
    //if(index < 0){
    if(!this.existArtistLikeThis(nuevoArtista.name, nuevoArtista.country)) {
      //this.lastIdArtist++;
      
      //this.lastIdArtist = this.lastIdArtist + 1;
      //this.artistas.push(nuevoArtista);
      return this.youtube(nuevoArtista).then(artistaCargado => {
        this.lastIdArtist = this.lastIdArtist + 1;
        this.artistas.push(nuevoArtista);
        return nuevoArtista;
      });
      //return nuevoArtista;
    }else{
      throw new Error('el artista ya existe');
    }
  }
  */

  //addArtist original, NO youtube y NO spotify
  /*
  addArtist (params) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    let nuevoArtista = new Artista (this.lastIdArtist,params.name, params.country);
    if(!this.existArtistLikeThis(nuevoArtista.name, nuevoArtista.country)) {
      this.lastIdArtist = this.lastIdArtist + 1;
      this.artistas.push(nuevoArtista);
      return nuevoArtista;
    }else{
      throw new Error('el artista ya existe');
    }
  }
  */

  NUEVOaddArtist (params) {

    let promesaId = this.getIdSpotifyArtistName(params.name)

    promesaId.then((idSpotify) => {
      
      // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
      let nuevoArtista = new Artista (this.lastIdArtist,params.name, params.country, [], idSpotify);
      //let index = this.artistas.indexOf(nuevoArtista);
      //if(index < 0){
      if(!this.existArtistLikeThis(nuevoArtista.name, nuevoArtista.country)) {
      //this.lastIdArtist++;
      this.lastIdArtist = this.lastIdArtist + 1;
      this.artistas.push(nuevoArtista);
      return nuevoArtista;
      }else{
        throw new Error('el artista ya existe');
      }

    }).then(() => console.log(this.artistas));
    
  }

  NUEVO2addArtist (params) {
    

    return this.getIdSpotifyArtistName(params.name).then((idSpotify) => {

      // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
      let nuevoArtista = new Artista (this.lastIdArtist,params.name, params.country,[], idSpotify);
      //let index = this.artistas.indexOf(nuevoArtista);
      //if(index < 0){
      if(!this.existArtistLikeThis(nuevoArtista.name, nuevoArtista.country)) {
      //this.lastIdArtist++;
      this.lastIdArtist = this.lastIdArtist + 1;
      this.artistas.push(nuevoArtista);
      return nuevoArtista;
      }else{
        throw new Error('el artista ya existe');
      }

    });

  }


  existArtistLikeThis(_nombre, _pais) {
    return 0 < this.artistas.filter(artist => (artist.name.toLowerCase() == _nombre.toLowerCase()) && (artist.country.toLowerCase() == _pais.toLowerCase())).length;
  }

  getArtistById (artistId) {
    //let artista = this.artistas.find(artista => artista.id === artistId);
    let artist = this.artistas.filter(artista => artista.id === artistId);
    if (artist.length === 0){
      throw new Error('no hay artista con ese id');
    } else {
      return artist[0];
    }
  }

  deleteArtist(artistId) {
    try{
      let artist = this.getArtistById(artistId);
      let indexArtist = this.artistas.indexOf(artist);
      this.artistas.splice(indexArtist,1);
      // delete this.artistas[indexArtist]; //No uso delete porque agrega null. No reindexa la lista.
      console.log('unqfy.deleteArtist('+artistId+')');
      this.deleteArtistNotification(artistId);
    }catch(e){
      throw e;
    }

  }

  searchArtists(artistsName) {
    return this.artistas.filter(artist => artist.name.toLowerCase().includes(artistsName.toLowerCase()));
  }

  /* Debe soportar al menos:
      artistId numero.
      params.name (string)
      params.year (number)
  */
 addAlbum(artistId, params) {
  // El objeto album creado debe tener (al menos) las propiedades name (string) y year
   
  try {
     let nuevoAlbum = new Album(this.lastIdAlbum, params.name, params.year);
     let artista = this.getArtistById(artistId);
     artista.addAlbum(nuevoAlbum);
     this.lastIdAlbum++;
     this.notify(artistId,artista.name,nuevoAlbum.name);
     return nuevoAlbum;
   } catch (error) {
     throw error;
   }
   
}
/* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  // addAlbum(artistName, params) {
  //   // El objeto album creado debe tener (al menos) las propiedades name (string) y year
  //   this.getArtistByName(artistName).addAlbum(new Album(params.name,params.year));
  // }
  

  deleteAlbum(albumId) {
    try{
      let artistaConAlbum = this.artistWithAlbum(albumId);
      artistaConAlbum.deleteAlbum(albumId);
    }catch (error) {
      throw error;
    }
  }

  artistWithAlbum(albumId) {
    let findArtista = this.artistas.find((artista) => artista.haveAlbum(albumId));
    if(findArtista !== undefined) {
      return findArtista;
    } else {
      throw new Error("No existe el album");
    }
  }

  addAlbumTo(artistId, params) {
    let artista = this.getArtistById(artistId);
    console.log('name: '+params.name)
    console.log('year: '+params.year)
    let album = new Album(this.lastIdAlbum,params.name, params.year);
    if(artista){
      console.log(album);
      artista.addAlbum(album);
      this.notify(artistId,artista.name,album.name);
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
    let allAlbums = this.getAllAlbums();
    let album = allAlbums.filter(album => album.id === albumId);
    let ret;

    if (album.length != 0) {
      ret = album[0];
    } else {
      throw new Error("no hay un album con el id proporcionado");
    }
    return ret;
  }

  getAlbumsForArtist(_artistName) {
    return this.getArtistByName(_artistName).albums;
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

  existArtistId(_artistId){
    let artista = this.artistas.filter(a => a.id === _artistId);
    return artista.length !== 0;
  }

  addAlbumSpotify(_artist, params) {
    try {
      console.log('addAlbumSpotify')
      console.log('artista: ')
      console.log(_artist)
      console.log('params')
      console.log(params)
      let nuevoAlbum = new Album(this.lastIdAlbum, params.name, params.year);
      _artist.addAlbum(nuevoAlbum);
      this.lastIdAlbum++;
      //this.notify(_artist.id,_artist.name,nuevoAlbum.name);
    } catch (error) {
      throw error;
    }
  }

  populateAlbumsArtistSpotify(_artist) {

    
    let promiseIdArtis = this.getIdSpotifyArtistName(_artist.name);


    return promiseIdArtis.then((idArtist) => {

      let options = {
        url: 'https://api.spotify.com/v1/artists/'+idArtist+'/albums?limit=10',
         headers: { Authorization: 'Bearer ' + pk },
         json: true,
       };

       return rp.get(options).then((albums) => {

        albums.items.forEach((album) => {

          let yearFormated = this.castYear(album.release_date, album.release_date_precision);

          try {
            this.addAlbumSpotify(_artist,{name:album.name, year:yearFormated});
          } catch (error) {
            console.log('populateAlbumsArtistSpotify quiso cargar un album "duplicado"')
            console.log('Artista: '+_artist)
            console.log('Album:')
            console.log({name:album.name, year:yearFormated})
            console.log('ERROR')
            console.log(error)
          }
          //this.addAlbumSpotify(_artist,{name:album.name, year:yearFormated});

        });

        return _artist;

       });
    }).then(artista => {
      console.log(artista)
      return artista
   }).catch(e => {throw e})//.then(() => console.log(this.getAlbumsForArtist(_nameArtist)) );//Esto se saca, es para testing
;
   
  }

  populateAlbumsForArtist(_nameArtist) {

    let promiseIdArtis = this.getIdSpotifyArtistName(_nameArtist);


    promiseIdArtis.then((idArtist) => {

      let options = {
        url: 'https://api.spotify.com/v1/artists/'+idArtist+'/albums?limit=10',
         headers: { Authorization: 'Bearer ' + pk },
         json: true,
       };

       rp.get(options).then((albums) => {

        albums.items.forEach((album) => {

          let yearFormated = this.castYear(album.release_date, album.release_date_precision);

          this.addAlbum(_nameArtist,{name:album.name, year:yearFormated});

        });

       }).then(() => console.log(this.getAlbumsForArtist(_nameArtist)) );//Esto se saca, es para testing

    });
  

    // Forma con el id como propiedad del artista

    // let idArtist = this.getArtistByName(_nameArtist).idSpotify;

    // let options = {
    //       url: 'https://api.spotify.com/v1/artists/'+idArtist+'/albums?limit=10',
    //        headers: { Authorization: 'Bearer ' + pk },
    //        json: true,
    //      };
  
    // rp.get(options).then((albums) => {

    // albums.items.forEach((album) => {

    //   let yearFormated = this.castYear(album.release_date, album.release_date_precision);

    //   this.addAlbum(_nameArtist,{name:album.name, year:yearFormated});

    // });

    // }).then(() => console.log(this.getAlbumsForArtist(_nameArtist)) );//Esto se saca, es para testing
    
  }

  castYear(date,precision) {
    if(precision === 'year') {
      return date;
    }
    if(precision === 'day') {
      return date.substring(0,4);
    }
  }
  
  getAlbumsArtistSpotify(_idArtistSpoify) {
  
    let options = {
      // url: 'https://api.spotify.com/v1/artists/'+idSpotifyArtist,
      url: 'https://api.spotify.com/v1/artists/'+_idArtistSpoify+'/albums?limit=10',
       headers: { Authorization: 'Bearer ' + pk },
       json: true,
     };
     rp.get(options).then((response) => console.log(response.items));
  
  }
  
  //Retorna una promesa con el id
  getIdSpotifyArtistName(_artistName) {
    let options = {
      url: 'https://api.spotify.com/v1/search?q='+_artistName+'&type=artist',
       headers: { Authorization: 'Bearer ' + pk },
       json: true,
     };
     return rp.get(options).then((response) => (response.artists.items[0].id));
  }


  //TRABAJO 29/07/2018

  notify(_idArtist,_nameArtist,_albumName){
    let options = {
      method: 'POST',
      url: 'http://localhost:5001/api/notify',
      body: {
        artistId: _idArtist,
        subject:'Nuevo Album para artista '+ _nameArtist,
        message:'Se ha agregado el album "'+ _albumName +'" al artista '+ _nameArtist,
        from:'UNQfy <UNQfy.notifications@gmail.com>'
      },
       json: true
     };
     console.log('options')
     console.log(options)
     console.log(options.body)
     return rp.post(options).then((response) => response).catch((e) => {
      console.log('notify exploto') 
      throw e
    });
  }

  deleteArtistNotification(_idArtist) {
    console.log('unqfy.deleteArtistNotification('+_idArtist+')')
    let options = {
      method: 'DELETE',
      url: 'http://localhost:5001/api/deleteFeed',
      body: {
        artistId: _idArtist
      },
      json: true
    };
    console.log('body.artistId: '+options.body.artistId)
    return rp.del(options).then((response) => {
      console.log('se envio bien')
      response
    }).catch((e) => {
      console.log('unqfy.deleteArtist() exploto');
      throw e;
    });
  }

  youtube(_artist) {
    let options = {
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      qs: {
          part: 'snippet',
          maxResults: '10',
          q: _artist.name,
          type: 'video',
          fields: 'items/id/videoId',
          key: apiKey
      },
      json:true
    }
    return rp.get(options).then((responseVideos) => {
      let videos = responseVideos.items.map(item => 'https://www.youtube.com/watch?v='+item.id.videoId);
      _artist.videos = videos;
      return _artist;
    }).catch((e) => {
      throw e;
    })
  }

  //FIN TRABAJO 29/07/2018

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

//pk = 'BQD7TQ9BkEzHr8p-ZIzNAv7e42wUHxFm4fxK0Hp-5cayL6KKg0dfqmy3QUQTsCTkwVNYY328th4qT26jT9JeTpuZVj1u955T_pf0Q4Ix9k1eGwXlDypiX7UwA8yPM4mmOOX8xwOCVJOWGpk1QIIo73vZ-PN6rGA9pdif';
var instanciaUnqfy = new UNQfy();
// console.log("Artistas de Unqfy:")
// console.log(instanciaUnqfy.artistas);
// console.log("---------------------------")
// console.log('artist id')
// instanciaUnqfy.populateAlbumsForArtist('tania bowra','BQDDA7ns-V1hzcdLEsCiUL16S-4njCsOgylyEWSjYs25wFku4sGnnbcj8ykSHcYQmuqPzxMYEO0y5Zy3WHQHwZdpjsV5WQTq7Bubii1bTCfn3sitdeBC8hwDln1t-IiBVHmURhZ7QQi-9o-taaKDl3jKCmNxI8hThNTt');
// console.log("---------------------------")
// console.log("Artistas de Unqfy:")
// console.log(instanciaUnqfy.artistas);
// console.log("Esto se ejecuto");

// instanciaUnqfy.NUEVOaddArtist({name:'tania bowra', country:'USA'});


// console.log(instanciaUnqfy.artistas);
// console.log(instanciaUnqfy.getIdSpotifyArtistName('tania bowra'));

// instanciaUnqfy.addArtist({name:'tania bowra',country:'USA'});

//Ejemplo funcional
// instanciaUnqfy.NUEVO2addArtist({name:'tania bowra',country:'USA'}).then(() => 
// instanciaUnqfy.populateAlbumsForArtist('tania bowra'));

let cancionNueva = new Track("Despacito",200,["Cumbion"]);
// cancionNueva.loadLyricsMusixMatch();
console.log(cancionNueva.getLyrics());
// cancionNueva.getTrackIdMusixMatch();



