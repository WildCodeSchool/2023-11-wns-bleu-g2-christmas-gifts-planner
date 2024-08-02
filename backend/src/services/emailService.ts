import mailer from "../config/mailer";
import env from "../env";

export async function sendInvitationEmail(email: string) {
  await mailer.sendMail({
    subject: "Invitation à rejoindre Gifty",
    to: email,
    from: env.EMAIL_FROM,
    html: `<p>Bonjour, vous êtes invité à rejoindre notre plateforme Gifty.</p><br/><p>Gifty vous permets d'échanger des idées cadeaux avec vos amis ou votre famille.</p><br/><p>Pour compléter votre profil, cliquez sur ce lien: ${env.FRONTEND_URL}/profile</p>`,
  });
}

export async function sendAddedToGroupEmail(
  email: string,
  groupName: string,
  groupId: number
) {
  await mailer.sendMail({
    subject: "Vous avez été ajouté à un groupe",
    to: email,
    from: env.EMAIL_FROM,
    html: `<p>Bonjour, vous avez été ajouté au groupe ${groupName} sur Gifty.</p><br/><p>Vous pouvez maintenant échanger des idées cadeaux avec les membres de ce groupe.</p><br/><p>Pour voir le groupe, cliquez sur ce lien: ${env.FRONTEND_URL}/dashboard/${groupId}</p>`,
  });
}
