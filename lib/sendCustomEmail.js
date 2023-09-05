import axios from "axios";

// Replace with your SendinBlue API key
const apiKey = process.env.NEXT_PUBLIC_BREVO_API;

// Create a function to send a custom email
export const welcomeEmail = async (toEmail, params) => {
  try {
    const response = await axios.post(
      //   'https://api.sendinblue.com/v3/smtp/email',
      "https://api.brevo.com/v3/smtp/email",
      {
        to: [{ email: toEmail }],
        // subject: subject,
        // htmlContent: message,
        sender: {
          email: "removalsselfstorage@gmail.com",
          name: "Removal and Self Storage",
        },
        templateId: 1,
        params: params,
      },
      {
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
        },
      }
    );

    if (response.status === 201) {
      console.log("Email sent successfully");
    } else {
      console.error("Failed to send email:", response.data);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
