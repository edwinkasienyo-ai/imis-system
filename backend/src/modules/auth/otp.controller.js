// =======================
// TWILIO OTP CONTROLLER (optional)
// =======================
//
// This is the proper home for the Twilio OTP code that was previously
// mistakenly saved as the project's `.env` file.
//
// It is NOT wired into auth.routes.js by default — the default OTP path
// is the in-memory dev OTP (see auth.routes.js). When you want to send
// OTPs via real SMS/email through Twilio Verify, add the env vars below
// and import sendTwilioOtp from this file in auth.routes.js.
//
// Required env vars:
//   TWILIO_SID                 (Twilio Account SID, starts with AC...)
//   TWILIO_AUTH                (Twilio Auth Token)
//   TWILIO_SERVICE_ID          (Twilio Verify Service SID, starts with VA...)
//
// =======================

let twilioClient = null;

function getClient() {
  if (twilioClient) return twilioClient;
  if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH) {
    return null;
  }
  // Lazy require so the package is only loaded when actually used.
  // (twilio is NOT in package.json by default — install it if you need this.)
  // eslint-disable-next-line global-require
  const twilio = require("twilio");
  twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
  return twilioClient;
}

/**
 * Send an OTP via Twilio Verify.
 * @param {object} opts
 * @param {string} opts.to       E.164 phone number or email address
 * @param {"sms"|"email"} opts.channel
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
exports.sendTwilioOtp = async ({ to, channel }) => {
  const client = getClient();
  if (!client) {
    return {
      ok: false,
      message:
        "Twilio is not configured. Set TWILIO_SID, TWILIO_AUTH and " +
        "TWILIO_SERVICE_ID in .env to enable real SMS/email OTPs.",
    };
  }
  if (!process.env.TWILIO_SERVICE_ID) {
    return { ok: false, message: "TWILIO_SERVICE_ID is not configured." };
  }

  try {
    await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({
        to,
        channel: channel === "email" ? "email" : "sms",
      });
    return { ok: true, message: "OTP sent via Twilio" };
  } catch (err) {
    return { ok: false, message: err.message || "Twilio Verify error" };
  }
};
