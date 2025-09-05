import { ConfigForm } from "@/components/ConfigForm";

const formFields = [
  {
    name: "typeName",
    label: "Form Type Name",
    type: "text" as const,
    placeholder: "Enter form type name",
    defaultValue: "Investor Subscription",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select" as const,
    placeholder: "Select category",
    options: ["Investment Forms", "Compliance Forms", "Reporting Forms", "Administrative Forms"],
    defaultValue: "Investment Forms",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    placeholder: "Describe the purpose of this form type",
    defaultValue: "Form for new investor subscription and onboarding",
  },
  {
    name: "requiredFields",
    label: "Required Fields",
    type: "textarea" as const,
    placeholder: "List required fields (one per line)",
    defaultValue: "Full Name\nEmail Address\nPhone Number\nInvestment Amount",
  },
  {
    name: "autoSave",
    label: "Auto-Save Progress",
    type: "switch" as const,
    placeholder: "Automatically save form progress",
    defaultValue: true,
  },
  {
    name: "maxFileSize",
    label: "Max File Upload Size (MB)",
    type: "number" as const,
    placeholder: "10",
    defaultValue: 10,
  },
];

export default function FormType() {
  return (
    <ConfigForm
      title="Form Type"
      description="Define and configure different types of forms used in the system."
      fields={formFields}
    />
  );
}