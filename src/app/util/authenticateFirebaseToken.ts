import admin, { ServiceAccount } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { User } from "firebase/auth";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
const serviceAccount = require("../../../serviceAccountKey.json");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://justscoutdev.firebaseio.com/",
    storageBucket: "justscout-dev.appspot.com",
  });
}
export default async function authenticateFirebaseToken(
  headers: ReadonlyHeaders
) {
  let idToken = headers.get("authorization")?.split("Bearer ")[1] as string;

  if (idToken) {
    try {
      let decodedIdToken = (await admin
        .auth()
        .verifyIdToken(idToken)) as DecodedIdToken;
      return { ...decodedIdToken };
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
}
