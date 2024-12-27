import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"



function AppBar() {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to="/blogs" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition duration-300">
                MyBlog
            </Link>
            <div>
                <Link to={`/publish`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
                </Link>

                <Avatar size={"big"} name="Nil" />
            </div>
        </div>
    )
}

export default AppBar