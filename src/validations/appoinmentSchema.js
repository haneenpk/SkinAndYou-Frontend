import * as Yup from "yup";

export const appoinmentSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    message: Yup.string().required("Message is required"),
  });
