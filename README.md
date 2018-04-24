# UNQfy
Diagrama de clases:
https://drive.google.com/open?id=1_n-teiyt88CM0-oCGuytzJRvoKCvNmpd

Los comandos que se pueden utilizar por consola son los siguientes:

addArtist unNombre unPais

addAlbum unNombreDeAutor unNombre unAnio

addTrack unNombreDeALbum unNombre unaDuracion unGenero

addPlaylist unNombre listaDeGenerosAIncluir maximaDuracion

getTracksMatchingGenres unaListaDeGeneros

getTracksMatchingArtist unNombreDeArtista

getAlbumByName unNombreDeAlbum

getTrackByName unNombreDeTrack

getPlaylistByName unNombreDePlaylist

getAllArtist

getAllAlbums

getAllTracks

los comandos se utilizan de la siguiente forma en consola:

node main.js comandoAUtilizar parametros

ejemplos:

node main.js addArtist "juan sin tierra" "Inglaterra"

node main.js addAlbum "juan sin tierra" "me robe todo" 1845

node main.js addTrack "me robe todo" "la cruzada" 300 "rock"

node main.js addPlaylist "metal 2017" ["rock","pop","new metal"] 1400

node main.js getTracksMatchingGenres ["rock","punk"]

node main.js getTracksMatchingArtist "juan sin tierra"

node main.js getTrackByName "la cruzada"

node main.js getAlbumByName "thriller"

node main.js getPlaylistByName "metal 2017"

node main.js getAllTracks

node main.js getAllAlbums

node main.js getAllTracks