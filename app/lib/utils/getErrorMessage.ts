// utils/getErrorMessage.ts
export const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;

  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err
  ) {
    const error = err as {
      response?: {
        data?: { message?: string };
      };
    };

    return error.response?.data?.message || "Something went wrong";
  }

  return "Something went wrong";
};