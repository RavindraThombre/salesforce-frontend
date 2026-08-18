import * as yup from "yup";

export const submitJobApplicationSchema = yup.object({
  phone: yup.string().required("Phone number is required."),

  coverLetter: yup.string(),

  resume: yup.mixed<File>().required("Resume is required."),
});
