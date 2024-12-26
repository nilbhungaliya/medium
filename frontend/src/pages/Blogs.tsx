import AppBar from "../components/AppBar"
import Blogcard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hook"

function Blogs() {
    const { blogs, loading } = useBlogs();
    if (loading) {
        return <div>
            <AppBar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <Blogcard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}

export default Blogs