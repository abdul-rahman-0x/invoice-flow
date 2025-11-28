import { ReceiptText, Github, FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Ensure this is imported for the motion.div

const PRIMARY_COLOR_CLASS = 'text-indigo-400';

export const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState(false);

    // Function to scroll to the start of the form content
    const handleGenerateClick = () =>
    {
        // Target the motion.div containing the form content, which we'll give the ID 'form-start'
        const formStartElement = document.getElementById('form-start');

        if (formStartElement)
        {
            // Use 'start' to align the top of the element with the top of the viewport.
            // I will add a slight offset (subtracting 80px for the sticky navbar height)
            // by calculating the position manually instead of using scrollIntoView
            const yOffset = -80; // Compensate for the sticky navbar height (h-16 + some margin)
            const y = formStartElement.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });

        } else
        {
            // Fallback: scroll to the top of the document if the ID is missing
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsOpen(false); // Close mobile menu after click
    };

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-900/80 border-b border-gray-800 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo / Brand Name - Using the modern design */}
                <a href="#" className="flex items-center space-x-3 transition-opacity hover:opacity-90">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50">
                        <ReceiptText className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">InvoiceFlow</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <a
                        href="#"
                        className={`text-sm font-medium text-gray-400 hover:${PRIMARY_COLOR_CLASS} transition-colors`}
                        aria-label="Documentation"
                    >
                        Docs
                    </a>
                    {/* Primary CTA Button - Modern Gradient & Hover Effect */}
                    <Button
                        onClick={handleGenerateClick}
                        className="
        bg-gradient-to-r from-indigo-500 to-purple-500 
        text-white font-semibold 
        shadow-md shadow-indigo-500/50 
        hover:from-indigo-600 hover:to-purple-600 
        hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 hover:ring-offset-gray-900 
        transition-all duration-300
    "
                        size="sm"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Invoice
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1" // Added focus styles
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Content (Optimized for clean, compact look) */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3 space-y-2" // Reduced vertical padding
                >
                    <a
                        href="#"
                        onClick={() => setIsOpen(false)}
                        className={`block text-base font-medium text-gray-400 hover:${PRIMARY_COLOR_CLASS} transition-colors py-1.5 rounded-md px-2 hover:bg-gray-800`} // Added hover background for clarity
                    >
                        Documentation
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className={`block text-base font-medium text-gray-400 hover:${PRIMARY_COLOR_CLASS} transition-colors py-1.5 rounded-md px-2 hover:bg-gray-800 flex items-center space-x-2`}
                    >
                        <Github className="h-5 w-5" />
                        <span>GitHub Source</span>
                    </a>
                    {/* CTA button remains full width but is visually separated */}
                    <div className="pt-2 border-t border-gray-800 mt-2">
                        <Button
                            onClick={handleGenerateClick}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all duration-200"
                            size="lg" // Kept size large for easy tapping
                        >
                            <FileText className="h-5 w-5 mr-2" />
                            Generate Invoice
                        </Button>
                    </div>
                </motion.div>
            )}
        </header>
    );
};