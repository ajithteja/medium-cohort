import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs()

    if (loading) {
        return <div>
        <Appbar />
        <div className="flex flex-col items-center">
            <BlogSkeleton size="small" />
            <BlogSkeleton size="small" />
            <BlogSkeleton size="small" />
            <BlogSkeleton size="small" />
            <BlogSkeleton size="small" />
        </div>
    </div>
    }

    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className=""> 
                {
                    blogs.map(eachBlog => <BlogCard  
                        id = {eachBlog.id}
                        authorName = {eachBlog.author.name || "A"}
                        title= {eachBlog.title} 
                        content = {eachBlog.content} 
                        publishedDate = {"2nd aug 2024"}
                    />)
                }
            </div>
        </div>
    </div>
}