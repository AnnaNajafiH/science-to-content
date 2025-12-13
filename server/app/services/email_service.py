"""Email service for sending emails."""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings


class EmailService:
    """Service for sending emails."""

    async def send_email(
        self, to_email: str, subject: str, html_content: str, text_content: str = None
    ) -> bool:
        """
        Send an email.

        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML email body
            text_content: Plain text fallback

        Returns:
            True if sent successfully
        """
        if settings.ENVIRONMENT == "development" or not settings.SMTP_HOST:
            # Log instead of sending in development
            print(f"[EMAIL LOG] To: {to_email}")
            print(f"[EMAIL LOG] Subject: {subject}")
            print(f"[EMAIL LOG] Content: {html_content}")
            return True

        try:
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = settings.SMTP_FROM_EMAIL
            message["To"] = to_email

            if text_content:
                message.attach(MIMEText(text_content, "plain"))
            message.attach(MIMEText(html_content, "html"))

            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                if settings.SMTP_PASSWORD:
                    server.starttls()
                    server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)

                server.sendmail(settings.SMTP_FROM_EMAIL,
                                to_email, message.as_string())

            return True
        except Exception as e:
            print(f"[EMAIL ERROR] Failed to send to {to_email}: {e}")
            return False

    async def send_approval_notification(self, approver_email: str, content_id: int) -> bool:
        """Send notification that content is ready for review."""
        subject = f"Content #{content_id} Ready for Review"
        html = f"""
        <html>
            <body>
                <h2>Content Review Required</h2>
                <p>A new social media post is ready for your review:</p>
                <p><a href="http://localhost:3000/review-queue?content_id={content_id}">
                   Review Content
                </a></p>
            </body>
        </html>
        """
        return await self.send_email(approver_email, subject, html)

    async def send_brief_generated_notification(self, email: str, brief_id: int) -> bool:
        """Send notification that an internal brief has been generated."""
        subject = f"Internal Brief #{brief_id} Generated"
        html = f"""
        <html>
            <body>
                <h2>Brief Ready</h2>
                <p>Your requested internal brief has been generated:</p>
                <p><a href="http://localhost:3000/internal-brief-generator?brief_id={brief_id}">
                   View Brief
                </a></p>
            </body>
        </html>
        """
        return await self.send_email(email, subject, html)


email_service = EmailService()
