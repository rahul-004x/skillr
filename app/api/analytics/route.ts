"use server"
import { upstashRedis } from "@/lib/server/redis";
import { unstable_cache } from "next/cache";
import { Resume } from "@/lib/server/redisActions";
import { NextResponse } from "next/server";

export type GetResponse =
  | {
      totalResume: number;
      publishedResume: number;
    }
  | { error: string };

const getCachedAnalytics = unstable_cache(
  async () => {
    let cursor = "0",
      totalCount = 0,
      publishedCount = 0;

    do {
      const [nextCursor, currentKeys] = await upstashRedis.scan(cursor, {
        match: "resume:*",
        count: 100,
      });

      cursor = nextCursor as string;

      if (currentKeys.length > 0) {
        totalCount += currentKeys.length;
        const resumes = (await Promise.all(
          currentKeys.map((key) => upstashRedis.get(key)),
        )) as (Resume | null)[];

        publishedCount += resumes.filter(
          (r): r is Resume => r?.status === "live",
        ).length;
      }
    } while (cursor !== "0");
    return {
      totalResume: totalCount,
      publishedResume: publishedCount,
    };
  },
  ["analytics"],
  {
    tags: ["analytics"],
    revalidate: 60,
  },
);

export async function GET(): Promise<NextResponse<GetResponse>> {
  try {
    const analytics = await getCachedAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error fetching resume analytics", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
