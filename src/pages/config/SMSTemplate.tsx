import { ConfigForm } from "@/components/ConfigForm";

const formFields = [
  {
    name: "templateName",
    label: "Template Name",
    type: "text" as const,
    placeholder: "Enter template name",
    defaultValue: "Investment Confirmation SMS",
    required: true,
  },
  {
    name: "templateType",
    label: "Template Type",
    type: "select" as const,
    placeholder: "Select template type",
    options: ["Welcome", "Investment Confirmation", "Security Alert", "Payment Reminder", "Two-Factor Auth"],
    defaultValue: "Investment Confirmation",
  },
  {
    name: "message",
    label: "SMS Message",
    type: "textarea" as const,
    placeholder: "Enter SMS message content (max 160 characters)",
    defaultValue: "Your investment of ${{amount}} in {{offer_name}} has been confirmed. Thank you for choosing Fintrio!",
  },
  {
    name: "senderName",
    label: "Sender Name",
    type: "text" as const,
    placeholder: "FINTRIO",
    defaultValue: "FINTRIO",
  },
  {
    name: "provider",
    label: "SMS Provider",
    type: "select" as const,
    placeholder: "Select SMS provider",
    options: ["Twilio", "AWS SNS", "MessageBird", "Plivo", "Nexmo"],
    defaultValue: "Twilio",
  },
  {
    name: "priority",
    label: "Priority Level",
    type: "select" as const,
    placeholder: "Select priority",
    options: ["Low", "Normal", "High", "Critical"],
    defaultValue: "Normal",
  },
  {
    name: "enableDeliveryReceipts",
    label: "Enable Delivery Receipts",
    type: "switch" as const,
    placeholder: "Track message delivery status",
    defaultValue: true,
  },
  {
    name: "enableOptOut",
    label: "Enable Opt-Out",
    type: "switch" as const,
    placeholder: "Include unsubscribe option",
    defaultValue: true,
  },
  {
    name: "isActive",
    label: "Active",
    type: "switch" as const,
    placeholder: "Enable this SMS template",
    defaultValue: true,
  },
];

export default function SMSTemplate() {
  return (
    <ConfigForm
      title="SMS Template"
      description="Configure SMS templates for mobile notifications and alerts."
      fields={formFields}
    />
  );
}