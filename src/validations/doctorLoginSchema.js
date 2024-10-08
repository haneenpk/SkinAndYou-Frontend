import * as Yup from "yup";

export const doctorLoginSchema = Yup.object({
    email: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});