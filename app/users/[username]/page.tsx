import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithNotes } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithNotes(username)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>Author: {blog.author}</p>
            <p>Url: {blog.url}</p>
            <p>{blog.likes} likes</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage