import { LEX } from "@/store/types";
import { formatPhoneNumber } from "@/util";
import { useSignatureStore } from "@/store/store";

const LEXSignatures = ({
  name,
  position,
  email,
  phone,
  bookingLink,
  image,
  linkedin,
}: LEX, isLinkedIn:boolean): string => {
  const formattedPhone = formatPhoneNumber(phone);

  return `
  <html>
  <head>
      <title>${name} - LEX Reception</title>
      <meta charset="UTF-8">
  </head>
  
  <body style="font-family: Arial, Helvetica, sans-serif ; margin:0px;  background:#ffffff; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:313px;margin:0px;box-sizing: border-box; border-collapse: collapse; background-color:#ffffff">
          <tbody>
              <tr>
                  <td style="width: 125px;vertical-align: top;text-align:  right;">
                      <img src="${image}" width="125" height="156" style="width: 125px; height: 156px; font-size: 16px; color: #303030;" alt="${name}">
                  </td>
                  <td style="padding: 4px 0 0 24px;vertical-align: top;">
                      <p style="font-family: Arial, Helvetica, sans-serif ;color:#006EC8;font-size:20px;margin:0 0 4px;line-height: 24px;letter-spacing: 0.8px;"><b style="font-weight: 600">${name}</b></p>
                      <p style="font-family: Arial, Helvetica, sans-serif ;color:rgba(48, 48, 48, 0.6);font-size:16px;margin:0 0 10px;font-weight: 400;line-height: 18px;">${position}</p>
                      <hr width="44" style="width: 44px;border: 0; border-top: 1px solid #83838333;margin: 0 0 20px;max-width: 44px;">
                      <p style="margin:0 0 10px;font-family: Arial, Helvetica, sans-serif ;color: #303030;font-size:16px;font-weight: 400;line-height: 18px;"><img src="https://storage.googleapis.com/email_signature/generic_signature/lex_reception/images/email-2x.png" width="12" height="10" alt="Email icon" style="width: 12px; height: 10px;margin-right: 8px;font-size: 16px;color: #303030;"><a href="mailto:${email}" style="font-family: Arial, Helvetica, sans-serif ;color: #303030;font-size: 16px;font-weight: 400;line-height: 18px;text-decoration: none;cursor: pointer;">${email}</a></p>
                      <p style="margin:0 0 10px;font-family: Arial, Helvetica, sans-serif ;color: #303030;font-size:16px;font-weight: 400;line-height: 18px;"><img src="https://storage.googleapis.com/email_signature/generic_signature/lex_reception/images/phone-2x.png" width="12" height="12" alt="Phone icon" style="width: 12px; height: 12px;margin-right: 8px;font-size: 16px;color: #303030;"><a href="tel:+${formattedPhone}" style="font-family: Arial, Helvetica, sans-serif ;color: #303030;font-size: 16px;font-weight: 400;line-height: 18px;text-decoration: none; cursor: pointer;" target="_blank">${phone}</a></p>
                      <p style="margin:0 0 10px;font-family: Arial, Helvetica, sans-serif ;color: #303030;font-size:16px;font-weight: 400;line-height: 18px;"><img src="https://storage.googleapis.com/email_signature/with_picture/lex_reception/images/calendar-icon.png" width="12" height="13" alt="Calendar icon" style="width: 12px; height: 13px;margin-right: 8px;font-size: 16px;color: #303030;"><a href="${bookingLink}" style="font-family: Arial, Helvetica, sans-serif ;color: #303030;font-size: 16px;font-weight: 400;line-height: 18px;text-decoration: none; cursor: pointer;" target="_blank">Book Appointment</a></p>    
                      ${
                        isLinkedIn
                          ? `<p style="margin:0;font-family: Arial, sans-serif;color: #303030;font-size:14px;font-weight: 400;"><img src="https://storage.googleapis.com/email_signatures/LexReception/images/linkedin.png" width="12" height="12" alt="LinkedIn icon" style="width: 12px; height: 12px;margin-right: 8px;font-size: 14px;color: #303030;"><a href="${linkedin}" style="font-family: Arial, sans-serif;color: #303030;font-size:14px;font-weight: 400;line-height: 18px;text-decoration: none;" target="_blank">LinkedIn</a></p>`
                          : ""
                      }                   
                  </td>
              </tr>
          </tbody>
      </table>
    </body>
  </html>
  `;
};

export default LEXSignatures;
