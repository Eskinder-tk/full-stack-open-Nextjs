
const blogs = [
    {
        id: 1,
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://utexas.edus",
        likes: 12
    },
    {
        id: 2,
        title: "Yegetere kongo0",
        author: "Ekndle",
        url: "http://utexas.edus",
        likes: 69
    }
]

let nextId = 3

export const getBlogs = () => {
    return blogs
}

export const getBlogById = (id: number) => {
    return blogs.find(b => b.id === id)
}

export const addBlog = (title: string, author: string, url: string) => {
    blogs.push({id: nextId++, title, author, url, likes: 0})
}

export const handleLike = (id: number) => {
    const blog = blogs.find(b => b.id === id)
    if (blog) {
        blog.likes = blog.likes + 1
    }
}

