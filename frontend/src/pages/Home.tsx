import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white shadow-sm">
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        MyBlog
                    </Link>
                    <div className="space-x-4">

                        <Link to={`/signup`}>
                            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign Up</button>
                        </Link>

                        <Link to={`/singin`}>
                            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign In</button>
                        </Link>

                        {/* <Button variant="outline">Sign In</Button>
            <Button>Sign Up</Button> */}
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <div className="container mx-auto px-4 py-24 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to MyBlog</h1>
                        <p className="text-xl md:text-2xl mb-8">Discover amazing stories and insights</p>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p>&copy; 2024 MyBlog. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

