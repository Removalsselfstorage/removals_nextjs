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
      console.log("Welcome email sent successfully");
    } else {
      console.error("Failed to send welcome email:", response.data);
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const addContact = async (contactData) => {
  try {
    const response = await axios.post(
      //   'https://api.sendinblue.com/v3/smtp/email',
      "https://api.brevo.com/v3/contacts",
      {
        email: contactData.email,
        listIds: [6],
        attributes: {
          FIRSTNAME: contactData.firstName,
          LASTNAME: contactData.lastName,
          EMAIL: contactData.email,
          PHONE: contactData.phone,
          CALLCODE: contactData.phoneValue,
        },
      },

      {
        // body: JSON.stringify(contactData),
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          // accept: "application/json",
        },
      }
    );

    if (response.status === 201) {
      console.log("Contact added successfully");
    }
  } catch (error) {
    console.error("Error adding contact to Brevo:", error);
  }
};

export const progressEmail = async (toEmail, params) => {
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
        templateId: 2,
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
      console.log("Progress Email sent successfully");
    } else {
      console.error("Failed to send progress email:", response.data);
    }
  } catch (error) {
    console.error("Error sending progress email:", error);
  }
};

export const moversPageEmail = async (toEmail, params) => {
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
        templateId: 3,
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
      console.log("MoversPage Email sent successfully");
    } else {
      console.error("Failed to send MoversPage email:", response.data);
    }
  } catch (error) {
    console.error("Error sending MoversPage email:", error);
  }
};

export const checkoutPageEmail = async (toEmail, params) => {
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
        templateId: 7,
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
      console.log("MoversPage Email sent successfully");
    } else {
      console.error("Failed to send MoversPage email:", response.data);
    }
  } catch (error) {
    console.error("Error sending MoversPage email:", error);
  }
};

export const bookedEmail = async (toEmail, params) => {
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
        templateId: 8,
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
      console.log("MoversPage Email sent successfully");
    } else {
      console.error("Failed to send MoversPage email:", response.data);
    }
  } catch (error) {
    console.error("Error sending MoversPage email:", error);
  }
};

export const pickMoverEmail = async (toEmail, params) => {
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
        templateId: 9,
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
      console.log("pickMover email sent successfully");
    } else {
      console.error("Failed to send pickMover email:", response.data);
    }
  } catch (error) {
    console.error("Error sending pickMover email:", error);
  }
};

export const pickMoverEmail2 = async (toEmail, params) => {
  try {
    const response = await axios.post(
      //   'https://api.sendinblue.com/v3/smtp/email',
      "https://api.brevo.com/v3/smtp/email",
      {
        to: toEmail,
        // subject: subject,
        // htmlContent: message,
        sender: {
          email: "removalsselfstorage@gmail.com",
          name: "Removal and Self Storage",
        },
        templateId: 9,
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
      console.log("pickMover email sent successfully");
    } else {
      console.error("Failed to send pickMover email:", response.data);
    }
  } catch (error) {
    console.error("Error sending pickMover email:", error);
  }
};
