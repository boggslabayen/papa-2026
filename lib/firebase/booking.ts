import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";

import { db } from "./firestore";


// ---------------------------------------------
// TYPES
// ---------------------------------------------

export type BookingInquiryData = {
  name: string;
  organization: string;
  email: string;
  eventType: string;
  audienceSize: string;
  preferredDate: string;
  message: string;
};

export type BookingInquiryStatus = "read" | "unread";

export type BookingInquiry = BookingInquiryData & {
  id: string;
  status: BookingInquiryStatus;
  createdAt: Timestamp | null;
};


// ---------------------------------------------
// CREATE BOOKING INQUIRY
// ---------------------------------------------

export async function createBookingInquiry(
  booking: BookingInquiryData,
): Promise<string> {
  const docRef = await addDoc(collection(db, "bookingInquiries"), {
    name: booking.name,
    organization: booking.organization,
    email: booking.email,
    eventType: booking.eventType,
    audienceSize: booking.audienceSize,
    preferredDate: booking.preferredDate,
    message: booking.message,

    status: "unread",

    createdAt: serverTimestamp(),
  });

  return docRef.id;
}


// ---------------------------------------------
// GET ALL INQUIRIES
// ---------------------------------------------

export async function getAllInquiries(): Promise<BookingInquiry[]> {
  const inquiriesRef = collection(db, "bookingInquiries");

  const inquiriesQuery = query(
    inquiriesRef,
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(inquiriesQuery);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      name: data.name,
      organization: data.organization,
      email: data.email,
      eventType: data.eventType,
      audienceSize: data.audienceSize,
      preferredDate: data.preferredDate,
      message: data.message,
      status: data.status,
      createdAt: data.createdAt ?? null,
    } as BookingInquiry;
  });
}


// ---------------------------------------------
// GET INQUIRIES BY STATUS
// ---------------------------------------------

export async function getInquiriesByStatus(
  status: BookingInquiryStatus,
): Promise<BookingInquiry[]> {
  const inquiriesRef = collection(db, "bookingInquiries");

  const inquiriesQuery = query(
    inquiriesRef,
    where("status", "==", status),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(inquiriesQuery);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      name: data.name,
      organization: data.organization,
      email: data.email,
      eventType: data.eventType,
      audienceSize: data.audienceSize,
      preferredDate: data.preferredDate,
      message: data.message,
      status: data.status,
      createdAt: data.createdAt ?? null,
    } as BookingInquiry;
  });
}


// ---------------------------------------------
// DELETE INQUIRY BY ID
// ---------------------------------------------

export async function deleteInquiryById(
  id: string,
): Promise<void> {
  const inquiryRef = doc(db, "bookingInquiries", id);

  await deleteDoc(inquiryRef);
}

// ---------------------------------------------
// Get INQUIRY BY ID
// ---


export async function getInquiryById(
  id: string,
): Promise<BookingInquiry | null> {
  const inquiryRef = doc(db, "bookingInquiries", id);

  const snapshot = await getDoc(inquiryRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    name: data.name,
    organization: data.organization,
    email: data.email,
    eventType: data.eventType,
    audienceSize: data.audienceSize,
    preferredDate: data.preferredDate,
    message: data.message,
    status: data.status,
    createdAt: data.createdAt ?? null,
  } as BookingInquiry;
}


// This updates the inquiry to read

export async function markInquiryAsRead(id: string): Promise<void> {
  const inquiryRef = doc(db, "bookingInquiries", id);

  await updateDoc(inquiryRef, {
    status: "read",
  });
}