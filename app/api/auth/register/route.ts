import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import fs from 'fs/promises'
import path from 'path'

interface User {
  id: string
  fullName: string
  email: string
  passwordHash: string
  createdAt: string
}

const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json')

async function readUsers(): Promise<User[]> {
  try {
    const fileContent = await fs.readFile(USERS_FILE_PATH, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8')
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password } = await req.json()

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      )
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      )
    }

    const users = await readUsers()

    // Check for existing email
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { error: 'This email is already registered.' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser: User = {
      id: crypto.randomUUID(),
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    await writeUsers(users)

    return NextResponse.json(
      { success: true, message: 'Account created successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

