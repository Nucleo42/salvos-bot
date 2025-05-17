import { logger } from "@logging/index";
import secrets from "@configs/secrets";

class ErrorWebhookLogger {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = secrets.DISCORD_WEBHOOK_ERROR_URL;
  }

  private generateErrorEmbed(error: string) {
    return {
      embeds: [
        {
          title: "📦 Logs de error no bot `Salvos`",
          color: 0xed4245,
          fields: [
            {
              name: "Terminal Output",
              value: `\`\`\`js\n${this.truncateText(error, 1014)}\n\`\`\``,
            },
          ],
        },
      ],
    };
  }

  private truncateText(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit - 3) + "..." : text;
  }

  public async send(errorMessage: string): Promise<void> {
    const payload = this.generateErrorEmbed(errorMessage);

    try {
      const res = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        logger.error({
          prefix: "error-webhook",
          message: `Failed to send webhook: ${res.status} ${res.statusText}`,
        });
      } else {
        logger.info({
          prefix: "error-webhook",
          message: `Webhook sent successfully`,
        });
      }
    } catch (error: unknown) {
      logger.error({
        prefix: "error-webhook",
        message: `Exception while sending webhook: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }
}

export const errorWebhookLogger = new ErrorWebhookLogger();
