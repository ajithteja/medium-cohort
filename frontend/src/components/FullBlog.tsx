import { Blogs } from "../hooks"
import { Appbar } from "./Appbar"
import { Avator } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blogs }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 2nd Dec
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-500 text-xl">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex flex-col justify-center pr-4">
                            <Avator size={"small"} name={blog.author.name || "Anoymous"} />
                        </div>
                        <div className="">
                            <div className="text-slate-900 text-xl font-bold">
                                {blog.author.name || "Anoymous"}
                            </div>
                            <div>
                                Random catch phrase about the Random catch phrase about the Random catch phrase about the
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}