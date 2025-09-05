import { ConfigForm } from "@/components/ConfigForm";

const formFields = [
  {
    name: "categoryName",
    label: "Category Name",
    type: "text" as const,
    placeholder: "Enter category name",
    defaultValue: "Investment Forms",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    placeholder: "Describe the purpose of this form category",
    defaultValue: "Forms related to investment onboarding and documentation",
  },
  {
    name: "sortOrder",
    label: "Sort Order",
    type: "number" as const,
    placeholder: "1",
    defaultValue: 1,
  },
  {
    name: "isActive",
    label: "Active Status",
    type: "switch" as const,
    placeholder: "Enable this category",
    defaultValue: true,
  },
  {
    name: "accessLevel",
    label: "Access Level",
    type: "select" as const,
    placeholder: "Select access level",
    options: ["Public", "Registered Users", "Verified Investors", "Admin Only"],
    defaultValue: "Registered Users",
  },
];

export default function FormCategory() {
  return (
    <ConfigForm
      title="Form Category"
      description="Configure form categories to organize and manage different types of forms."
      fields={formFields}
    />
  );
}