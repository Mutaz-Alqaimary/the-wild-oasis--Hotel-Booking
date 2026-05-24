"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "./auth";

import { supabase } from "./supabase";

import { getBookings } from "./data-service";

import { BookingData, NewBooking } from "@/types/booking";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const nationalityEntry = formData.get("nationality");

  if (typeof nationalID !== "string")
    throw new Error("Please provide a valid national ID");
  if (typeof nationalityEntry !== "string")
    throw new Error("Please select a valid nationality");

  // Expect "Nationality%CountryFlag"
  const [nationality, countryFlag] = nationalityEntry.split("%");
  if (!nationality || !countryFlag)
    throw new Error("Invalid nationality format");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error(`${error.message}, Guest could not be updated`);

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account?toast=signed-in" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/?toast=signed-out" });
}

export async function deleteBooking(bookingId: string) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId || "");
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId || "");
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const observationsRaw = formData.get("observations");
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations:
      typeof observationsRaw === "string" ? observationsRaw.slice(0, 1000) : "",
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations?toast=booking-updated");
}

export async function createBooking(
  bookingData: BookingData,
  formData: FormData,
): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const observationsRaw = formData.get("observations");
  const observations =
    typeof observationsRaw === "string" ? observationsRaw.slice(0, 1000) : "";

  const newBooking: NewBooking = {
    ...bookingData,
    startDate: bookingData.startDate.toLocaleDateString(),
    endDate: bookingData.endDate.toLocaleDateString(),
    guestId: Number(session.user.guestId),
    numGuests: Number(formData.get("numGuests")),
    observations,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou?toast=booking-created");
}
