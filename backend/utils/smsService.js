let client = null;
let fromNumber = null;

try {
  const twilio = require("twilio");

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (accountSid && authToken) {
    client = twilio(accountSid, authToken);
  }
} catch (error) {
  console.warn("Twilio module is not installed. SMS notifications will be disabled.");
}

async function sendSms(to, body) {
  if (!client || !fromNumber) {
    console.warn(
      "SMS service is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_PHONE_NUMBER in .env to send SMS."
    );
    console.log("SMS to", to, "body:", body);
    return;
  }

  if (!to) {
    throw new Error("No destination phone number provided for SMS.");
  }

  return client.messages.create({
    body,
    from: fromNumber,
    to,
  });
}

module.exports = { sendSms };
