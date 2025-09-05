import { ConfigForm } from "@/components/ConfigForm";

const formFields = [
  {
    name: "paymentProcessor",
    label: "Payment Processor",
    type: "select" as const,
    placeholder: "Select payment processor",
    options: ["Stripe", "Square", "PayPal", "Authorize.Net", "Braintree"],
    defaultValue: "Stripe",
  },
  {
    name: "merchantId",
    label: "Merchant ID",
    type: "text" as const,
    placeholder: "Enter merchant ID",
    defaultValue: "acct_1234567890",
    required: true,
  },
  {
    name: "apiKey",
    label: "API Key",
    type: "text" as const,
    placeholder: "Enter API key",
    defaultValue: "pk_test_...",
  },
  {
    name: "webhookUrl",
    label: "Webhook URL",
    type: "text" as const,
    placeholder: "https://your-domain.com/webhooks/payment",
    defaultValue: "https://fintrio.com/webhooks/payment",
  },
  {
    name: "enableRecurringPayments",
    label: "Enable Recurring Payments",
    type: "switch" as const,
    placeholder: "Allow subscription-based payments",
    defaultValue: true,
  },
  {
    name: "defaultCurrency",
    label: "Default Currency",
    type: "select" as const,
    placeholder: "Select default currency",
    options: ["USD", "EUR", "GBP", "CAD", "AUD"],
    defaultValue: "USD",
  },
  {
    name: "minimumAmount",
    label: "Minimum Transaction Amount",
    type: "number" as const,
    placeholder: "100",
    defaultValue: 100,
  },
  {
    name: "maximumAmount",
    label: "Maximum Transaction Amount",
    type: "number" as const,
    placeholder: "1000000",
    defaultValue: 1000000,
  },
  {
    name: "enableRefunds",
    label: "Enable Refunds",
    type: "switch" as const,
    placeholder: "Allow refund processing",
    defaultValue: true,
  },
];

export default function PaymentDetails() {
  return (
    <ConfigForm
      title="Payment Details"
      description="Configure payment processing settings and merchant account details."
      fields={formFields}
    />
  );
}