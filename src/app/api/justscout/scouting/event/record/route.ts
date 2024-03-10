import { BlueAllianceLinks } from "@/app/enums/BlueAllianceLinks";
import { IBlueAllianceTeamSimple } from "@/app/types/IBlueAllianceTeamSimple";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import { IEventInfo } from "@/app/types/IEventInfo";
import { IJustScoutCollection } from "@/app/types/IJustScoutCollection";
import { IRecord } from "@/app/types/IRecord";
import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import blueAllianceAPI from "@/app/util/blueallianceapi";
import uniqueID from "@/app/util/uniqueID";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function createRecords(eventID: string, columns: IColumnProperties[]) {
  const BAResult = (await blueAllianceAPI()
    .get(`event/${eventID}/teams/simple`)
    .json()) as IBlueAllianceTeamSimple[];
  let records: any = {};
  for (const result of BAResult) {
    let newRecord: IRecord[] = [];
    for (const col of columns) {
      const newRow: IRecord = {
        id: col.id,
        value: "",
      };
      if (col.blueAllianceLink) {
        const linkKey = Object.values(BlueAllianceLinks).find(
          (BAKey) => BAKey === col.blueAllianceLink
        );
        newRow.value = result[linkKey as BlueAllianceLinks];
      }
      newRecord.push(newRow);
    }
    records[uniqueID()] = newRecord;
  }
  return records;
}

// async function CreateData(
//   teamNumber: string,
//   eventID: string,
//   referenceData: IEventInfo,
//   docData: IJustScoutCollection
// ) {
//   const db = admin.firestore();
//   const docRef = await db
//     .collection(`scouting/${teamNumber}/${eventID}`)
//     .add(docData);
//   const referenceDoc = {
//     [docRef.id]: {
//       ...referenceData,
//       id: docRef.id,
//       eventId: eventID,
//     },
//   };
//   await db.doc(`scouting/${teamNumber}`).set(referenceDoc, {
//     merge: true,
//   });
// }

// export async function GET(_request: NextRequest) {
//   const { uid, name } = (await authenticateFirebaseToken(
//     headers()
//   )) as DecodedIdToken;
//   const teamNumber = _request.nextUrl.searchParams.get("teamNumber");
//   const eventId = _request.nextUrl.searchParams.get("eventId");
//   const id = _request.nextUrl.searchParams.get("id");
//   if (uid && id && eventId && teamNumber) {
//     const db = admin.firestore();
//     const docRef = await db
//       .doc(`scouting/${teamNumber}/${eventId}/${id}`)
//       .get();
//     const infoRef = await db.doc(`scouting/${teamNumber}`).get();
//     if (docRef.exists && infoRef.exists) {
//       const info = (infoRef.data() as any)[id] as IEventInfo;
//       return NextResponse.json({
//         eventInfo: info,
//         justScoutCollection: docRef.data(),
//       });
//     }
//   } else {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
// }

export async function POST(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventId, id, teamNumber, record, recordId } = await _request.json();
    if (eventId && id && teamNumber && record && recordId) {
      const db = admin.firestore();
      const docRef = await db
        .doc(`scouting/${teamNumber}/${eventId}/${id}`)
        .set(
          { records: { [recordId]: record } },
          {
            merge: true,
          }
        );
      return NextResponse.json({}, { status: 201 });
    } else {
      console.error(
        `Data missing to update scouting event record`,
        eventId,
        id,
        teamNumber,
        record,
        recordId
      );
      return NextResponse.json(
        { error: `Data missing to add scouting event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
