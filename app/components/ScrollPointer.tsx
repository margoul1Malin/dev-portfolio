'use client';

import Image from "next/image";

export default function ScrollPointer() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative flex justify-center  ">
            <button 
                onClick={scrollToAbout}
                className="hover:scale-110 transition-transform duration-300 animate-bounce"
                aria-label="Scroller vers la section À propos"
            >
                <Image 
                    src="/PepeClown.png" 
                    alt="Scroll pour voir la suite" 
                    width={200} 
                    height={200} 
                    className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 hover:rotate-12 transition-transform duration-300"
                />
            </button>
        </div>
    );
}