import { db, auth } from "../firebase";

import {JOBS_COLLECTION} from "./constants";

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
  console.log('docs',query.size)
  if (query.empty) return docs;
  query.forEach(doc => {
    docs = [...docs, doc.data()]
  });
  return docs;
}

