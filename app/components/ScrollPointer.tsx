'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

export default function ScrollPointer() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouseX, setLastMouseX] = useState(0);
    const imageRef = useRef<HTMLImageElement>(null);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsClicked(true);
        setIsDragging(true);
        setLastMouseX(e.clientX);
    };

    const handleMouseUp = () => {
        setIsClicked(false);
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            const deltaX = e.clientX - lastMouseX;
            setRotation(prev => prev + deltaX * 0.5);
            setLastMouseX(e.clientX);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsDragging(false);
        setIsClicked(false);
    };

    return (
        <div className="relative flex justify-center">
            <button 
                onClick={scrollToAbout}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`
                    transition-all duration-300 ease-in-out
                    ${isHovered ? 'scale-110' : 'scale-100'}
                    ${isClicked ? 'scale-95' : ''}
                    animate-bounce
                    hover:animate-pulse
                    cursor-grab active:cursor-grabbing
                `}
                aria-label="Scroller vers la section À propos"
            >
                <Image
                    ref={imageRef}
                    src="/PepeClown.png"
                    alt="Pepe Clown - Cliquez pour scroller"
                    width={200}
                    height={200}
                    className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 drop-shadow-lg"
                    style={{
                        filter: isHovered ? 'brightness(1.2) saturate(1.3)' : 'brightness(1) saturate(1)',
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                        rotate: `${rotation}deg`,
                        transition: isDragging ? 'none' : 'all 0.3s ease-in-out',
                    }}
                />
            </button>
        </div>
    );
}