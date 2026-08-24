import { FormikProps } from "formik";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { EditCourseFormValues } from "../types/course.type";

interface PricingSectionProps {
  formik: FormikProps<EditCourseFormValues>;
}

const PricingSection = ({ formik }: PricingSectionProps) => {
  const handleFreeChange = (checked: boolean) => {
    formik.setFieldValue("isFree", checked);

    formik.setFieldTouched("isFree", true, false);

    if (checked) {
      formik.setFieldValue("price", 0, false);

      formik.setFieldValue("discountPrice", 0, false);

      formik.setFieldTouched("price", false, false);

      formik.setFieldTouched("discountPrice", false, false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border bg-background p-6">
      <div>
        <h2 className="text-lg font-semibold">Pricing</h2>

        <p className="text-sm text-muted-foreground">
          Configure whether this course is free or paid.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-1">
          <Label htmlFor="isFree">Free Course</Label>

          <p className="text-sm text-muted-foreground">
            Students can enroll without payment.
          </p>
        </div>

        <Switch
          id="isFree"
          checked={formik.values.isFree}
          onCheckedChange={handleFreeChange}
        />
      </div>

      {!formik.values.isFree && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">
              Original Price
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter price"
              value={formik.values.price || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.price && formik.errors.price
                  ? "border-destructive"
                  : ""
              }
            />

            {formik.touched.price && formik.errors.price && (
              <p className="text-sm text-destructive">{formik.errors.price}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountPrice">Discount Price</Label>

            <Input
              id="discountPrice"
              name="discountPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Optional"
              value={formik.values.discountPrice || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.discountPrice && formik.errors.discountPrice
                  ? "border-destructive"
                  : ""
              }
            />

            {formik.touched.discountPrice && formik.errors.discountPrice && (
              <p className="text-sm text-destructive">
                {formik.errors.discountPrice}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection;
