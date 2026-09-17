"use client"

import { registerUser } from "../actions/users"
import { useActionState } from "react"

export default function RegisterPage() {
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

  const initialState: registerForm = {
    errors: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    values: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  }

  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
           {state?.errors?.username && (
          <p style={{ color: "red" }}>{state.errors.username}</p>
        )}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
           {state?.errors?.password && (
          <p style={{ color: "red" }}>{state.errors.password}</p>
        )}
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" required />
          </label>
           {state?.errors?.confirmPassword && (
          <p style={{ color: "red" }}>{state.errors.confirmPassword}</p>
        )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}