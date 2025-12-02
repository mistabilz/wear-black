import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE_PATH = path.join(process.cwd(), 'data', 'subscribers.json')

export async function GET() {
  try {
    // Check if file exists
    try {
      await fs.access(SUBSCRIBERS_FILE_PATH)
    } catch {
      // File doesn't exist, return empty array
      return NextResponse.json({ subscribers: [] })
    }

    // Read file
    const fileContent = await fs.readFile(SUBSCRIBERS_FILE_PATH, 'utf-8')
    const subscribers = JSON.parse(fileContent)

    // Return subscribers (without password hashes if any exist in old data)
    const sanitizedSubscribers = subscribers.map((sub: any) => ({
      id: sub.id,
      fullName: sub.fullName,
      email: sub.email,
      hasConsented: sub.hasConsented,
      createdAt: sub.createdAt,
    }))

    return NextResponse.json({ 
      subscribers: sanitizedSubscribers,
      count: sanitizedSubscribers.length 
    })
  } catch (error) {
    console.error('Error reading subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to load subscribers' },
      { status: 500 }
    )
  }
}

