import { getUsernameById, updateUsername } from "@/lib/server/redisActions";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//  API response type
export type GetResponse = { username: string | null} | { error: string }
export type PostResponse = { success: true } | { error: string }

// Get api to retrive username
export async function GET(): Promise<NextResponse<GetResponse>> {
    try {
        const user = await currentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized'}, { status: 401 })
        }
        
        const username = await getUsernameById(user.id)
        return NextResponse.json({ username })
    } catch(error) {
        console.error("Error retriving username", error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Post api to update username
export async function POST(request: Request): Promise<NextResponse<PostResponse>> {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized'},
                { status: 401 }
            )
        }

        const { username } = await request.json()

        if(!username || typeof username === 'string') {
            return NextResponse.json(
                { error: "Username is required"},
                { status: 500 }
            )
        }

        const success = await updateUsername(user.id, username)
        if(!success) {
            return NextResponse.json(
                { error: 'Username has already taken' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        )
    } catch(error) {
        console.error("Error updating username", error)
        return NextResponse.json(
            { error: 'Invernal server error' },
            { status: 500 }
        )
    }

}