import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition duration-300">
                        MyBlog
                    </Link>
                    <div className="space-x-4">
                        <Link to="/signup">
                            <button type="button" className="py-2.5 px-5 text-sm font-medium text-purple-600 bg-white rounded-lg border border-purple-300 hover:bg-purple-50 hover:text-purple-700 focus:z-10 focus:ring-4 focus:ring-purple-200 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">Sign Up</button>
                        </Link>
                        <Link to="/signin">
                            <button type="button" className="py-2.5 px-5 text-sm font-medium text-white bg-purple-600 rounded-lg border border-purple-600 hover:bg-purple-700 focus:z-10 focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">Sign In</button>
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                <section className="relative overflow-hidden">
                    <div className="container mx-auto px-4 py-32 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-800 animate-fade-in-up">
                                Welcome to MyBlog
                            </h1>
                            <p className="text-xl md:text-2xl mb-12 text-gray-600 animate-fade-in-up animation-delay-300">
                                Discover amazing stories and insights
                            </p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 hover:text-white transition duration-300">&copy; 2024 MyBlog. All rights reserved.</p>
                        <div className="mt-4 md:mt-0 flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

