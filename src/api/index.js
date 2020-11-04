import { db, auth, serverTimestamp } from "../firebase";

import {JOBS_COLLECTION, USERS_COLLECTION} from "../utils/constants";

/**
 * Refresh the token manually after 55 mins since it is
 * refreshed lazily by Firebase.
 * https://github.com/firebase/firebase-js-sdk/issues/2985
 * @param firebase
 * @returns {*}
 */
export const forceTokenRefresh = () => {
  const user = auth.currentUser;
  if (user) {

    return auth.currentUser.getIdToken(true);
  }
}

export const saveUserToFirestore = (uid, email, name) => {
  const timestamp = serverTimestamp();
  return db.collection(USERS_COLLECTION).doc(uid).set({
    id: uid,
    email,
    name,
    created: timestamp
  }, { merge: true });
}

export const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
}

export const signInUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
}

export const signOutUser = () => {
  return auth.signOut();
}

export const saveJobToFirestore = async ({title, duration, category, location, email, name, uid}) => {
  let jobsRef = db.collection(JOBS_COLLECTION).doc();
  const id = jobsRef.id;
  const timestamp = db.FieldValue.serverTimestamp();
  return jobsRef.set({
    id,
    title,
    duration,
    category,
    location,
    email,
    name,
    uid,
    timestamp,
    updated: timestamp
  }, {merge: true});
}

export const getAllJobs = async () => {
  const query = await db.collection(JOBS_COLLECTION)
      .orderBy('timestamp', 'desc')
      .get();
  let docs = []
  if (query.empty) return docs;
  query.forEach(doc => {
    docs = [...docs, doc.data()]
  });
  return docs;
}

