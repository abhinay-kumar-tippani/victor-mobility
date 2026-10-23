import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your message." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "tippaniabhinay@gmail.com";
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    console.log(`[CONTACT_FORM] Received enquiry from ${cleanName} (${cleanEmail}, ${cleanPhone})`);
    console.log(`[CONTACT_FORM] Routing to recipient: ${recipientEmail}`);

    const rawSmtpPass = process.env.SMTP_PASS;
    const smtpPass = rawSmtpPass ? rawSmtpPass.replace(/\s+/g, "") : undefined;
    const smtpUser = process.env.SMTP_USER || recipientEmail;
    const smtpHost = process.env.SMTP_HOST;

    if (smtpPass && (smtpHost || smtpUser.endsWith("@gmail.com") || smtpUser)) {
      // Configure transporter: use standard 'gmail' service if host is not specified, otherwise custom host
      const transporter = smtpHost
        ? nodemailer.createTransport({
            host: smtpHost,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          })
        : nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

      await transporter.sendMail({
        from: `"Victor Mobility Enquiry" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `New Contact Enquiry from ${cleanName} — Victor Mobility`,
        text: `Name: ${cleanName}\nPhone: ${cleanPhone}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #15162F; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #31326F; color: #ffffff; padding: 20px 24px;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Contact Enquiry — Victor Mobility</h2>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; width: 100px; color: #64748b;">Name:</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #15162F;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #64748b;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${cleanPhone}" style="color: #31326F; font-weight: 600; text-decoration: none;">${cleanPhone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 700; color: #64748b;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #31326F; font-weight: 600; text-decoration: none;">${cleanEmail}</a></td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Message / Requirement:</h3>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px; color: #1e293b;">${cleanMessage}</div>
              </div>
            </div>
            <div style="background-color: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
              Enquiry delivered to ${recipientEmail} via Victor Mobility Contact System.
            </div>
          </div>
        `,
      });
      console.log(`[CONTACT_FORM] Successfully dispatched live email to ${recipientEmail}`);
    } else {
      console.warn(
        `[CONTACT_FORM] SMTP_PASS not set in environment. Live email not dispatched. (Enquiry recorded in logs for ${recipientEmail})`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting Victor Mobility. We have received your enquiry, and a member of our team will get in touch with you soon.",
      responsePromise: "We usually respond within 24 hours",
      recipient: recipientEmail,
    });
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while sending your message. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
