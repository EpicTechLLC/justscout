import { User, getAuth } from "firebase/auth";
import ky from "ky";
import { useAuthState } from "react-firebase-hooks/auth";

export default function firebaseRequest(user: User) {
  return ky.extend({
    hooks: {
      beforeRequest: [
        async (request) => {
          request.headers.set(
            "Authorization",
            `Bearer ${String(await user.getIdToken())}`
          );
        },
      ],
    },
  });
}
