import { ConfigForm } from "@/components/ConfigForm";

const formFields = [
  {
    name: "documentName",
    label: "Document Name",
    type: "text" as const,
    placeholder: "Enter document name",
    defaultValue: "Subscription Agreement - Tech Growth Fund",
    required: true,
  },
  {
    name: "provider",
    label: "E-signature Provider",
    type: "select" as const,
    placeholder: "Select provider",
    options: ["DocuSign", "Adobe Sign", "HelloSign", "PandaDoc", "SignNow"],
    defaultValue: "DocuSign",
  },
  {
    name: "templateId",
    label: "Template ID",
    type: "text" as const,
    placeholder: "Provider template ID",
    defaultValue: "1234-5678-9012-3456",
  },
  {
    name: "signingOrder",
    label: "Signing Order",
    type: "select" as const,
    placeholder: "Select signing order",
    options: ["Sequential", "Parallel", "Custom"],
    defaultValue: "Sequential",
  },
  {
    name: "reminderFrequency",
    label: "Reminder Frequency (days)",
    type: "number" as const,
    placeholder: "3",
    defaultValue: 3,
  },
  {
    name: "expirationDays",
    label: "Document Expiration (days)",
    type: "number" as const,
    placeholder: "30",
    defaultValue: 30,
  },
  {
    name: "requireInPersonSigning",
    label: "Require In-Person Signing",
    type: "switch" as const,
    placeholder: "Require physical presence for signing",
    defaultValue: false,
  },
  {
    name: "enableAuditTrail",
    label: "Enable Audit Trail",
    type: "switch" as const,
    placeholder: "Track all document activities",
    defaultValue: true,
  },
];

export default function EsignDocument() {
  return (
    <ConfigForm
      title="E-sign Document"
      description="Configure electronic signature settings and document workflows."
      fields={formFields}
    />
  );
}