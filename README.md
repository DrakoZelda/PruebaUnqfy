# UNQfy
Diagrama de clases:
https://drive.google.com/open?id=1_n-teiyt88CM0-oCGuytzJRvoKCvNmpd

Los comandos se utilizan de la siguiente forma en consola:

node main.js comandoAUtilizar parametros

Los comandos que se pueden utilizar por consola son los siguientes:


--------------------------------------------------------------------------

addArtist unNombre unPais

node main.js addArtist "juan sin tierra" "Inglaterra"

--------------------------------------------------------------------------

addAlbum unNombreDeAutor unNombre unAnio

node main.js addAlbum "juan sin tierra" "me robe todo" 1845

--------------------------------------------------------------------------

addTrack unNombreDeALbum unNombre unaDuracion unGenero

Ambas formas son validas (varian en la forma de escribir la duracion):

node main.js addTrack "me robe todo" "la cruzada" 300 ["rock"]

node main.js addTrack "me robe todo" "la cruzada" 5:00 ["rock"]

--------------------------------------------------------------------------

addPlaylist unNombre listaDeGenerosAIncluir maximaDuracion

node main.js addPlaylist "metal 2017" ["rock","pop","new metal"] 1400

--------------------------------------------------------------------------

getTracksMatchingGenres unaListaDeGeneros

node main.js getTracksMatchingGenres ["rock","punk"]

--------------------------------------------------------------------------

getTracksMatchingArtist unNombreDeArtista

node main.js getTracksMatchingArtist "juan sin tierra"

--------------------------------------------------------------------------

getAlbumByName unNombreDeAlbum

node main.js getAlbumByName "thriller"

--------------------------------------------------------------------------

getTrackByName unNombreDeTrack

node main.js getTrackByName "la cruzada"

--------------------------------------------------------------------------

getPlaylistByName unNombreDePlaylist

node main.js getPlaylistByName "metal 2017"

--------------------------------------------------------------------------

getAllArtist

node main.js getAllTracks

--------------------------------------------------------------------------

getAllAlbums

node main.js getAllAlbums

--------------------------------------------------------------------------

getAllTracks

node main.js getAllTracks

--------------------------------------------------------------------------