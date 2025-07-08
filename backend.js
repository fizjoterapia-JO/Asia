const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

app.post("/api/book", async (req, res) => {
  const { name, phone, date, service } = req.body;

  const paymentUrl = `https://twojeplatnosci.pl/pay?amount=150&desc=${encodeURIComponent(service)}`;

  res.json({ paymentUrl });
});

function sendSMS(to, message) {
  const client = twilio("TWILIO_SID", "TWILIO_TOKEN");
  client.messages.create({
    body: message,
    from: "TwójNumerTwilio",
    to: to
  });
}

app.listen(3000, () => console.log("Server running on port 3000"));
