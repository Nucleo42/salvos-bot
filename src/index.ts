import { ClientDiscord } from "./client";
import { EventsLoader } from "@loaders/eventsLoader";
import { CommandLoader } from "@loaders/commandsLoader";
import { ButtonsLoader } from "@loaders/buttonsLoader";
import { logger } from "./logging";

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
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error({
      prefix: "unhandled-rejection",
      message: "Error on application: " + reason,
    });
  });
}

bootstrap();
