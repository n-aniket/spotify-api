const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDqv1cLpSsBR4vEyFHZI0RyFb0yBWq5z_Q",
  authDomain: "song-database-a8959.firebaseapp.com",
  projectId: "song-database-a8959",
});

export default firebase;