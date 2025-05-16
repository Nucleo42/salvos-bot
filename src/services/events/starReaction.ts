import {
  MessageReaction,
  User,
  Message,
  PartialMessageReaction,
  PartialUser,
} from "discord.js";
import { sendSavedToDMService } from "@services/common/sendSavedToDM";

export class StarReactionService {
  public async handleReaction(
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
  ): Promise<void> {
    const validReaction = await this.validateAndFetchReaction(reaction);
    if (!validReaction || !validReaction.message.guild) return;

    const message = validReaction.message as Message<boolean>;

    await sendSavedToDMService.execute(message, user, false);
  }

  private async validateAndFetchReaction(
    reaction: MessageReaction | PartialMessageReaction,
  ): Promise<MessageReaction | null> {
    if (!reaction.partial) return reaction;

    try {
      return await reaction.fetch();
    } catch (error) {
      console.error("Failed to fetch partial reaction:", error);
      return null;
    }
  }
}

export const starReactionService = new StarReactionService();
