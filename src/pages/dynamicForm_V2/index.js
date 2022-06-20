import React from "react";
import DefaultForm from "./DefaultForm";
import InlineForm from "./InlineForm";
export default function DynamicFormV2({ id }) {
  return <>{id === 2 ? <DefaultForm /> : <InlineForm />}</>;
}
