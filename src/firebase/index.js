import firebase from "firebase";

const config = {
  apiKey: "YOURAPIKEY",
  authDomain: "YOURDOMAIN",
  databaseURL: "YOURFIREBASEURL",
  projectId: "YOURFIREBASEPROJECTID",
  storageBucket: "YOURFIREBASESTORAGEBUCKET",
  messagingSenderId: "YOURFIREBASESENDERID"
};
firebase.initializeApp(config);

export default firebase;

// Goto console.firebase.com click on new project select web app from list & now copy the config paste in above config params
// Make sure you goto databases & select real time database in test mode so there would be no auth just for test
