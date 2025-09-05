import { ConfigForm } from "@/components/ConfigForm";

const formFields = [
  {
    name: "templateName",
    label: "Template Name",
    type: "text" as const,
    placeholder: "Enter template name",
    defaultValue: "Welcome to Fintrio",
    required: true,
  },
  {
    name: "templateType",
    label: "Template Type",
    type: "select" as const,
    placeholder: "Select template type",
    options: ["Welcome", "Investment Confirmation", "Distribution Notice", "KYC Reminder", "System Alert"],
    defaultValue: "Welcome",
  },
  {
    name: "subject",
    label: "Email Subject",
    type: "text" as const,
    placeholder: "Enter email subject line",
    defaultValue: "Welcome to Fintrio - Your Investment Journey Begins",
  },
  {
    name: "fromName",
    label: "From Name",
    type: "text" as const,
    placeholder: "Fintrio Team",
    defaultValue: "Fintrio Team",
  },
  {
    name: "fromEmail",
    label: "From Email",
    type: "email" as const,
    placeholder: "noreply@fintrio.com",
    defaultValue: "noreply@fintrio.com",
  },
  {
    name: "htmlContent",
    label: "HTML Content",
    type: "textarea" as const,
    placeholder: "Enter HTML email content",
    defaultValue: `<h1>Welcome to Fintrio!</h1>
<p>Dear {{investor_name}},</p>
<p>Welcome to our investment platform. We're excited to have you on board.</p>
<p>Best regards,<br>The Fintrio Team</p>`,
  },
  {
    name: "plainTextContent",
    label: "Plain Text Content",
    type: "textarea" as const,
    placeholder: "Enter plain text version",
    defaultValue: `Welcome to Fintrio!

Dear {{investor_name}},

Welcome to our investment platform. We're excited to have you on board.

Best regards,
The Fintrio Team`,
  },
  {
    name: "isActive",
    label: "Active",
    type: "switch" as const,
    placeholder: "Enable this email template",
    defaultValue: true,
  },
];

export default function EmailTemplate() {
  return (
    <ConfigForm
      title="Email Template"
      description="Create and manage email templates for automated communications."
      fields={formFields}
    />
  );
}