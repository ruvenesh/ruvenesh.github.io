document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const hoverTargets = document.querySelectorAll('a, button, .hover-target');

    if (window.innerWidth > 768) { // Only run on non-mobile
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            
            // Add a slight delay to the ring for a smooth trailing effect
            setTimeout(() => {
                cursorRing.style.left = e.clientX + 'px';
                cursorRing.style.top = e.clientY + 'px';
            }, 50);
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hovered');
            });
            target.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hovered');
            });
        });
    }


    // --- 2. tsParticles: Neural Network Configuration ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-js", {
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    resize: true,
                },
                modes: {
                    grab: { distance: 200, links: { opacity: 0.8, color: "#00ff41" } },
                },
            },
            particles: {
                color: { value: "#00ff41" },
                links: { color: "#00f0ff", distance: 120, enable: true, opacity: 0.2, width: 1 },
                move: { enable: true, speed: 1, outModes: { default: "bounce" }, random: true },
                number: { density: { enable: true, area: 800 }, value: 50 },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 2 } },
            },
            detectRetina: true,
        });
    }

    // --- 3. Typing Effect Function ---
    function startTypingEffect() {
        const typeWriterElements = [
            { id: 'typewriter-name', text: 'Ruvenesh Magandaran', speed: 60, delay: 0, applyGlitch: true },
            { id: 'typewriter-role', text: 'Software Engineer & ML Researcher', speed: 40, delay: 1500, applyGlitch: false },
            { id: 'typewriter-desc', text: 'Computer Science graduate building production machine learning and full-stack systems. Specialized in deepfake detection, scalable pipelines, and high-performance applications.', speed: 20, delay: 3000, applyGlitch: false }
        ];

        typeWriterElements.forEach(config => {
            const el = document.getElementById(config.id);
            if (el) {
                setTimeout(() => {
                    let i = 0;
                    function typeWriter() {
                        if (i < config.text.length) {
                            el.innerHTML += config.text.charAt(i);
                            i++;
                            setTimeout(typeWriter, config.speed);
                        } else if (config.applyGlitch) {
                            el.setAttribute('data-text', config.text);
                        }
                    }
                    typeWriter();
                }, config.delay);
            }
        });
        
        // Reveal buttons after typing is done
        gsap.to(".hero-buttons", { opacity: 1, y: 0, duration: 1, delay: 5.5, ease: "power2.out" });
    }

    // --- 4. Boot Sequence & Initial Load Animations ---
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const bootTimeline = gsap.timeline();
    const bootLines = document.querySelectorAll('.boot-text p');
    const bootAccess = document.querySelector('.boot-text h2');

    // Simulate boot text appearing
    bootLines.forEach((line, index) => {
        bootTimeline.to(line, { opacity: 1, duration: 0.1, delay: 0.3 });
    });

    // Flash "ACCESS GRANTED"
    bootTimeline.to(bootAccess, { opacity: 1, duration: 0.1, delay: 0.4 })
                .to(bootAccess, { opacity: 0, duration: 0.1 })
                .to(bootAccess, { opacity: 1, duration: 0.1 })
                .to(bootAccess, { opacity: 0, duration: 0.1 })
                .to(bootAccess, { opacity: 1, duration: 0.3 })
                
    // Slide boot screen up and reveal hero
    bootTimeline.to("#boot-sequence", { 
        y: "-100%", 
        duration: 0.8, 
        ease: "power4.inOut",
        onComplete: () => {
            // Once boot screen is gone, start Hero animations
            gsap.to(".gsap-hero", { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
            gsap.to(".gsap-hero-side", { opacity: 1, duration: 1, delay: 0.5 });
            startTypingEffect();
        }
    });

    // --- 5. GSAP Scroll Animations ---
    
    // Generic reveal for headers and text blocks
    gsap.utils.toArray('.gsap-reveal').forEach(elem => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // Trigger when element hits 85% down the viewport
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Staggered reveals for lists and cards (Experience, Projects, Certs)
    const staggerSections = [
        { trigger: ".experience-timeline-new", targets: ".gsap-stagger" },
        { trigger: ".project-grid", targets: ".gsap-stagger" },
        { trigger: ".cert-carousel", targets: ".gsap-stagger" },
        { trigger: ".education-timeline-new", targets: ".gsap-stagger" }
    ];

    staggerSections.forEach(section => {
        const triggerEl = document.querySelector(section.trigger);
        if (triggerEl) {
            const targets = triggerEl.querySelectorAll(section.targets);
            if (targets.length > 0) {
                gsap.to(targets, {
                    scrollTrigger: {
                        trigger: triggerEl,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out"
                });
            }
        }
    });

});