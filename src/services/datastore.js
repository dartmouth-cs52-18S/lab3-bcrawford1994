import firebase from 'firebase';
import Immutable from 'immutable';

const config = {
  apiKey: 'AIzaSyAVYYYksexbWhiTiEyLD0kcTaz8kEcSm58',
  authDomain: 'lab-3-cs52.firebaseapp.com',
  databaseURL: 'https://lab-3-cs52.firebaseio.com',
  projectId: 'lab-3-cs52',
  storageBucket: 'lab-3-cs52.appspot.com',
  messagingSenderId: '654405249648',
};
firebase.initializeApp(config);

const database = firebase.database();

export function fetchNotes(successCallback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    successCallback(newNoteState);
    // do something with new note state
  });
}

// create note in firebase
export function createNewNote(newNote) {
  firebase.database().ref('notes').push(newNote);
}

// update note in firebase
export function updateNote(id, fields) {
  firebase.database().ref('notes').child(id).update(fields);
}

// delete note in firebase
export function removeNote(id) {
  firebase.database().ref('notes').child(id).remove();
}
