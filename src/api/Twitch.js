require('dotenv').config();
const request = require('request');

const API = {
  getToken: (url, callback) => {

    const options = {
      url: "https://id.twitch.tv/oauth2/token",
      json: true,
      body: {
        client_id: "0r50vc5jeamzsgri5va02r2e75yi72",
        client_secret: "20o5iaceu3746hq2mb5z4dls535dqv",
        grant_type: 'client_credentials'
      }
    };
    request.post(options, (err, res, body) => {
      if (err) {
        //todo:: implement logic here when theres an error thats not a console log
      }
      callback(res);
    });
  },
  getTopGames: (url, token, callback) => {
    const options = {
      url: "https://api.twitch.tv/helix/games/top",
      method: 'GET',
      json: true,
      headers: {
        "client-id": "0r50vc5jeamzsgri5va02r2e75yi72",
        "Authorization": "Bearer " + token
      }
    };

    request.get(options, (err, res, body) => {
      if (err) {
        //todo:: implement logic here when request fails
      }

      callback(res);
    });
  },
  validate: (url, token, callback) => {
    if (token === undefined) return "no token"
    const options = {
      url: "https://id.twitch.tv/oauth2/validate",
      json: true,
      headers: {
        "Authorization": "OAuth " + token
      }
    };

    request.get(options, (err, res, body) => {
      if (err) {
        //todo:: implement logic here when request fails
      }
      callback(res);
    });
  }
}

module.exports = API;