const fetch = require("node-fetch");
const puns = require("puns.dev");
const dotenv = require("dotenv");

dotenv.config();

async function send_secret_message() {
  const pun = puns.random();
  const message = `${pun.pun}\n${pun.punchline}`;

  const courier_options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.APIKEY,
    },
    body: JSON.stringify({
      message: {
        to: {
          email: process.env.EMAIL,
          phone_number: process.env.PHONENUMBER,
        },
        content: {
          title: "Very funny joke, please read!",
          body: message,
        },
        routing: {
          method: "all",
          channels: ["sms", "email"],
        },
      },
    }),
  };

  fetch("https://api.courier.com/send", courier_options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

send_secret_message();
