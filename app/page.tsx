'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project, projects } from './data/projects';

interface AnimatedTextProps {
  text: string;
}

const AnimatedText = ({ text }: AnimatedTextProps) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.platforms.some(platform => platform.toLowerCase().includes(searchQuery.toLowerCase())) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const getStatusBadge = (project: Project) => {
    switch (project.status) {
      case 'coming_soon':
        return (
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Coming Soon
          </span>
        );
      case 'demo':
        return (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Demo Available
          </span>
        );
      default:
        return null;
    }
  };

  const renderProjectCard = (project: Project, index: number) => (
    <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transform transition duration-500 hover:scale-105 relative">
      {(project.status === 'coming_soon' || project.status === 'demo') && (
        <div className="absolute top-2 right-2 z-10 flex flex-col items-end">
          {getStatusBadge(project)}
          {project.releaseDate && (
            <span className="block mt-1 text-sm text-gray-600 dark:text-gray-400 text-right">
              {project.status === 'demo' ? 'Full Release: ' : ''}{project.releaseDate}
            </span>
          )}
        </div>
      )}
      
      <Image
        src={project.image.path}
        alt={`Screenshot of ${project.status === 'coming_soon' ? 'upcoming game' : 'the game'} '${project.title}'`}
        width={300}
        height={200}
        className={`w-full h-48 object-cover rounded-lg mb-4 ${project.status === 'coming_soon' ? 'filter brightness-75' : ''}`}
      />
      
      <h3 className="text-xl font-bold mb-2">
        {(project.status === 'released' && project.link) || (project.status === 'demo' && project.demoLink) ? (
          <a 
            href={project.status === 'demo' ? project.demoLink : project.link}
            className="hover:underline" 
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.title}
            {project.status === 'demo' && (
              <span className="ml-2 text-sm text-green-500">
                <i className="fas fa-gamepad"></i> Play Demo
              </span>
            )}
          </a>
        ) : (
          <span className={project.status === 'coming_soon' ? 'text-blue-500 dark:text-blue-400' : ''}>
            {project.title}
          </span>
        )}
      </h3>
      
      {project.description && (
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
      )}
      
      <p className="mb-2">Platforms:</p>
      <div className="flex justify-center space-x-2">
        {project.platforms.map((platform, pIndex) => (
          <div key={pIndex} className="tooltip">
            {platform === 'nintendo' ? (
              <svg 
                className={`w-8 h-8 ${project.status === 'coming_soon' ? 'opacity-75' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 0C3.8 0 0 3.8 0 8.5v7c0 4.7 3.8 8.5 8.5 8.5h7c4.7 0 8.5-3.8 8.5-8.5v-7C24 3.8 20.2 0 15.5 0h-7zm0 1.5h7c3.9 0 7 3.1 7 7v7c0 3.9-3.1 7-7 7h-7c-3.9 0-7-3.1-7-7v-7c0-3.9 3.1-7 7-7zm-1.5 2.5c-.8 0-1.5.7-1.5 1.5v13c0 .8.7 1.5 1.5 1.5h1.5V4H7zm7.5 0v15h1.5c.8 0 1.5-.7 1.5-1.5v-13c0-.8-.7-1.5-1.5-1.5H15zM9 5.5v13h1.5v-13H9zm4.5 0v13H15v-13h-1.5z"/>
              </svg>
            ) : (
              <i className={`fab fa-${platform} text-2xl ${project.status === 'coming_soon' ? 'opacity-75' : ''}`}></i>
            )}
            <span className="tooltiptext">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
              {project.status === 'coming_soon' ? ' (Planned)' : ''}
              {project.status === 'demo' ? ' (Demo)' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow relative">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-[800px] mx-auto relative flex justify-between items-center">
            <div className="flex-1 flex justify-center">
              <Image
                src="/Synnergy_Circle_Logo.png"
                alt="Synnergy Circle Games Logo"
                width={500}
                height={50}
                className="object-contain dark:invert"
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>

            <button 
              className="ml-4 text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200" 
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <section className="my-12 text-center welcome-animation" id="welcome">
          <h2 className="text-4xl font-bold mb-4">
            <AnimatedText text="Welcome to Synnergy Circle Games" />
          </h2>
          <p className="mb-6 fade-in text-gray-700 dark:text-gray-300" style={{ animationDelay: '1s' }}>
            We are a game development studio dedicated to creating immersive and engaging games for various platforms. 
            Explore our projects and get in touch with us!
          </p>
          <div className="flex justify-center items-center space-x-4 mt-8">
            <a
              href="https://store.steampowered.com/developer/synnergycirclegames"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-[#171a21] hover:bg-[#2a475e] text-white rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <i className="fab fa-steam text-2xl"></i>
              <span>Steam Page</span>
            </a>
            <a
              href="https://ko-fi.com/synnergycirclegames"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-heart text-2xl"></i>
              <span>Support Us</span>
            </a>
          </div>
        </section>

        <section className="my-12 text-center slide-up" id="projects">
          <h2 className="text-2xl font-bold mb-4">Our Projects</h2>
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects by name, platform, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
              <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => renderProjectCard(project, index))}
          </div>
          {filteredProjects.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400 mt-8">
              No projects found matching your search criteria.
            </p>
          )}
        </section>

        <section className="my-12 text-center slide-up" id="about">
          <div className="relative">
            <Image
              src="/banner.png"
              alt="Synnergy Circle Banner"
              width={1200}
              height={256}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group">
                <Image
                  src="/kyrodev.png"
                  alt="Kyrodev Icon"
                  width={256}
                  height={256}
                  className="h-full w-auto object-contain py-4"
                  style={{ maxHeight: "256px" }}
                />
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -bottom-10 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                  Leonardo Prado Cosenza &ldquo;Kyrodevs&rdquo;
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <i className="fas fa-history text-3xl mb-4 transition-colors duration-300 group-hover:text-blue-500"></i>
              <p className="mb-4">
                Synnergy Circle Games is a team of passionate game developers, designers, and storytellers. 
                Our mission is to create games that captivate and inspire players around the world. 
                With a focus on innovation and quality, we strive to push the boundaries of interactive entertainment.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <i className="fas fa-gamepad text-3xl mb-4 transition-colors duration-300 group-hover:text-blue-500"></i>
              <p className="mb-4">
                Synnergy Circle Games was created by Leonardo Prado Cosenza &ldquo;Kyrodevs&rdquo; in 2016. In 2017, we released our first commercial game called Alpacapaca Dash on Steam. 
                Throughout the years we focused on releasing more polished games, with better coding, art and marketing, 
                with the goal to one day become a reliable publisher, focusing on making Brazilian games shine. 
                Brazil has a lot of game enthusiasts and aspiring game developers and we know a lot of amazing games 
                could be born with a better opportunity.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <i className="fas fa-bullhorn text-3xl mb-4 transition-colors duration-300 group-hover:text-blue-500"></i>
              <p className="mb-4">
                With that goal in mind, we created a YouTube channel, met a lot of incredible people, 
                gained a little influence and recognition, and started a partnership with Microsoft to release games on Xbox. 
                After gaining more knowledge and experience we plan to start publishing other games from Brazil, 
                aside from Synnergy Circle Games.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-lg mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong><br />
                <a href="mailto:kyrodevs@synnergycircle.com.br" className="hover:text-blue-500 transition-colors">
                  kyrodevs@synnergycircle.com.br
                </a><br />
                <a href="mailto:leonardo@synnergycirclegames.com" className="hover:text-blue-500 transition-colors">
                  leonardo@synnergycirclegames.com
                </a><br /><br />
                <strong>Phone:</strong><br />
                <a href="tel:+5531988625213" className="hover:text-blue-500 transition-colors">
                  +55 (31) 98862-5213
                </a><br /><br />
                <strong>Address:</strong><br />
                Rua Artur Joviano, 65 – Cruzeiro<br />
                Belo Horizonte – MG, Brazil<br />
                30310270
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
              <div className="flex justify-center items-center space-x-4">
                <a href="https://x.com/syncirclegames" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8] transition-colors duration-300">
                  <i className="fab fa-twitter text-white text-xl"></i>
                </a>
                <a href="https://www.youtube.com/@synnergycirclegames745" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] hover:bg-[#d90000] transition-colors duration-300">
                  <i className="fab fa-youtube text-white text-xl"></i>
                </a>
                <a href="https://www.instagram.com/synergycircle/" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E1306C] hover:bg-[#c1295d] transition-colors duration-300">
                  <i className="fab fa-instagram text-white text-xl"></i>
                </a>
                <a href="https://discord.com/invite/fH3aGB8YMC" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5865F2] hover:bg-[#4752c4] transition-colors duration-300">
                  <i className="fab fa-discord text-white text-xl"></i>
                </a>
                <a href="https://store.steampowered.com/developer/synnergycirclegames" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center rounded-full bg-[#171a21] hover:bg-[#2a475e] transition-colors duration-300">
                  <i className="fab fa-steam text-white text-xl"></i>
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    Our Projects
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="https://store.steampowered.com/developer/synnergycirclegames" target="_blank" rel="noopener noreferrer"
                     className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    Steam Store
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
            <p>© {new Date().getFullYear()} Synnergy Circle Games. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Developed by{' '}
              <a 
                href="https://github.com/kleeedolinux/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                Klee
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
