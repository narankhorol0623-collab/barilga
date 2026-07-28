'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AurelianEstatesPage() {
  const threejsContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Three.js 3D Skyscraper Animation
  useEffect(() => {
    const container = threejsContainerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear previous dynamic canvas if re-rendered
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Luxury Skyscraper Geometry Group
    const skyscraperGroup = new THREE.Group();

    const buildingMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a2b3c,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });

    const glassMaterial = new THREE.MeshPhongMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.4,
      shininess: 120,
    });

    const goldMaterial = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      shininess: 100,
    });

    // Main Tower
    const towerGeom = new THREE.BoxGeometry(2, 8, 2);
    const tower = new THREE.Mesh(towerGeom, buildingMaterial);
    skyscraperGroup.add(tower);

    // Glass Facade Details
    for (let i = 0; i < 10; i++) {
      const bandGeom = new THREE.BoxGeometry(2.1, 0.2, 2.1);
      const band = new THREE.Mesh(bandGeom, glassMaterial);
      band.position.y = -3.5 + i * 0.8;
      skyscraperGroup.add(band);
    }

    // Gold Accents
    const topGeom = new THREE.CylinderGeometry(0, 1.2, 2, 4);
    const top = new THREE.Mesh(topGeom, goldMaterial);
    top.position.y = 5;
    skyscraperGroup.add(top);

    scene.add(skyscraperGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x0b192c, 2, 100);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    camera.position.z = 12;
    camera.position.y = 2;

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      skyscraperGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Sticky Header Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 50) {
        nav.classList.add('py-2', 'shadow-lg');
        nav.classList.remove('py-4', 'shadow-sm');
      } else {
        nav.classList.add('py-4', 'shadow-sm');
        nav.classList.remove('py-2', 'shadow-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Card MouseMove Micro-interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="min-h-screen bg-[#071424] text-[#d7e3fa] font-sans overflow-x-hidden selection:bg-[#e9c349] selection:text-[#071424]">
      {/* Dynamic Inline Style for Custom Glass Effect & Scrollbar */}
      <style jsx global>{`
        :root {
          --gold-glow: rgba(233, 195, 73, 0.15);
        }
        .glass-card {
          background: rgba(11, 25, 44, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(233, 195, 73, 0.1);
        }
        .glass-card:hover {
          border-color: rgba(233, 195, 73, 0.6);
          box-shadow: 0 0 30px var(--gold-glow);
        }
        .champagne-gradient {
          background: linear-gradient(135deg, #e9c349 0%, #af8d11 100%);
        }
        .hero-text-shadow {
          text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* Top Navigation Bar */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-[#071424]/70 backdrop-blur-md border-b border-[#e9c349]/20 shadow-sm transition-all duration-300 py-4"
      >
        <div className="flex justify-between items-center px-6 md:px-20 py-0 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4">
            <img
              alt="Aurelian Estates Logo"
              className="h-10 w-10 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4C6WwuIdfjwDqdbeW0UW_xBYWzRkexCaW6AB27GhXETDjarXekA4HlSMpe3mgRNRlzGhEjVe96E-wdpeIO2tZObssBFr4Z999bo5sETGDrzN5cUtM08s-OG08ME7kuELw6nv_BHfWGfxxmkvl0IoKSypRIxLWJakZpEUJ39mlnwzczmzFtC9Dq9YfX0zW7Hzkx5nTnKv6mzc_TilJkwLKpN6eECy-Km1dCCSijNHhb5zE83G3Tqj_YOmetN7vkpvxivri3kfEWWdk"
            />
            <span className="font-serif text-2xl text-[#e9c349] tracking-tighter font-semibold">
              AURELIAN ESTATES
            </span>
          </div>
          <div className="hidden md:flex gap-10">
            <a
              href="#"
              className="text-xs font-semibold tracking-widest text-[#e9c349] border-b-2 border-[#e9c349] pb-1 uppercase active:scale-95 transition-all"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-xs font-semibold tracking-widest text-[#c5c6cd] hover:text-[#e9c349] transition-colors uppercase active:scale-95"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-xs font-semibold tracking-widest text-[#c5c6cd] hover:text-[#e9c349] transition-colors uppercase active:scale-95"
            >
              Contact
            </a>
          </div>
          <div className="flex gap-4">
            <button className="hidden lg:block px-6 py-2 text-xs font-semibold tracking-wider uppercase border border-[#e9c349] text-[#e9c349] hover:bg-[#e9c349]/10 transition-all duration-300">
              Admin Portal
            </button>
            <button className="px-6 py-2 text-xs font-semibold tracking-wider uppercase bg-[#e9c349] text-[#241a00] hover:opacity-90 transition-all duration-300 shadow-md">
              Resident Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Architectural backdrop */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071424]/40 via-transparent to-[#071424] z-10" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClVAxuDFabFZy6AOMEDT9eaaQdqHEVtkKvJLqIOjNvPz-toBCB8vrVVcvk1iYxFN8dhSDNAj9Bs3V01wKF6yYBwPoqQI4871yXV0jUtiDXrAMELzFBlDFxNHEJIRM0JicZnHZyKBrYRX8C4wFL3RvvBX3KjJBXeM9OXLm_xEi1-uMQBUX4E-zMdky104XSQDjtQctLuqewxSkTpZI4-S12Rqsd9m2VdDyfpBrAM3nQToEC_mCaGb62hPCqzEWGt9vVYWm-lwNuW6Fj')",
            }}
          />
        </div>

        {/* 3D Skyscraper Container */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div
            ref={threejsContainerRef}
            className="w-full h-full opacity-60 pointer-events-auto"
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-30 text-center px-4 max-w-4xl">
          <div className="glass-card inline-block p-10 md:p-16 rounded-lg">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#d7e3fa] hero-text-shadow mb-6 leading-tight">
              Architecting the <br />
              <span className="text-[#e9c349]">Future of Luxury</span>
            </h1>
            <p className="text-lg text-[#c5c6cd] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Where mathematical precision meets ethereal design. Discover a
              portfolio of residences defined by permanence, prestige, and
              unparalleled craftsmanship.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="px-10 py-4 champagne-gradient text-[#241a00] text-xs font-semibold rounded-sm tracking-widest uppercase hover:scale-105 transition-transform">
                Explore Residences
              </button>
              <button className="px-10 py-4 border border-[#e9c349]/30 text-[#d7e3fa] text-xs font-semibold rounded-sm tracking-widest uppercase hover:bg-white/5 backdrop-blur-sm transition-all">
                Our Philosophy
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Transition Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#071424] to-transparent z-40" />
      </header>

      {/* Project Showcase Section */}
      <section className="py-24 px-6 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#e9c349] text-xs font-semibold uppercase tracking-widest mb-4 block">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#d7e3fa] leading-tight">
              Defining the New <br /> Standard of Masonry
            </h2>
          </div>
          <p className="text-base text-[#808286] max-w-md leading-relaxed">
            Each Aurelian property is a bespoke sculptural masterpiece,
            designed to withstand the test of time while offering the ultimate
            in contemporary comfort.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Featured Project */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-8 group relative overflow-hidden glass-card rounded-md cursor-pointer h-[500px]"
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAplfd5luDMURE8iA4CBQLZQ_gtGrcfG_m0U-PFIcCALNjkpNxwLJqOlOGYSff9_BXC3H3OfPtiRgRti69a53YJ6FF8UVcaLq7KEqxDvw-UXJ_cVEmBt0oDRYTagH-1YBdoDXW1LHfq6o_dMGtRqBvdSVivgueRCP-hNg_FwQm2gGC76ddk4ZXKMlzCBeMo-Xx8o9IMpL-ffiKFnRl4bFLY0_1g_ZrO4p2z6qxB8GtOCzENIS_-sqaRQyO131I8E9_DjaAX4GkQERFL')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071424] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10 w-full">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6">
                <div>
                  <h3 className="font-serif text-3xl text-[#d7e3fa] mb-2 font-medium">
                    The Celestial Spire
                  </h3>
                  <p className="text-sm text-[#c5c6cd]">
                    Manhattan, NY — Penthouse Residence
                  </p>
                </div>
                <div className="flex gap-8 border-l border-[#e9c349]/30 pl-8">
                  <div>
                    <span className="block text-xs text-[#808286] uppercase tracking-wider">
                      Sq. Ft.
                    </span>
                    <span className="font-serif text-2xl text-[#e9c349] font-medium">
                      8,400
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-[#808286] uppercase tracking-wider">
                      Est. Value
                    </span>
                    <span className="font-serif text-2xl text-[#e9c349] font-medium">
                      $42M
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Project 1 */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-4 group relative overflow-hidden glass-card rounded-md cursor-pointer h-[500px]"
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBbPXOkCgPvSeQTFtAmlL2icqpSd8lmUxF9kVSuV7MFdEa2uT4E7KRlyztDi7uP7syLi1tW5UBhs0kFzbUB_SIeHwh3-DP-gXrB2Yr18yVETCC5hRWEtZiC7mp72akNn-clNi5yypEQPfkDA__YtSkJa77zMrufrgZrEVql52RFi8zi2d6vOZ_ju5EkOSvKSVh15UJryIwNJXYYZx7CFPt4Pru4syCLXrpe6jihA-D-rXVWuwXjKaRdooFgbjuJRCKeVCuxV7SCzi_')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071424] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="font-serif text-2xl text-[#d7e3fa] mb-1 font-medium">
                Aurelia Villa
              </h3>
              <p className="text-sm text-[#c5c6cd]">Aspen, CO</p>
            </div>
          </div>

          {/* Secondary Project 2 */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-4 group relative overflow-hidden glass-card rounded-md cursor-pointer h-[400px]"
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAuXdu4LmVAuuzixTRzm-fYYQLHCL5zaHRsV3Sd9jvY1lXkfJ6dAwjDyh8E_20lqEzCbEkrT5JTBFwAwbN81Sb31Js6dbQGCZZX_wBI5lpPZQ1MbIVb47g993hKD82iKc5i8W-Hh9-myVZFgI89rD8bhYGcA7XDkd5CiRQa1Q6SXSq78-iHqpAazthb4XodNrdpjL9NFFoIfHUI76yJvmAeRTgDxYlSSUUSSzmBOGGtgpJ3VNdF_ar4So_bbycWh73co6fG9gcHCb4')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071424] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="font-serif text-2xl text-[#d7e3fa] mb-1 font-medium">
                Glass Pavilion
              </h3>
              <p className="text-sm text-[#c5c6cd]">Malibu, CA</p>
            </div>
          </div>

          {/* Secondary Project 3 */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-8 group relative overflow-hidden glass-card rounded-md cursor-pointer h-[400px]"
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0O4UnsiREI5iwTlOpWOEJLk3ZYVS2GKsFDHf3_QWaMN1x0gMFHPilwlAT5UKdBNkNsqTyFx5BvBY_FObPIbQKPwH1lTLCjULwUcr5hsJY6K-ob2uTLwwNgzJDSBTB1Q1qz3NRklIcZAGu9deDIf40EwyGvC-kEOvyD9guG0EYuE_TIA5vinFH0ZPA2wYuVqdTXwm2hDmdPfH6LvlcX78frfLvIen-4G6M5G1_0okTT7vrBC7vUuMPiM1ecaAzTKXsefjo0YlUECxK')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071424] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10">
              <h3 className="font-serif text-3xl text-[#d7e3fa] mb-1 font-medium">
                The Onyx Cliff
              </h3>
              <p className="text-sm text-[#c5c6cd]">
                Aegean Coast — Private Estate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#101c2c] py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="border-r border-[#44474c]/20 last:border-0">
            <span className="block font-serif text-5xl font-bold text-[#e9c349] mb-2">
              12
            </span>
            <span className="text-xs text-[#808286] uppercase tracking-widest font-semibold">
              Global Offices
            </span>
          </div>
          <div className="border-r border-[#44474c]/20 last:border-0">
            <span className="block font-serif text-5xl font-bold text-[#e9c349] mb-2">
              $8.4B
            </span>
            <span className="text-xs text-[#808286] uppercase tracking-widest font-semibold">
              Portfolio Value
            </span>
          </div>
          <div className="border-r border-[#44474c]/20 last:border-0">
            <span className="block font-serif text-5xl font-bold text-[#e9c349] mb-2">
              45
            </span>
            <span className="text-xs text-[#808286] uppercase tracking-widest font-semibold">
              Awards Won
            </span>
          </div>
          <div className="border-r border-[#44474c]/20 last:border-0">
            <span className="block font-serif text-5xl font-bold text-[#e9c349] mb-2">
              100%
            </span>
            <span className="text-xs text-[#808286] uppercase tracking-widest font-semibold">
              Exclusivity
            </span>
          </div>
        </div>
      </section>

      {/* Newsletter / Contact CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#e9c349]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#d7e3fa] mb-8">
            Inquire About Our Exclusive Listings
          </h2>
          <p className="text-lg text-[#c5c6cd] mb-12 leading-relaxed">
            Join our private newsletter for early access to off-market
            properties and architectural insights from our lead design team.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="email"
              required
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-grow bg-transparent border-0 border-b border-[#8f9097] focus:ring-0 focus:border-[#e9c349] text-[#d7e3fa] text-xs font-semibold tracking-wider py-4 transition-all outline-none"
            />
            <button
              type="submit"
              className="px-10 py-4 champagne-gradient text-[#241a00] text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030f1e] w-full mt-auto border-t border-[#44474c]/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-20 py-12 max-w-[1440px] mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                alt="Aurelian Estates Logo"
                className="h-12 w-12 object-contain grayscale brightness-150"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4C6WwuIdfjwDqdbeW0UW_xBYWzRkexCaW6AB27GhXETDjarXekA4HlSMpe3mgRNRlzGhEjVe96E-wdpeIO2tZObssBFr4Z999bo5sETGDrzN5cUtM08s-OG08ME7kuELw6nv_BHfWGfxxmkvl0IoKSypRIxLWJakZpEUJ39mlnwzczmzFtC9Dq9YfX0zW7Hzkx5nTnKv6mzc_TilJkwLKpN6eECy-Km1dCCSijNHhb5zE83G3Tqj_YOmetN7vkpvxivri3kfEWWdk"
              />
              <span className="font-serif text-3xl text-[#e9c349] font-semibold">
                AURELIAN
              </span>
            </div>
            <p className="text-sm text-[#808286] max-w-xs leading-relaxed">
              Curating the world's most prestigious architectural landmarks
              since 1994.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs text-[#e9c349] uppercase tracking-widest font-semibold">
              Navigation
            </h4>
            <a
              href="#"
              className="text-xs text-[#808286] hover:text-[#e9c349] transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-xs text-[#808286] hover:text-[#e9c349] transition-colors"
            >
              Artisans
            </a>
            <a
              href="#"
              className="text-xs text-[#808286] hover:text-[#e9c349] transition-colors"
            >
              Investment Relations
            </a>
            <a
              href="#"
              className="text-xs text-[#808286] hover:text-[#e9c349] transition-colors"
            >
              Sustainability
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs text-[#e9c349] uppercase tracking-widest font-semibold">
              Legal & Press
            </h4>
            <a
              href="#"
              className="text-xs text-[#808286] hover:text-[#e9c349] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-[#808286] hover:text-[#e9c349] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-[#808286] hover:text-[#e9c349] transition-colors"
            >
              Press Kit
            </a>
          </div>
        </div>

        <div className="px-6 md:px-20 py-6 border-t border-[#44474c]/5 text-center">
          <p className="text-xs text-[#808286] opacity-50 uppercase tracking-[0.2em]">
            © 2026 Aurelian Estates. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}