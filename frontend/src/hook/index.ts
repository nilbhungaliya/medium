import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": string
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    // useEffect(() => {
    //     axios.get(`${BACKEND_URL}/api/v1/blog/get/id/${id}`, {
    //         headers: {
    //             Authorization: localStorage.getItem("token")
    //         }
    //     })
    //         .then(response => {
    //             setBlog(response.data.post);
    //             setLoading(false);
    //         })
    // }, [id])
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/id/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setBlog(response.data.post);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false); // Ensure loading state updates.
            }
        };

        fetchBlog();
    }, [id]);

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    // useEffect(() => {
    //     axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
    //         headers: {
    //             Authorization: localStorage.getItem("token")
    //         }
    //     })
    //         .then(response => {
    //             setBlogs(response.data.posts);
    //             setLoading(false);
    //         })
    // }, [])
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setBlogs(response.data || []); // Default to empty array if no posts.
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false); // Ensure loading state updates.
            }
        };

        fetchBlogs();
    }, []);

    return {
        loading,
        blogs
    }
}