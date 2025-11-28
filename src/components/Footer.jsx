import { useState, useCallback } from 'react';
import { FileText, Instagram, Linkedin, Github, Check, Mail } from "lucide-react";

// Updated constants
const PRIMARY_COLOR_CLASS = 'text-indigo-400';
const EMAIL_ADDRESS = 'abdulrahman161004@gmail.com';
const TOAST_DURATION = 3000;

export const Footer = () =>
{
    const currentYear = new Date().getFullYear();
    const [isCopied, setIsCopied] = useState(false);

    // Function to handle email copy functionality
    const handleCopyEmail = useCallback(async () =>
    {
        try
        {
            await navigator.clipboard.writeText(EMAIL_ADDRESS);
            setIsCopied(true);
            setTimeout(() =>
            {
                setIsCopied(false);
            }, TOAST_DURATION);
        } catch (err)
        {
            console.error('Failed to copy text: ', err);
        }
    }, []);

    return (
        // Ensured consistent width with Navbar's internal container (max-w-7xl)
        <footer className="relative mt-24  bg-gray-900 border-t border-gray-800 text-gray-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 ">

                {/* Main Content Grid - Divided into 3 Sections (1 large, 2 standard) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-10">

                    {/* Section 1: Brand Info (Takes 1/3 on large screens) */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            {/* MODERN GRADIENT LOGO */}
                            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white tracking-wide">InvoiceFlow</h3>
                        </div>
                        <p className="text-sm max-w-xs text-gray-400">
                            Simplifying invoicing for modern businesses and freelancers.
                        </p>
                    </div>

                    {/* Section 2: Project Resources (Takes 1/3) */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className={`hover:${PRIMARY_COLOR_CLASS} transition-colors text-sm`}>Documentation</a></li>
                            <li><a href="#" className={`hover:${PRIMARY_COLOR_CLASS} transition-colors text-sm`}>Open Source Repo</a></li>
                            <li><a href="#" className={`hover:${PRIMARY_COLOR_CLASS} transition-colors text-sm`}>Privacy Policy</a></li>
                            <li><a href="#" className={`hover:${PRIMARY_COLOR_CLASS} transition-colors text-sm`}>Support</a></li>
                        </ul>
                    </div>

                    {/* Section 3: Get In Touch (Takes 1/3) - NEW UI FOR EMAIL */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
                        <p className="text-sm mb-4 text-gray-400">
                            Interested in collaborating? Click to copy my email address.
                        </p>

                        {/* New Clean Click-to-Copy UI */}
                        <div className="relative group">
                            <button
                                onClick={handleCopyEmail}
                                aria-label="Copy email address to clipboard"
                                className={`
                                    w-full sm:w-auto flex items-center justify-between p-3 rounded-xl 
                                    bg-gray-800 border border-gray-700 
                                    text-white text-sm font-medium 
                                    transition-all duration-300 
                                    hover:border-indigo-600 hover:bg-gray-700/50 
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                                `}
                            >
                                <div className="flex items-center space-x-3">
                                    <Mail className={`h-5 w-5 ${isCopied ? 'text-green-400' : PRIMARY_COLOR_CLASS} transition-colors flex-shrink-0`} />
                                    <span className="font-mono text-sm break-all text-left">
                                        {EMAIL_ADDRESS}
                                    </span>
                                </div>
                                <span className={`
                                    ml-4 px-2 py-1 rounded-full text-xs font-semibold 
                                    ${isCopied ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 group-hover:bg-indigo-600'}
                                    transition-colors duration-300
                                `}>
                                    {isCopied ? 'COPIED!' : 'CLICK TO COPY'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar (Clean and Simple) */}
                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 text-center sm:text-left mb-4 sm:mb-0">
                        &copy; {currentYear} InvoiceFlow. All rights reserved.
                    </p>
                    <div className="flex space-x-2">
                        <a
                            href="https://github.com/ABDUL-RAHMAN-9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full text-gray-500 hover:text-white hover:bg-gray-800 transition-colors`}
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>

                        <a
                            href="https://www.instagram.com/dev_abdul_rahman/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full text-gray-500 hover:text-white hover:bg-gray-800 transition-colors`}
                            aria-label="Instagram"
                        >
                            {/* Assuming you have imported Instagram icon from lucide-react */}
                            <Instagram className="h-5 w-5" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/abdulrahman-in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full text-gray-500 hover:text-white hover:bg-gray-800 transition-colors`}
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copy to Clipboard Pop-up (Fully Working) */}
            {isCopied && (
                <div className="fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-50 transition-all duration-300 ease-out 
                                bg-[#151722] border border-[#2A2B3D] w-11/12 max-w-xs sm:max-w-sm 
                                animate-in fade-in slide-in-from-bottom-4">

                    <div className="flex items-start space-x-4 pr-4">
                        <div className="p-2 rounded-full bg-[#2A2B3D] flex-shrink-0">
                            <Check className="h-6 w-6 text-indigo-400 stroke-[3px]" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white mb-1">Copied to Clipboard!</p>
                            <p className="text-sm text-gray-400 font-mono break-all">{EMAIL_ADDRESS}</p>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-full rounded-b-xl overflow-hidden">
                        {/* Progress Bar (Requires custom CSS animation 'progress-shrink' to fully function) */}
                        <div
                            className="h-full bg-indigo-500"
                            style={{
                                animation: `progress-shrink ${TOAST_DURATION}ms linear forwards`
                            }}
                        ></div>
                    </div>
                </div>
            )}
        </footer>
    );
};