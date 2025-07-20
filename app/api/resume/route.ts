import { Resume, getResume, storeResume } from "@/lib/server/redisActions";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from 'zod'

// API Response type
export type GetResponse = { resume?: Resume } | { error: string }
export type PostResponse = { success: true } |
    { error: string; details?: z.ZodError['errors']}

// GET api to retrive resume
export async function GET(): Promise<NextResponse<GetResponse>> {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }
        const resume = await getResume(user.id)
        return NextResponse.json({ resume })
    } catch(error) {
        console.error('error retriving resume', error)
        return NextResponse.json(
            { error: 'Invernal server error' },
            { status: 500 }
        )
    }
};

// POST api endpoint to retrive resume
export async function POST(request: Request): Promise<NextResponse<PostResponse>> {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }
        const body  = await request.json()
        if (!body) {
            return NextResponse.json(
                { error: 'Resume required' }
            )
        }

        await storeResume(user.id, body)
        console.log('success')
        return NextResponse.json({ success: true})
    } catch(error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data format', details: error.errors},
                { status: 400 }
            )
        }
        console.error("Error storing resume", error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
