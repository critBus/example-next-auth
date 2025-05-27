"use client";
import React, { useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { newVerification } from "@/actions/new-verification";

import FormError from "./form-error";
import FormSuccess from "./form-success";
const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handlerSubmit = useCallback(() => {
    if (success || error) return;
    console.log(`token: ${token}`);
    if (token) {
      newVerification(token)
        .then((data) => {
          console.log(data);
          if (data.success) {
            console.log(`verification success: ${data.success}`);
          }
          setSuccess(data.success);
          if (data.error) {
            console.log(`verification error: ${data.error}`);
          }
          setError(data.error);
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
        });
    } else {
      setError("Missing token");
    }
  }, [token, success, error]);
  useEffect(() => {
    handlerSubmit();
  }, [handlerSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verifiaction"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        {!success && !error && <BeatLoader />}

        <FormError message={error ?? ""} />
        {!success && <FormSuccess message={success ?? ""} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
