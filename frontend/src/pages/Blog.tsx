import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog"
import { useBlog } from "../hook";
import { Spinner } from "../components/Spinner";
import AppBar from "../components/AppBar";

function Blog() {
    const { id } = useParams();
    if (!id) {
        return <div>Error: No blog ID provided.</div>;
    }
    const { blog, loading } = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            <AppBar />

            <div className="h-screen flex flex-col justify-center">

                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}

export default Blog