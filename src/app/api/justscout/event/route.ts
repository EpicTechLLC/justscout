import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { ISharedEventInfo } from "@/app/types/ISharedEventInfo";
import { IEventInfo } from "@/app/types/IEventInfo";

async function DeleteData(teamNumber: string, id: string, eventId: string) {
  const db = admin.firestore();
  const docRef = db.doc(`Teams/${teamNumber}`);
  await docRef
    .update({ [id]: admin.firestore.FieldValue.delete() })
    .then(async () => {
      const docRef2 = db.doc(`Teams/${teamNumber}/${eventId}/${id}`);
      await docRef2.delete();
    });
}

async function CreateData(
  teamNumber: string,
  eventID: string,
  referenceData: IEventInfo,
  docData: ISharedEventInfo
) {
  const db = admin.firestore();
  const docRef = await db
    .collection(`Teams/${teamNumber}/${eventID}`)
    .add(docData);
  const referenceDoc = {
    [docRef.id]: {
      ...referenceData,
      id: docRef.id,
      eventId: eventID,
    },
  };
  await db.doc(`Teams/${teamNumber}`).set(referenceDoc, {
    merge: true,
  });
}

export async function DELETE(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventId, id, teamNumber } = await _request.json();
    if (eventId && id && teamNumber) {
      DeleteData(teamNumber, id, eventId);
    } else {
      console.error(`Data missing to add event`, eventId, id, teamNumber);
      return NextResponse.json(
        { error: `Data missing to delete event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return new NextResponse();
}

export async function GET(_request: NextRequest) {
  const { uid } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;

  if (uid) {
    const teamNumber = _request.nextUrl.searchParams.get("teamNumber");
    const eventId = _request.nextUrl.searchParams.get("eventId");
    const id = _request.nextUrl.searchParams.get("id");
    if (eventId && id && teamNumber) {
      const db = admin.firestore();
      const docRef = await db.doc(`Teams/${teamNumber}/${eventId}/${id}`).get();
      if (docRef.exists) {
        return NextResponse.json(docRef.data());
      }
    }
    return new NextResponse(undefined, { status: 442 });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventID, eventName, columns, teamNumber } = await _request.json();
    if (eventID && eventName && columns && teamNumber) {
      const now = Date.now();
      const docData: ISharedEventInfo = {
        name: eventName,
        columns: columns,
        createdBy: uid,
        modifiedBy: uid,
        modifiedByName: name,
        timeStamp: now,
        modified: now,
      };
      const referenceData: IEventInfo = {
        modified: now,
        name: eventName,
        modifiedByName: name,
        id: "",
        eventId: "",
      };
      CreateData(teamNumber, eventID, referenceData, docData);
    } else {
      console.error(
        `Data missing to add event`,
        eventID,
        eventName,
        columns,
        teamNumber
      );
      return NextResponse.json(
        { error: `Data missing to add event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({});
}

export async function PUT(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventID, eventName, columns, teamNumber, id, eventId } =
      await _request.json();
    if (eventID && eventName && columns && teamNumber && eventId) {
      const now = Date.now();
      const db = admin.firestore();
      const docRef = db.doc(`Teams/${teamNumber}/${eventId}/${id}`);
      const refDocRef = db.doc(`Teams/${teamNumber}`);

      const docRefGet = await docRef.get();
      const refDocRefData = (await refDocRef.get()).data();
      if (docRefGet.exists && refDocRefData) {
        const currentShared = docRefGet.data() as ISharedEventInfo;
        const currentReference = refDocRefData[id] as IEventInfo;

        currentShared.columns = columns;
        currentShared.modified = now;
        currentShared.modifiedBy = uid;
        currentShared.modifiedByName = name;

        currentReference.modified = now;
        currentReference.modifiedByName = name;

        if (eventID !== eventId) {
          currentShared.name = eventName;
          currentReference.name = eventName;
          await DeleteData(teamNumber, id, eventId);
          await CreateData(
            teamNumber,
            eventID,
            currentReference,
            currentShared
          );
          return new NextResponse(undefined, { status: 201 });
        } else {
          docRef.update({ ...currentShared });
          refDocRef.update({ [id]: currentReference });
          return new NextResponse(undefined, { status: 204 });
        }
      }
    } else {
      console.error(
        `Data missing to update event`,
        eventID,
        eventName,
        columns,
        teamNumber
      );
      return NextResponse.json(
        { error: `Data missing to update event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
