import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { handleBlogLIke } from "@/app/actions/blogs"

const BlogPage = async ({params}: {params: Promise<{id: string}> }) => {
    const {id} = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>Author: {blog.author}</div>
            <div>Url: {blog.url}</div>
            <div>Likes: {blog.likes}</div>
            <form action={handleBlogLIke} >
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit">
                Like
            </button>
            </form>
        </div>
    )
}

export default BlogPage