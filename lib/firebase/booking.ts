import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firestore";

export type BookingInquiryData = {
  name: string;
  organization: string;
  email: string;
  eventType: string;
  audienceSize: string;
  preferredDate: string;
  message: string;
};

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
    status: "new",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}