import { ConfigForm } from "@/components/ConfigForm";

const formFields = [
  {
    name: "formName",
    label: "Form Name",
    type: "text" as const,
    placeholder: "Enter form name",
    defaultValue: "Standard Subscription Agreement",
    required: true,
  },
  {
    name: "formType",
    label: "Form Type",
    type: "select" as const,
    placeholder: "Select form type",
    options: ["Investor Subscription", "KYC/AML", "Accreditation", "Distribution Election"],
    defaultValue: "Investor Subscription",
  },
  {
    name: "version",
    label: "Version",
    type: "text" as const,
    placeholder: "1.0",
    defaultValue: "1.0",
  },
  {
    name: "templateContent",
    label: "Template Content",
    type: "textarea" as const,
    placeholder: "Enter form template content or HTML",
    defaultValue: "<h1>Subscription Agreement</h1>\n<p>This agreement is between...</p>",
  },
  {
    name: "isPublished",
    label: "Published",
    type: "switch" as const,
    placeholder: "Make this form available for use",
    defaultValue: false,
  },
  {
    name: "effectiveDate",
    label: "Effective Date",
    type: "text" as const,
    placeholder: "YYYY-MM-DD",
    defaultValue: "2024-01-01",
  },
  {
    name: "expirationDate",
    label: "Expiration Date",
    type: "text" as const,
    placeholder: "YYYY-MM-DD (optional)",
  },
];

export default function FormLibrary() {
  return (
    <ConfigForm
      title="Form Library"
      description="Manage your library of form templates and legal documents."
      fields={formFields}
    />
  );
}