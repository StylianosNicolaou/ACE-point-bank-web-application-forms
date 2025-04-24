import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).json({ success: false });

  const form = req.body;

  const pdfBytes = await generatePDF(form);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const applicantName = form.applicantName?.replace(/\s+/g, "") || "applicant";
  const formTypeSlug = form.formType?.toLowerCase().includes("guarantee")
    ? "bg"
    : "lc";

  const mailOptions = {
    from: `"Point Bank LTD" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Submission: ${form.formType || "Application"}`,
    text: "Please find the attached PDF form submission.",
    attachments: [
      {
        filename: `${applicantName}_application_${formTypeSlug}.pdf`,
        content: pdfBytes,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ success: false });
  }
}

async function generatePDF(form: any) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage();
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const formType = (form.formType || "").toLowerCase();
  const sections = formType.includes("guarantee")
    ? getGuaranteeSections(form)
    : getLCSections(form);

  let y = height - 40;

  // Header title
  page.drawText(`${form.formType || "Application"} Form`, {
    x: 40,
    y,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  y -= 30;

  for (const section of sections) {
    // Section title
    page.drawText(section.title, {
      x: 40,
      y,
      size: 12,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
    y -= 18;

    for (const [label, value] of section.fields) {
      // Label (left aligned)
      page.drawText(`${label}:`, {
        x: 50,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });

      // Value (indented)
      page.drawText(`${value || "-"}`, {
        x: 200,
        y,
        size: 10,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });

      y -= 14;
    }

    // Space after section
    y -= 10;

    // Add new page if near bottom
    if (y < 80) {
      page = pdfDoc.addPage();
      y = height - 40;
    }
  }

  // Add Signature field
  if (y < 100) {
    page = pdfDoc.addPage();
    y = height - 40;
  }

  page.drawText("Signature & Stamp of the Applicant:", {
    x: 40,
    y: y - 20,
    size: 12,
    font,
  });

  page.drawLine({
    start: { x: 40, y: y - 80 },
    end: { x: 360, y: y - 80 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  return await pdfDoc.save();
}

function getLCSections(form: any) {
  return [
    {
      title: "1. Applicant",
      fields: [
        ["Name", form.applicantName],
        ["Address", form.applicantAddress],
        ["Phone", form.applicantPhone],
        ["Fax", form.applicantFax],
        ["Email", form.applicantEmail],
        ["Contact Person", form.contactPerson],
      ],
    },
    {
      title: "2. Amount of Fin Instrument",
      fields: [["Amount", form.amount]],
    },
    {
      title: "3. Advising Bank",
      fields: [
        ["Name", form.advisingBankName],
        ["Address", form.advisingBankAddress],
        ["SWIFT CODE", form.advisingBankSwift],
      ],
    },
    {
      title: "4. Beneficiary",
      fields: [
        ["Name", form.beneficiaryName],
        ["Address", form.beneficiaryAddress],
        ["Phone", form.beneficiaryPhone],
        ["Fax", form.beneficiaryFax],
        ["Email", form.beneficiaryEmail],
        ["Account or IBAN", form.beneficiaryAccount],
      ],
    },
    {
      title: "5–13. Shipment & Conditions",
      fields: [
        ["Expiration Date", form.expirationDate],
        ["Goods/Services", form.goodsDescription],
        ["Latest Shipment Date", form.latestShipmentDate],
        ["Shipment From", form.shipmentFrom],
        ["Shipment To", form.shipmentTo],
        ["Partial Shipment", form.partialShipment],
        ["Transshipment", form.transshipment],
        ["Incoterms (2010)", form.incoterms],
        ["Shipment By", form.shipmentBy],
      ],
    },
    {
      title: "14. Pro Forma Invoice",
      fields: [
        ["Merchandise Description", form.merchandiseDescription],
        ["Number", form.invoiceNumber],
        ["Date", form.invoiceDate],
      ],
    },
    {
      title: "15. Documents Required",
      fields: [["Please list here", form.documentsRequired]],
    },
    {
      title: "16. Special Conditions",
      fields: [
        ["L/C Transferable", form.isTransferable],
        ["Other", form.otherConditions],
      ],
    },
  ];
}

function getGuaranteeSections(form: any) {
  return [
    {
      title: "1. Applicant",
      fields: [
        ["Name", form.applicantName],
        ["Address", form.applicantAddress],
        ["Phone", form.applicantPhone],
        ["Fax", form.applicantFax],
        ["Email", form.applicantEmail],
        ["Contact Person", form.contactPerson],
      ],
    },
    {
      title: "2. Amount of Fin Instrument",
      fields: [["Amount", form.amount]],
    },
    {
      title: "3. Currency",
      fields: [["Currency", form.currency]],
    },
    {
      title: "4. Beneficiary Bank",
      fields: [
        ["Name", form.beneficiaryBankName],
        ["Address", form.beneficiaryBankAddress],
        ["SWIFT CODE", form.beneficiaryBankSwift],
      ],
    },
    {
      title: "5. Beneficiary",
      fields: [
        ["Name", form.beneficiaryName],
        ["Address", form.beneficiaryAddress],
        ["Phone", form.beneficiaryPhone],
        ["Fax", form.beneficiaryFax],
        ["Email", form.beneficiaryEmail],
        ["Account or IBAN", form.beneficiaryAccount],
      ],
    },
    {
      title: "6. Expiration Date",
      fields: [["Expiration Date", form.expirationDate]],
    },
    {
      title: "7. Purpose of Instrument",
      fields: [["Purpose", form.purpose]],
    },
    {
      title: "8. Contract No. & Date / Pro Forma Invoice",
      fields: [
        ["Number", form.contractNumber],
        ["Date", form.contractDate],
      ],
    },
    {
      title: "9. Documents Required",
      fields: [["Please list here", form.documentsRequired]],
    },
    {
      title: "10. Special Conditions",
      fields: [["Conditions", form.specialConditions]],
    },
  ];
}
