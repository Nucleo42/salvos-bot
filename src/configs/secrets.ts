import getEnv from "@shared/utils/getEnv";

export default {
  DISCORD_TOKEN: getEnv("DISCORD_TOKEN"),
  DISCORD_WEBHOOK_ERROR_URL: getEnv("DISCORD_WEBHOOK_ERROR_URL"),
};
