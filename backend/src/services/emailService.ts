import mailer from "../config/mailer";
import env from "../env";

export async function sendInvitationEmail(
  email: string,
  groupName: string,
  groupId: number,
  token: string | null,
  lastName: string,
  firstName: string
) {
  const profileUrl = `${env.FRONTEND_URL}/completeProfile?token=${token}`;
  const groupUrl = `${env.FRONTEND_URL}/dashboard/${groupId}`;
  const member = `${lastName} ${firstName}`;

  const htmlContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
        <p style="font-size: 16px; color: #555;">Bonjour,</p>
        <p style="font-size: 16px; color: #555;">
            ${member} vous a ajouté au groupe 
            <strong>${groupName}</strong> et vous invite à rejoindre notre plateforme <strong>Gifty</strong>.
        </p>
         <p style="font-size: 16px; color: #555;">
            Gifty vous permet de partager et découvrir des idées cadeaux avec vos amis
            et votre famille.
        </p>
        <p style="font-size: 16px; color: #555;">
            Pour commencer à échanger des idées, complétez votre profil en
            cliquant sur le lien ci-dessous :
        </p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="${profileUrl}" style="display: inline-block; padding: 8px 20px; font-size: 16px; color: #fff; background-color: #cc952e; text-decoration: none; border-radius: 50px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                Compléter mon profil
            </a>
        </div>
        <br />
        <p style="font-size: 16px; color: #555;">
            Une fois votre profil complété, vous pourrez voir le groupe en
            cliquant sur le lien suivant :
            <a href="${groupUrl}" style="color: #a10702; text-decoration: none;">
                Voir le groupe
            </a>
        </p>
        <p style="font-size: 16px; color: #555;">
            Nous sommes impatients de vous voir participer à la communauté Gifty !
        </p>
        <p style="font-size: 16px; color: #555; text-align: left;">
            Cordialement,<br />
            L'équipe Gifty
        </p>
        <br />
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #999;">
            <p>Vous recevez cet email car vous avez été invité à rejoindre Gifty.</p>
        </div>
    </div>`;
  await mailer.sendMail({
    subject: "Invitation à rejoindre Gifty",
    to: email,
    from: env.EMAIL_FROM,
    html: htmlContent,
  });
  console.info("Email sent successfully");
}

export async function sendAddedToGroupEmail(
  email: string,
  groupName: string,
  groupId: number,
  lastName: string,
  firstName: string
) {
  const groupUrl = `${env.FRONTEND_URL}/dashboard/${groupId}`;
  const member = `${lastName} ${firstName}`;
  const htmlContent = `
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
        <p style="font-size: 16px; color: #555;">Bonjour,</p>
        <p style="font-size: 16px; color: #555;">
            ${member} vous a ajouté au groupe <strong>${groupName}</strong> sur Gifty.
        </p>
        <p style="font-size: 16px; color: #555;">
            Vous pouvez maintenant échanger des idées cadeaux avec les membres de ce groupe.
        </p>
        <p style="font-size: 16px; color: #555;">
        Pour voir le groupe, cliquez ci-dessous :
        </p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="${groupUrl}" style="display: inline-block; padding: 8px 20px; font-size: 16px; color: #fff; background-color: #cc952e; text-decoration: none; border-radius: 50px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                Voir le groupe
            </a>
        </div>
        <br />
        <p style="font-size: 16px; color: #555; text-align: left;">
            Cordialement,
            <br />
            L'équipe Gifty
        </p>
        <br />
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #999;">
            <p>Vous recevez cet email car vous avez été ajouté au groupe ${groupName} sur Gifty.</p>
        </div>
    </div>
  `;
  await mailer.sendMail({
    subject: "Vous avez été ajouté à un groupe",
    to: email,
    from: env.EMAIL_FROM,
    html: htmlContent,
  });
  console.info("Email sent successfully");
}
