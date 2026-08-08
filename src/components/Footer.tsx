export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full max-w-6xl mx-auto px-6 md:px-8 py-8 mt-24 border-t border-white/10 bg-transparent text-zinc-500">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                {/* Left Side: Copyright */}
                <p className="text-zinc-500 text-center sm:text-left">
                    &copy; {currentYear} InvoiceFlow. All rights reserved.
                </p>

                {/* Right Side: Simple underlined link */}
                <p className="text-zinc-500">
                    Built by{" "}
                    <a
                        href="https://github.com/abdul-rahman-0x"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-all duration-200 underline decoration-zinc-800 hover:decoration-indigo-400 underline-offset-4 font-medium">
                        Abdul Rahman
                    </a>
                </p>
            </div>
        </footer>
    );
};
