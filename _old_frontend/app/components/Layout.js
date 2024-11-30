export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-12 min-h-screen">
            {/* Header */}
            <header className="col-span-12 bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">Logo</div>
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 rounded-md border border-gray-300"
                    />
                </div>
            </header>

            {/* Sidebar */}
            <aside className="col-span-2 bg-gray-100 p-4">
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="block text-gray-700 hover:text-blue-500">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block text-gray-700 hover:text-blue-500">
                                Appointments
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block text-gray-700 hover:text-blue-500">
                                Patients
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main */}
            <main className="col-span-7 bg-white p-4">
                {children}
            </main>

            {/* Right Section */}
            <section className="col-span-3 bg-gray-100 p-4 space-y-4">
                <div className="bg-white p-4 shadow rounded-md">
                    <h2 className="text-lg font-bold">Form Submit</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Enter details"
                            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="col-span-12 bg-gray-800 text-white text-center p-4">
                Footer
            </footer>
        </div>
    );
}
