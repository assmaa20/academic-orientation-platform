import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv

load_dotenv()


def send_verification_email(email, prenom, token):

    sender = os.getenv("GMAIL_EMAIL")
    password = os.getenv("GMAIL_APP_PASSWORD")

    verification_url = (
        f"{os.getenv('FRONTEND_URL')}/verify/{token}"
    )
    print("Lien de vérification :", verification_url)

    message = MIMEMultipart("alternative")

    message["Subject"] = "Confirmation de votre compte OFM"

    message["From"] = sender

    message["To"] = email

    html = f"""
<html>
<body style="font-family:Arial;background:#f5f7fb;padding:40px;">

<div style="
max-width:600px;
margin:auto;
background:white;
padding:40px;
border-radius:15px;
">

<h2 style="color:#2563eb;">
Bienvenue sur Orientation Filière Maroc 🎓
</h2>

<p>Bonjour <b>{prenom}</b>,</p>

<p>
Merci pour votre inscription.
</p>

<p>
Cliquez sur le bouton ci-dessous pour activer votre compte.
</p>

<table cellspacing="0" cellpadding="0">

<tr>

<td
style="
background:#2563eb;
border-radius:8px;
"
>

<a
href="{verification_url}"
target="_blank"
style="
display:inline-block;
padding:15px 30px;
color:white;
font-weight:bold;
text-decoration:none;
"
>

Activer mon compte

</a>

</td>

</tr>

</table>

<br>

<p>

Si le bouton ne fonctionne pas, copiez ce lien :

</p>

<p>

<a href="{verification_url}">

{verification_url}

</a>

</p>

</div>

</body>
</html>
"""

    message.attach(
        MIMEText(html, "html")
    )

    try:

        with smtplib.SMTP(
            "smtp.gmail.com",
            587
        ) as server:

            server.starttls()

            server.login(
                sender,
                password
            )

            server.sendmail(
                sender,
                email,
                message.as_string()
            )

        print("✅ Email envoyé avec succès.")

    except Exception as e:

        print("Erreur Gmail :")

        print(e)