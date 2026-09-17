"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, handleLike } from "../services/blogs"

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

export const createBlog = async (prevState: BlogFormState, formData: FormData): Promise<BlogFormState> => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: NonNullable<BlogFormState["errors"]> = {}

  if (!title || title.length < 5){
    errors.title =  "Title must be at least 5 characters long"
  }
  if (!author || author.length < 5){
    errors.author =  "Author must be at least 5 characters long"
  }
  if (!url || url.length < 5){
    errors.url =  "Url must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
  return { errors, values: { title, author, url } }
}
  
  
  await addBlog(title, author, url)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const handleBlogLIke = async (formData: FormData) => {
  const id = formData.get("id")
  await handleLike(Number(id))
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")

}