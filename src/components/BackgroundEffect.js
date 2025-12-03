import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const BackgroundEffect = ({
    orb1Color = "bg-purple-500/5",
    orb2Color = "bg-purple-600/5",
    orb1Position = "top-20 left-20",
    orb2Position = "bottom-20 right-20",
    orb1Blur = "blur-3xl",
    orb2Blur = "blur-3xl",
    gradientFrom = "from-midnight-black",
    gradientVia = "via-purple-900/10",
    gradientTo = "to-midnight-black",
    className = ""
}) => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <div className={`absolute inset-0 z-0 overflow-hidden bg-midnight-black ${className}`}>
            {/* Linear Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b ${gradientFrom} ${gradientVia} ${gradientTo}`}></div>

            {/* Orbs */}
            <div className={`absolute ${orb1Position} w-96 h-96 ${orb1Color} rounded-full ${orb1Blur}`}></div>
            <div className={`absolute ${orb2Position} w-96 h-96 ${orb2Color} rounded-full ${orb2Blur}`}></div>

            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fullScreen: { enable: false },
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "grab",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            grab: {
                                distance: 140,
                                links: {
                                    opacity: 0.5
                                }
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: ["#3F45FF", "#5721C6", "#FF5F4D"],
                        },
                        links: {
                            color: "#C5C9FF",
                            distance: 150,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 60,
                        },
                        opacity: {
                            value: 0.3,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0"
            />
        </div>
    );
};

export default BackgroundEffect;
