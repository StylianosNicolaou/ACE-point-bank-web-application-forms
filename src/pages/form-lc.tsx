import { useState } from "react";
import FormInput from "@/components/forms/FormInput";
import FormSection from "@/components/forms/FormSection";
import FormTextarea from "@/components/forms/FormTextarea";

export default function FormLC() {
  const [form, setForm] = useState({
    applicantName: "",
    applicantAddress: "",
    applicantPhone: "",
    applicantFax: "",
    applicantEmail: "",
    contactPerson: "",
    amount: "",
    advisingBankName: "",
    advisingBankAddress: "",
    advisingBankSwift: "",
    beneficiaryName: "",
    beneficiaryAddress: "",
    beneficiaryPhone: "",
    beneficiaryFax: "",
    beneficiaryEmail: "",
    beneficiaryAccount: "",
    expirationDate: "",
    goodsDescription: "",
    latestShipmentDate: "",
    merchandiseDescription: "",
    shipmentFrom: "",
    shipmentTo: "",
    partialShipment: "Allowed",
    transshipment: "Allowed",
    incoterms: "FOB",
    shipmentBy: "SEA",
    invoiceNumber: "",
    invoiceDate: "",
    documentsRequired: "",
    isTransferable: "No",
    otherConditions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, formType: "L/C or Standby L/C" }),
    });

    const result = await response.json();
    alert(
      result.success ? "Form submitted successfully!" : "Submission failed."
    );
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-white text-black">
      <h1 className="text-2xl font-semibold mb-8 text-center">
        Application Form – LC or SBLC
      </h1>
      <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto">
      <FormSection title="Document Type">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="docType"
              value="Documentary LC"
              checked={form.docType === "Documentary LC"}
              onChange={handleChange}
            />
            <label className="text-sm">Documentary LC</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="docType"
              value="Standby LC"
              checked={form.docType === "Standby LC"}
              onChange={handleChange}
            />
            <label className="text-sm">Standby LC</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="docType"
              value="Letter of Guarantee"
              checked={form.docType === "Letter of Guarantee"}
              onChange={handleChange}
            />
            <label className="text-sm">Letter of Guarantee</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="docType"
              value="Other"
              checked={form.docType === "Other"}
              onChange={handleChange}
            />
            <label className="text-sm">Other</label>
          </div>

          {form.docType === "Other" && (
            <FormInput
              name="otherDocType"
              value={form.otherDocType || ""}
              onChange={handleChange}
              placeholder="Please specify"
            />
          )}
        </div>
      </FormSection>

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
            type="email"
            name="applicantEmail"
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

        <FormSection title="2. Amount of Financial Instrument">
          <FormInput
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="3. Currency">
          <FormInput
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="4. Advising Bank">
          <FormInput
            label="Name"
            name="advisingBankName"
            value={form.advisingBankName}
            onChange={handleChange}
          />
          <FormInput
            label="Address"
            name="advisingBankAddress"
            value={form.advisingBankAddress}
            onChange={handleChange}
          />
          <FormInput
            label="SWIFT CODE"
            name="advisingBankSwift"
            value={form.advisingBankSwift}
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

        <FormSection title="7. Description of Goods/Services">
          <FormTextarea
            name="goodsDescription"
            value={form.goodsDescription}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="8. Shipment Details">
          <FormInput
            label="Latest Shipment Date"
            type="date"
            name="latestShipmentDate"
            value={form.latestShipmentDate}
            onChange={handleChange}
          />
          <FormInput
            label="Shipment From"
            name="shipmentFrom"
            value={form.shipmentFrom}
            onChange={handleChange}
          />
          <FormInput
            label="Shipment To"
            name="shipmentTo"
            value={form.shipmentTo}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="9. Shipment Preferences">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Partial Shipment
              </label>
              <select
                name="partialShipment"
                value={form.partialShipment}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
              >
                <option value="Allowed">Allowed</option>
                <option value="Not Allowed">Not Allowed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Transshipment
              </label>
              <select
                name="transshipment"
                value={form.transshipment}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
              >
                <option value="Allowed">Allowed</option>
                <option value="Not Allowed">Not Allowed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Incoterms (2010)
              </label>
              <select
                name="incoterms"
                value={form.incoterms}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
              >
                <option value="FOB">FOB</option>
                <option value="CIF">CIF</option>
                <option value="CFR">CFR</option>
                <option value="DDP">DDP</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Shipment By
              </label>
              <select
                name="shipmentBy"
                value={form.shipmentBy}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
              >
                <option value="SEA">SEA</option>
                <option value="AIR">AIR</option>
                <option value="LAND">LAND</option>
              </select>
            </div>
          </div>
        </FormSection>

        <FormSection title="10. Pro Forma Invoice">
          <FormTextarea
            label="Merchandise Description"
            name="merchandiseDescription"
            value={form.merchandiseDescription}
            onChange={handleChange}
          />
          <FormInput
            label="Number"
            name="invoiceNumber"
            value={form.invoiceNumber}
            onChange={handleChange}
          />
          <FormInput
            label="Date"
            type="date"
            name="invoiceDate"
            value={form.invoiceDate}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="11. Documents Required">
          <FormTextarea
            name="documentsRequired"
            value={form.documentsRequired}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="12. Special Conditions">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                L/C Transferable
              </label>
              <select
                name="isTransferable"
                value={form.isTransferable}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <FormInput
              label="Other"
              name="otherConditions"
              value={form.otherConditions}
              onChange={handleChange}
            />
          </div>
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
