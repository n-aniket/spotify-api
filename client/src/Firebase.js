const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const api_key = "AIzaSyDqv1cLpSsBR4vEyFHZI0RyFb0yBWq5z_Q";
const auth_domain = "song-database-a8959.firebaseapp.com";
const project_id = "song-database-a8959";

firebase.initializeApp({
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
});

export default firebase;