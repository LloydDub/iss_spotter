// iss.js
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {  // uses request to http the target api
    if (error) { // does the error check
      callback(error, null); // the callback for iss.js handlingt he error
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); // idk how Error() works but looks like it majes a fancy error!
      return;
    }
    const ip = JSON.parse(body).ip; //make an ip variable to pass over in index.js
    callback(null, ip);
  })
}



module.exports = { fetchMyIP };