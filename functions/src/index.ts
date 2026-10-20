import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import cors from "cors";


// CORS middleware
const corsHandler = cors({ origin: true });

// 🔐 Replace with your Gmail and App Password
const GMAIL_USER = "sandramalilo21@gmail.com";
const GMAIL_PASS = "your-app-password-here"; // use Gmail App Password

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// Define the HTTPS Cloud Function
export const sendContactMessage = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send("Missing required fields.");
    }

    const mailOptions = {
      from: `"CoordeX Africa" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `🌸 New Contact Message from ${name} - ${subject || "No Subject"}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).send({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).send({ success: false, message: "Failed to send message." });
    }
  });
});
