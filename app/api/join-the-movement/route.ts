import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import fs from 'fs/promises'
import path from 'path'

interface Subscriber {
  id: string
  fullName: string
  email: string
  passwordHash: string
  hasConsented: boolean
  createdAt: string
}

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'subscribers.json')

async function ensureDataFileExists() {
  try {
    // Check if data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    try {
      await fs.access(dataDir)
    } catch {
      // Create data directory if it doesn't exist
      await fs.mkdir(dataDir, { recursive: true })
    }

    // Check if subscribers.json exists
    try {
      await fs.access(DATA_FILE_PATH)
    } catch {
      // Create subscribers.json with empty array if it doesn't exist
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2), 'utf-8')
    }
  } catch (error) {
    console.error('Error ensuring data file exists:', error)
    throw error
  }
}

async function readSubscribers(): Promise<Subscriber[]> {
  await ensureDataFileExists()
  const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
  return JSON.parse(fileContent)
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf-8')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, password, consent } = body

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    if (!consent || consent !== true) {
      return NextResponse.json(
        { error: 'You must agree to receive messages from BLACK' },
        { status: 400 }
      )
    }

    // Read existing subscribers
    const subscribers = await readSubscribers()

    // Check for duplicate email
    const existingSubscriber = subscribers.find(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    )

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already signed up' },
        { status: 409 }
      )
    }

    // Hash password with bcrypt (10 rounds)
    const passwordHash = await bcrypt.hash(password, 10)

    // Create new subscriber object
    const newSubscriber: Subscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      hasConsented: true,
      createdAt: new Date().toISOString(),
    }

    // Append new subscriber
    subscribers.push(newSubscriber)

    // Write back to file
    await writeSubscribers(subscribers)

    return NextResponse.json(
      { success: true, message: 'Successfully joined the movement!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing signup:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

