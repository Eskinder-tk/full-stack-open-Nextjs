import Link from "next/link";
import { getBlogs } from "../services/blogs";
import Form from 'next/form';


const Blogs = async ({searchParams}: { searchParams: Promise<{ filter?: string }> }) => {
    const {filter} = await searchParams
    const blogs = getBlogs()
    const filterText = filter?.toLowerCase() ?? "";

    const searchedBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filterText)
    );  
    
    const sortedBlogs = searchedBlogs.sort((a, b) => b.likes - a.likes);

    return (
        <div>
        <h2>Blogs</h2>
            <Form action="/blogs">
                <input type="text" name="filter" defaultValue={filter ?? ""} />
                <button type="submit">search</button> 
            </Form>
        <ul>
            {sortedBlogs.map(blog => (
            <li key={blog.id}>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                <div>Author: {blog.author}</div>    
                <div>Url: {blog.url}</div>
                <div>Likes: {blog.likes}</div>
            </li>
            ))}
        </ul>
        </div>
    )
}

export default Blogs