import React, { useContext, useState } from 'react';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};
if (!firebase.default.apps.length) {
  firebase.default.initializeApp(firebaseConfig);
}

const FirebaseContext = React.createContext();

export function useFirebaseContext() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {

  const auth = firebase.default.auth();
  const database = firebase.default.database();
  const storage = firebase.default.storage();
  const analytics = firebase.default.analytics();
  const firebaseFunctions = {


    storage: {
      // query = {
      //   dataType,
      //   path,
      //   dataValue
      // }
      /**
       *  @name         storage
       *  @description  Universal method for storing data in firebase backend
       *  @param        query - 
       *                query = {
       *                  dataType: "image",
       *                  dataValue: BLOB_OR_IMAGE
       *                }
       */
      store: (query, callback) => {
        const storageRef = storage.ref();
        let id;
        if (query.dataType = 'image') {
          let imgId = URL.createObjectURL(query.dataValue).split('/');
          id = imgId[imgId.length - 1];
        } else {
          id = auth.currentUser.uid
        }
        const ref = storageRef.child(`${path}/${id}`);
        ref.put(query.dataValue).then(function () {
          ref.getDownloadURL().then(function (url) {
            if (callback) return callback(url);
            return callback(url);
          });
        })
      }
    },
    database: {
      /**
       * @name        get
       * @description Universal get method for accessing firebase
       * @param       query -
       *              query = {
       *                type: "content",
       *                subtype: "posts",
       *                id: 0123456789,
       *                dataType: "title",
       *                dataValue: "Hello World",
       *                amountToGet: "1"
       *              }
       */
      get: (query, callback) => {

        const processData = (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            if (callback) return callback(data);
            return data;
          } else {
            if (callback) return callback("No data found");
            return "No data found";
          }
        }

        if (!query.type) return callback("invalid type");
        let refString = `/${query.type}/`;
        if (query.subtype) refString += `${query.subtype}/`;
        if (query.id) {
          refString += `${query.id}/`;
          if (query.dataType) refString += `${query.dataType}/`;
          database.ref(refString).once('value').then(function (snapshot) {
            processData(snapshot);
          });
        } else {
          let ref = database.ref(refString).orderByChild(query.dataType).equalTo(query.dataValue)
          if (query.amountToGet) ref.limitToFirst(query.amountToGet);
          ref.once('value').then(function (snapshot) {
            processData(snapshot);
          });
        }
      },
      /**
       * @name        update
       * @description Function that is used to update fields in firebase
       * @param       query -
       *              query = {
       *                type: "content",
       *                subtype: "posts",
       *                id: 0123456789,
       *                dataType: "reacted" ,
       *                dataValue: { "darkorin": "pogChamp" }
       *              }
       */
      update: (query) => {
        // todo:: think about how to handle report function
        if (!query.type) return "invalid type";
        let refString = `/${query.type}/`;
        if (query.subtype) refString += `${query.subtype}/`;
        if (query.id) {
          refString += `${query.id}/`;
          if (query.dataType) refString += `${query.dataType}/`;
          database.ref(refString).update(query.dataValue);
        } else {
          return "No ID Provided";
        }
      },
      search: (value, callback, query) => {
        // search the db
        const usersRef = database.ref('/users/').orderByChild("lower");

        usersRef.once('value', function (snapshot) {
          if (snapshot.val() !== null) {

            let searchResults = [];
            let searchResultsStart = [];
            let exactEqual = [];

            snapshot.forEach(childSnapshot => {
              let user = childSnapshot.val();

              if ((user !== undefined) && (user !== null) && (user.hasOwnProperty("lower")) && (user.lower.includes(value.toLowerCase()))) {

                if (user.lower === value.toLowerCase()) {
                  exactEqual.push(user);
                }
                else if (user.lower.indexOf(value.toLowerCase()) === 0) {
                  searchResultsStart.push(user);
                }
                else {
                  searchResults.push(user);
                }
              }
            });
            searchResults.sort((a, b) => a.lower.length - b.lower.length);
            searchResultsStart.sort((a, b) => a.lower.length - b.lower.length);

            let combinedResults = exactEqual.concat(searchResultsStart).concat(searchResults);

            analytics.logEvent("query_results_found");

            return callback(combinedResults, query);
          } else {
            //return empty object since no result
            analytics.logEvent("query_results_empty")
            return callback({}, query);
          }
        });
      }
    }
  }

  return (
    <FirebaseContext.Provider value={firebaseFunctions}>
      {children}
    </FirebaseContext.Provider>
  )
}
