import { fetchOrganizationById } from './dataService';

const url = process.env.REACT_APP_API_URL;

export const sendEmail = async (emailData) => {
    try {
        console.log(`Sending email to: ${url}api/email/send`);
        const response = await fetch(`${url}api/email/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
};

export const composeAndSendAcceptEmail = async (managerInfo, marketerInfo, patientInfo) => {
    const managerOrganizationName = await fetchOrganizationById(managerInfo.organizationId);
    const marketerOrganizationName = await fetchOrganizationById(marketerInfo.organizationId);
  
    const emailContent = `
      Hello ${managerInfo.firstName} ${managerInfo.lastName},
  
      This is to inform you that your patient, ${patientInfo.firstName} ${patientInfo.lastName}, has been accepted by ${marketerInfo.firstName} ${marketerInfo.lastName} from ${marketerOrganizationName}.
  
      Manager Contact Information:
      - Name: ${managerInfo.firstName} ${managerInfo.lastName}
      - Organization: ${managerOrganizationName}
      - Email: ${managerInfo.email}
      - Phone: ${managerInfo.phoneNumber}

      Marketer Contact Information:
      - Name: ${marketerInfo.firstName} ${marketerInfo.lastName}
      - Organization: ${marketerOrganizationName}
      - Email: ${marketerInfo.email}
      - Phone: ${marketerInfo.phoneNumber}

      Feel free to contact each other to facilitate the patient transfer.

      If you have any questions regarding Pam's List, please reach out to Andrew Newport for assistance (andrew.newport@letpam.com).
  
      Regards,

      Pam's List by Let Pam
    `;
  
    await sendEmail({
      toEmails: [managerInfo.email, marketerInfo.email, "andrew.newport@letpam.com"],
      subject: `Acceptance of ${patientInfo.firstName} ${patientInfo.lastName}`,
      templateId: "your-template-id",
      templateData: {
        emailContent
      }
    });
  };

  export const composeAndSendInterestEmail = async (marketerInfo, patientInfo) => {
  
    const emailContent = `
      Hello ${marketerInfo.firstName} ${marketerInfo.lastName},
  
      Thank you for your interest in ${patientInfo.firstName} ${patientInfo.lastName}. Their clinical documents are being faxed to you.
  
      If you are interested in the patient, please click the "Accept" button on Pam's List.
      
      If you are not interested in the patient, you can click the "Reject" button to remove them from your list.

      If you have any questions regarding Pam's List, please reach out to Andrew Newport for assistance (andrew.newport@letpam.com).
  
      Regards,

      Pam's List by Let Pam
    `;
  
    await sendEmail({
      toEmails: [marketerInfo.email, "andrew.newport@letpam.com"],
      subject: `Interest in ${patientInfo.firstName} ${patientInfo.lastName}`,
      templateId: "your-template-id",
      templateData: {
        emailContent
      }
    });
  };