"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"

type registerForm = {
    errors?: {
      username?: string
      password?: string
      confirmPassword?: string
    }
    values: {
      username: string
      password: string
      confirmPassword: string
    }
  }

export const registerUser = async (prevState: registerForm, formData: FormData): Promise<registerForm> => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  const errors : NonNullable<registerForm["errors"]> = {}

  if (!(confirmPassword === password) ){
    errors.confirmPassword = "Password and confirmed password doesn't match!"
  }
  const SameUser = await db.query.users.findFirst({where: eq(users.username, username)})

  if (SameUser) {
    errors.username = "Username already exists."
  }
  if (!username || username.length < 4) {
    errors.username = "Username can't be less than 4 char."
  }
  if (!password || password.length < 4) {
    errors.password = "Password can't be less than 4 char."
  }

  if (Object.keys(errors).length > 0) {
  return { errors, values: { username, password, confirmPassword } }
}

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}