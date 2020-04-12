const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const api_key = process.env.REACT_APP_API_KEY;
const auth_domain = process.env.REACT_APP_AUTH_DOMAIN;
const project_id = process.env.REACT_APP_PROJECT_ID;

firebase.initializeApp({
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
});

export default firebase;