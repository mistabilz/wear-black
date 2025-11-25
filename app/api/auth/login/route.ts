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

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    const users = await readUsers()

    // Find user
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // Create response with session cookie
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      },
      { status: 200 }
    )

    // Set simple session cookie (NOT production-secure)
    response.cookies.set('black_user', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

