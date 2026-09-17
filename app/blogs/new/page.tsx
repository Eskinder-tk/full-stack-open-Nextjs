"use client"

import { createBlog } from "@/app/actions/blogs"
import { useActionState } from "react"

const NewBlog = () => {

  type BlogFormState = {
  errors?: {
    title?: string
    author?: string
    url?: string
  }
  values?: {
    title?: string
    author?: string
    url?: string
  }
}

const initialState: BlogFormState = {
  errors: {
    title: "",
    author: "",
    url: ""
  },
  values: {
    title: "",
    author: "",
    url: "",
  },
}

  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title:  
            <input type="text" name="title" defaultValue={state.values?.title} required />
          </label>
          {state?.errors?.title && (
          <p style={{ color: "red" }}>{state.errors.title}</p>
        )}
        </div>
        <div>
          <label>
            Author:
            <input type="text" name="author" defaultValue={state.values?.author} required />
          </label>
          {state?.errors?.author && (
          <p style={{ color: "red" }}>{state.errors.author}</p>
        )}
        </div>
        <div>
          <label>
            Url:   
            <input type="text" name="url" defaultValue={state.values?.url} required />
          </label>
          {state?.errors?.url && (
          <p style={{ color: "red" }}>{state.errors.url}</p>
        )}
        </div>
        
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog