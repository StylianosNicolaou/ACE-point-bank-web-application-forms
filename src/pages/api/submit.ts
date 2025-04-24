import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

async function generatePDF(form: any) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontSize = 11;
  let y = height - 40;

  page.drawText(`${form.formType || "Application"} Form`, {
    x: 40,
    y,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  y -= 30;

  Object.entries(form).forEach(([key, value]) => {
    if (key === "formType") return;

    page.drawText(`${formatLabel(key)}: ${value || "-"}`, {
      x: 40,
      y,
      size: fontSize,
      font,
    });

    y -= 20;
    if (y < 50) {
      page = pdfDoc.addPage();
      y = height - 40;
    }
  });

  return await pdfDoc.save();
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

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
