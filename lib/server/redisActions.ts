import { upstashRedis } from "./redis";
import { z } from "zod";
import { PRIVATE_ROUTES } from "@/lib/routes";
import { ResumeDataSchema } from "../resume";

const REDIS_KEYS = {
  RESUME_PREFIX: "resume:", // using colon for redis conventions for namespacing
  USER_ID_PREFIX: "user:id:",
  USER_NAME_PREFIX: "user:name:",
} as const;

const FileSchema = z.object({
  name: z.string(),
  url: z.string().nullable(),
  size: z.number(),
  bucket: z.string(),
  key: z.string(),
});

const FORBIDDEN_USERNAME = PRIVATE_ROUTES;

// Resume schema
export const ResumeSchema = z.object({
  status: z.enum(["live", "draft"]).default("draft"),
  file: FileSchema.nullish(),
  fileContent: z.string().nullish(),
  resumeData: ResumeDataSchema.nullish(),
});

// type interference for the resume data
export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// funtion to get resume data for user
export async function getResume(userId: string): Promise<Resume | undefined> {
  try {
    const resume = await upstashRedis.get<Resume>(
      `${REDIS_KEYS.RESUME_PREFIX}${userId}`,
    );
    return resume || undefined;
  } catch (error) {
    console.error("Error retriving resume", error);
    throw new Error("Failed to retrive resume");
  }
}

export async function storeResume(
  userId: string,
  resumeData: Resume,
): Promise<void> {
  try {
    await upstashRedis.set(`${REDIS_KEYS.RESUME_PREFIX}${userId}`, resumeData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    console.log("Error storing resume", error);
    throw new Error("Failed to store resume");
  }
}
/**
 * create user with bidirectional lookups
 * @param userId unique user identifier
 * @param username unique user identifier
 * @return promise resolve to boolean indicating success
 */

export async function createUsernameLookup(
  userId: string,
  username: string,
): Promise<boolean> {
  if (FORBIDDEN_USERNAME.includes(username.toLocaleLowerCase())) {
    return false;
  }

  // check if username or useId already exists
  const [usernameExist, userIdExit] = await Promise.all([
    upstashRedis.exists(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`),
    upstashRedis.exists(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`),
  ]);

  if (usernameExist || userIdExit) {
    return false;
  }

  // Create mapping in both directions
  const transactions = upstashRedis.multi();
  transactions.set(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`, username);
  transactions.set(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`, userId);

  try {
    const result = await transactions.exec();
    return result.every((result) => result === "OK");
  } catch (error) {
    console.error("User creation failed", error);
    return false;
  }
}

/**
 * Retrive username by userId
 * @param userId userId to lookup
 * @returns promise resolve to uername or null
 */
export async function getUsernameById(userId: string): Promise<string | null> {
  return await upstashRedis.get(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`);
}

/**
 * Retrive userId by username
 * @param username username to lookup
 * @returns promise resolve in userId or null
 */
export async function getUserIdByUsername(
  username: string,
): Promise<string | null> {
  return await upstashRedis.get(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`);
}

/**
 * Check username availability by username
 * @param username username to lookup userId
 * @returns promise resolve in boolean
 */
export async function checkUsernameAvailability(username: string): Promise<{
  available: boolean;
}> {
  if (FORBIDDEN_USERNAME.includes(username.toLowerCase())) {
    return { available: false };
  }
  const userId = await getUserIdByUsername(username);
  return { available: !userId };
}

/**
 * Delete the user by userID or username
 * @param opt Object containing either username or userId
 * @returns promise resolves to boolean indicating success
 */

export async function deleteUser(opts: {
  userId?: string;
  username?: string;
}): Promise<boolean> {
  let userId: string | null = null;
  let username: string | null = null;

  // Determine the lookup method based on input
  if (opts.userId) {
    username = await getUsernameById(opts.userId);
    if (!username) {
      return false;
    }
    userId = opts.userId;
  } else if (opts.username) {
    userId = await getUserIdByUsername(opts.username);
    if (!userId) {
      return false;
    }
    username = opts.username;
  } else {
    return false;
  }

  // Delete both mappings
  const transactions = upstashRedis.multi();
  transactions.del(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`);
  transactions.del(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`);

  try {
    const result = await transactions.exec();
    return result.every((result: unknown) => result === 1);
  } catch (error) {
    console.error("User deletion failed", error);
    return false;
  }
}

/**
 * Update username for given userId
 * @param userId user id to update
 * @param newUsername new username
 * @returns Promise resolves to boolean indicating success
 */
export async function updateUsername(
  userId: string,
  newUsername: string,
): Promise<boolean> {
  // check if username is forbidden
  if (FORBIDDEN_USERNAME.includes(newUsername.toLowerCase())) {
    return false;
  }

  // get current username
  const currentUsername = await getUsernameById(userId);
  if (!currentUsername) {
    return false;
  }

  const transactions = upstashRedis.multi();
  transactions.del(`${REDIS_KEYS.USER_NAME_PREFIX}${currentUsername}`);
  transactions.set(`${REDIS_KEYS.USER_NAME_PREFIX}${newUsername}`, userId);
  transactions.set(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`, newUsername);

  try {
    const results = await transactions.exec();
    return results.every((result) => result === "OK" || result === 1);
  } catch (error) {
    console.error("Error updating username", error);
    return false;
  }
}
