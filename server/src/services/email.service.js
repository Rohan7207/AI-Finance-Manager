const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPasswordResetEmail(email, resetUrl) {
  const { data, error } = await resend.emails.send({
    from: "AI Finance Manager <onboarding@resend.dev>",
    to: [email],
    subject: "Reset your AI Finance Manager password",
    html: `
        <h2>Password Reset Request</h2>

      <p>
        We received a request to reset your AI Finance Manager password.
      </p>

      <p>
        Click the button below to reset your password.
      </p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>
        This link will expire in 15 minutes.
      </p>

      <p>
        If you didn't request this, you can safely ignore this email.
      </p>
        `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

module.exports = { sendPasswordResetEmail };
