import * as Yup from "yup";

export const getEditCourseValidationSchema = (
  totalScheduledSessions: number,
) => {
  return Yup.object({
    title: Yup.string().trim().required("Course title is required"),

    description: Yup.string().trim().required("Course description is required"),

    totalLiveSessions: Yup.number()
      .typeError("Total live sessions must be a number")
      .integer("Total live sessions must be a whole number")
      .required("Total live sessions is required")
      .min(
        Math.max(totalScheduledSessions, 1),
        totalScheduledSessions > 0
          ? `Cannot be less than ${totalScheduledSessions}. ${totalScheduledSessions} live session${
              totalScheduledSessions === 1 ? " is" : "s are"
            } already scheduled.`
          : "At least 1 live session is required",
      ),

    price: Yup.number().when("isFree", {
      is: false,

      then: (schema) =>
        schema
          .typeError("Price must be a number")
          .min(1, "Price must be greater than 0")
          .required("Price is required"),

      otherwise: (schema) => schema.notRequired(),
    }),

    discountPrice: Yup.number().when("isFree", {
      is: false,

      then: (schema) =>
        schema
          .typeError("Discount price must be a number")
          .min(0, "Discount price cannot be negative")
          .test(
            "not-more-than-price",
            "Discount price cannot be greater than original price",
            function (value) {
              if (value === undefined || value === null) {
                return true;
              }

              const price = Number(this.parent.price);

              return Number(value) <= price;
            },
          ),

      otherwise: (schema) => schema.notRequired(),
    }),

    thumbnail: Yup.mixed<File>().nullable(),
  });
};
