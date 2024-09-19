import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number,
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
}



export const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-400 pb-4 mb-2 w-screen max-w-screen-md">
            <div className="display flex">
                <div className="flex justify-center flex-col" >
                    <Avator name = {authorName} size={"small"}/>
                </div>
                <div className="flex justify-center" >
                    <div className="font-light pl-2 flex justify-center" >
                        {authorName}
                    </div>
                    <div className="flex justify-center flex-col pl-2 pr-2 pt-1">
                        <Circle />
                    </div>
                    <div className="font-thin text-slate-500 flex justify-center" >
                        {publishedDate}
                    </div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minutes`}
            </div>
            
        </div>
    </Link>
}


export const Circle = () => {
    return <div className="h-1 w-1 rounded-full bg-slate-500" >

    </div>
}

export const Avator = ({ name, size }: { name:string, size: "small" | "big" }) => {
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? "text-sm" : "text-md"} font-medium text-gray-600 dark:text-gray-300"`}>{name[0]}</span>
    </div>
    
}