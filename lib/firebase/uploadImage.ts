// import { FirebaseError } from "firebase/app";
// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytes,
// } from "firebase/storage";

// import { storage } from "./storage";

// type UploadImageOptions = {
//   folder: "articles" | "products" | "users";
//   userId: string;
// };

// export async function uploadImage(
//   file: File,
//   { folder, userId }: UploadImageOptions
// ) {
//   const fileExtension = file.name.split(".").pop();
//   const fileName = `${Date.now()}.${fileExtension}`;

//   const imageRef = ref(storage, `${folder}/${userId}/${fileName}`);

//   await uploadBytes(imageRef, file);

//   const imageUrl = await getDownloadURL(imageRef);

//   return imageUrl;
// }

// export async function deleteImageByUrl(imageUrl?: string | null) {
//   if (
//     !imageUrl ||
//     (!imageUrl.includes("firebasestorage.googleapis.com") &&
//       !imageUrl.startsWith("gs://"))
//   ) {
//     return;
//   }

//   try {
//     await deleteObject(ref(storage, imageUrl));
//   } catch (error) {
//     if (
//       error instanceof FirebaseError &&
//       error.code === "storage/object-not-found"
//     ) {
//       return;
//     }

//     throw error;
//   }
// }


import { FirebaseError } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "./storage";

type UploadImageOptions = {
  folder: "articles" | "products" | "users";
  userId: string;
};

export async function uploadImage(
  file: File,
  { folder, userId }: UploadImageOptions,
) {
  console.log("UPLOAD 1: uploadImage started");
  console.log("UPLOAD 2: file:", file.name, file.size, file.type);
  console.log("UPLOAD 3: folder:", folder);
  console.log("UPLOAD 4: userId:", userId);
  console.log("UPLOAD 5: storage:", storage);

  if (!userId) {
    throw new Error("uploadImage: userId is missing.");
  }

  const fileExtension = file.name.split(".").pop() || "jpg";

  const fileName = `${Date.now()}.${fileExtension}`;

  const storagePath = `${folder}/${userId}/${fileName}`;

  console.log("UPLOAD 6: storage path:", storagePath);

  const imageRef = ref(storage, storagePath);

  try {
    console.log("UPLOAD 7: starting uploadBytes");

    const snapshot = await uploadBytes(imageRef, file);

    console.log("UPLOAD 8: uploadBytes finished");
    console.log("UPLOAD 9: snapshot:", snapshot);

    console.log("UPLOAD 10: getting download URL");

    const imageUrl = await getDownloadURL(snapshot.ref);

    console.log("UPLOAD 11: download URL:", imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    if (error instanceof FirebaseError) {
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);
    }

    throw error;
  }
}

export async function deleteImageByUrl(imageUrl?: string | null) {
  if (
    !imageUrl ||
    (!imageUrl.includes("firebasestorage.googleapis.com") &&
      !imageUrl.startsWith("gs://"))
  ) {
    return;
  }

  try {
    await deleteObject(ref(storage, imageUrl));
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      error.code === "storage/object-not-found"
    ) {
      return;
    }

    throw error;
  }
}