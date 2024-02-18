import admin, { ServiceAccount } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
export const dynamic = "force-dynamic";

export default async function authenticateFirebaseToken(
  headers: ReadonlyHeaders
) {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.SERVICE_ACCOUNT as string)
      ),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }
  let idToken = headers.get("authorization")?.split("Bearer ")[1] as string;

  if (idToken) {
    try {
      let decodedIdToken = (await admin
        .auth()
        .verifyIdToken(idToken)
        .catch((e) => {
          console.error(e);
        })) as DecodedIdToken;
      return { ...decodedIdToken };
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
}
