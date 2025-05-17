import { ClientDiscord } from "./client";
import { EventsLoader } from "@loaders/eventsLoader";
import { CommandLoader } from "@loaders/commandsLoader";
import { ButtonsLoader } from "@loaders/buttonsLoader";
import { logger } from "./logging";
import { errorWebhookLogger } from "@shared/utils/errorWebhookLogger";

async function bootstrap() {
  try {
    const client = new ClientDiscord();

    const buttonsLoader = new ButtonsLoader(client);
    await buttonsLoader.registerButtons();

    const commandLoader = new CommandLoader(client);
    await commandLoader.registerCommands();

    const eventsLoader = new EventsLoader(client);
    await eventsLoader.registerEvents();

    await client.start();
  } catch (error) {
    logger.error("Error during bootstrap:", error);
  }

  process.on("uncaughtException", (error) => {
    logger.error({
      prefix: "uncaughtException",
      message: "Error on application: " + error,
    });
    errorWebhookLogger.send(
      `Error on application: ${error instanceof Error ? error.message : String(error)}`,
    );
  });

  process.on("unhandledRejection", (reason) => {
    logger.error({
      prefix: "unhandled-rejection",
      message: "Error on application: " + reason,
    });

    errorWebhookLogger.send(
      `Error on application: ${reason instanceof Error ? reason.message : String(reason)}`,
    );
  });
}

bootstrap();
