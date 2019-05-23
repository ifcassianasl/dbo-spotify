// spotify.js

console.log('Hello Pug');

const CLIENT_ID = 'fd4a2cddf7a94139ab3a684d59d03fa7';
const SCOPE = 'user-read-private%20user-read-email';
const RESPONSE_TYPE = 'token';
const REDIRECT_URI = 'http://localhost:8080/callback/';
const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;

document.querySelector('button#login').addEventListener('click', function(e) {
    e.preventDefault();
    window.location = URL;
});

if (sessionStorage['token']) {
    const BEARER = sessionStorage['token'];
    const HEADERS = new Headers({
        'Authorization': `Bearer ${BEARER}`,
    });
    const OPTIONS = {headers: HEADERS};
    const ENDPOINT = 'https://api.spotify.com/v1/me';
    fetch(ENDPOINT, OPTIONS)
        .then(function (response) {
            return response.json();
        }).then(function(json) {
        console.dir(json);
        document.querySelector('div#usuario').textContent = json.display_name;
        });
}

const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const artista = form.artista.value;

    const BEARER = sessionStorage['token'];
    if (! BEARER) throw new Error('não tá logado');

    const HEADERS = new Headers({
        'Authorization': `Bearer ${BEARER}`,
    });
    const OPTIONS = {headers: HEADERS};
    const ENDPOINT = `https://api.spotify.com/v1/artists/${artista}`;
    fetch(ENDPOINT, OPTIONS)
        .then(function (response) {
            return response.json();
        }).then(function(json) {
            console.dir(json);
            console.dir(json.name);
            // const name = json.name;
            // document.querySelector('div#resultado') = name;
            const img = json.images[1].url;
            document.querySelector('img').src = img;
        });
})
