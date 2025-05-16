//channels.ts
import getEnv from "@shared/utils/getEnv";

export default {
  linksChannel: getEnv("DISCORD_CHANNEL_LINKS", "1370503636106350662"),
};
