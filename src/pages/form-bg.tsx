import { useState } from "react";
import FormInput from "@/components/forms/FormInput";
import FormSection from "@/components/forms/FormSection";
import FormTextarea from "@/components/forms/FormTextarea";

export default function FormBG() {
  const [form, setForm] = useState({
    applicantName: "",
    applicantAddress: "",
    applicantPhone: "",
    applicantFax: "",
    applicantEmail: "",
    contactPerson: "",
    amount: "",
    currency: "",
    beneficiaryBankName: "",
    beneficiaryBankAddress: "",
    beneficiaryBankSwift: "",
    beneficiaryName: "",
    beneficiaryAddress: "",
    beneficiaryPhone: "",
    beneficiaryFax: "",
    beneficiaryEmail: "",
    beneficiaryAccount: "",
    expirationDate: "",
    purpose: "",
    contractNumber: "",
    contractDate: "",
    documentsRequired: "",
    specialConditions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, formType: "Letter of Guarantee" }),
    });

    const result = await response.json();
    alert(
      result.success ? "Form submitted successfully!" : "Submission failed."
    );
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-white text-black">
      <h1 className="text-2xl font-semibold mb-8 text-center">
        Application Form – Letter of Guarantee
      </h1>
      <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto">
        <FormSection title="1. Applicant">
          <FormInput
            label="Name"
            name="applicantName"
            value={form.applicantName}
            onChange={handleChange}
          />
          <FormInput
            label="Address"
            name="applicantAddress"
            value={form.applicantAddress}
            onChange={handleChange}
          />
          <FormInput
            label="Phone"
            name="applicantPhone"
            value={form.applicantPhone}
            onChange={handleChange}
          />
          <FormInput
            label="Fax"
            name="applicantFax"
            value={form.applicantFax}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            name="applicantEmail"
            type="email"
            value={form.applicantEmail}
            onChange={handleChange}
          />
          <FormInput
            label="Contact Person"
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="2. Amount of Fin Instrument">
          <FormInput
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="3. Currency">
          <FormInput
            name="currency"
            value={form.currency}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="4. Beneficiary Bank">
          <FormInput
            label="Name"
            name="beneficiaryBankName"
            value={form.beneficiaryBankName}
            onChange={handleChange}
          />
          <FormInput
            label="Address"
            name="beneficiaryBankAddress"
            value={form.beneficiaryBankAddress}
            onChange={handleChange}
          />
          <FormInput
            label="SWIFT CODE"
            name="beneficiaryBankSwift"
            value={form.beneficiaryBankSwift}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="5. Beneficiary">
          <FormInput
            label="Name"
            name="beneficiaryName"
            value={form.beneficiaryName}
            onChange={handleChange}
          />
          <FormInput
            label="Address"
            name="beneficiaryAddress"
            value={form.beneficiaryAddress}
            onChange={handleChange}
          />
          <FormInput
            label="Phone"
            name="beneficiaryPhone"
            value={form.beneficiaryPhone}
            onChange={handleChange}
          />
          <FormInput
            label="Fax"
            name="beneficiaryFax"
            value={form.beneficiaryFax}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            name="beneficiaryEmail"
            value={form.beneficiaryEmail}
            onChange={handleChange}
          />
          <FormInput
            label="Account or IBAN"
            name="beneficiaryAccount"
            value={form.beneficiaryAccount}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="6. Expiration Date">
          <FormInput
            type="date"
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="7. Purpose of Instrument">
          <FormTextarea
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="8. Contract No. & Date / Pro Forma invoice & Date">
          <FormInput
            label="Number"
            name="contractNumber"
            value={form.contractNumber}
            onChange={handleChange}
          />
          <FormInput
            label="Date"
            type="date"
            name="contractDate"
            value={form.contractDate}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="9. Documents Required">
          <FormTextarea
            name="documentsRequired"
            value={form.documentsRequired}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="10. Special Conditions if any">
          <FormTextarea
            name="specialConditions"
            value={form.specialConditions}
            onChange={handleChange}
          />
        </FormSection>

        <div className="text-center mt-10">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </main>
  );
}
