import { ClientDiscord } from "./client";
import { EventsLoader } from "@loaders/eventsLoader";
import { CommandLoader } from "@loaders/commandsLoader";
import { ButtonsLoader } from "@loaders/buttonsLoader";

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

    console.log("Client started successfully.");
  } catch (error) {
    console.error("Error starting the client:", error);
  }
}

bootstrap();
