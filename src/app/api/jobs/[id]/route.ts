// import { collectionName, connectToDatabase } from "@/libs/mongodb";
// import { NextResponse } from "next/server";

// export async function PATCH(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, jobId, updates } = body;

//     if (!email || !jobId || !updates)
//       return NextResponse.json({ message: "Missing fields" }, { status: 400 });

//     const { db } = await connectToDatabase();

//     // Build update object
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const setObj: Record<string, any> = {};
//     Object.entries(updates).forEach(([k, v]) => {
//       setObj[`jobs.$.${k}`] = v;
//     });

//     // Update the specific job inside the array
//     const result = await db.collection(collectionName.JOBS).updateOne(
//       { email, "jobs.jobId": jobId },
//       { $set: setObj }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json({ message: "Job not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: "Job updated" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, jobId } = body;

//     if (!email || !jobId)
//       return NextResponse.json({ message: "Missing fields" }, { status: 400 });

//     const { db } = await connectToDatabase();

//     const result = await db.collection(collectionName.JOBS).updateOne(
//       { email },
//       { $pull: { jobs: { jobId } } }
//     );

//     if (result.modifiedCount === 0) {
//       return NextResponse.json({ message: "Job not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: "Job deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";


// Update a specific job
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, jobId, updates } = body;

    if (!email || !jobId || !updates) {
      return NextResponse.json({ message: "Email, jobId and updates required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const result = await db.collection(collectionName.JOBS).updateOne(
      { email, "jobs.jobId": jobId },
      { $set: { "jobs.$": updates } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


// Delete a specific job
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { email, jobId } = body;

    if (!email || !jobId) {
      return NextResponse.json({ message: "Email and jobId required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const result = await db.collection(collectionName.JOBS).updateOne(
      { email },
      { $pull: { jobs: { jobId } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
