import React from 'react';
import FadeInSection from '../FadeAnimation/FadeInSection'; // Assuming this path
import { FaReact, FaNodeJs, FaDatabase, FaCss3Alt } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiExpress, SiMongodb } from 'react-icons/si';

const About = () => {
  return (
    <div className="w-full min-h-screen bg-neutral pt-24 pb-10 px-4 md:px-20 text-primary">
      

      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        
    
        <div className="lg:w-1/2 space-y-6">
          <FadeInSection>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              About <span className="text-accent">GoOds</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-light text-gray-500 mb-6">
              Where Fashion Meets Modern Web Technology
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                **GoOds** is a flagship e-commerce portfolio project designed to demonstrate 
                the power of the MERN stack. It bridges the gap between traditional 
                aesthetic appeal and robust technical architecture.
              </p>
              <p>
                This application was engineered from scratch using **MongoDB, Express, React, and Node.js**. 
                It features a dynamic frontend styled with **Tailwind CSS** for a fully responsive, 
                mobile-first experience.
              </p>
              <p>
                Beyond just code, GoOds represents my passion for building scalable, 
                user-centric applications that look as good as they perform.
              </p>
            </div>
          </FadeInSection>
        </div>

     
        <div className="lg:w-1/2  w-full h-[90vh] relative rounded-xl overflow-hidden shadow-2xl">
           <FadeInSection>
           
             <video 
                className="w-full h-full object- "
                src="/videos/202512201748.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
             />
         
             <div className="absolute inset-0 bg-black/10"></div>
           </FadeInSection>
        </div>
      </div>

  
      <FadeInSection>
        <div className="border-t border-gray-300 pt-16">
          <h3 className="text-3xl font-bold text-center mb-10">Tech Stack Used</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            {/* React */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <FaReact className="text-5xl text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">React.js</span>
            </div>

            {/* Tailwind */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <SiTailwindcss className="text-5xl text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Tailwind CSS</span>
            </div>

            {/* Node / Express */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="flex gap-1">
                 <FaNodeJs className="text-5xl text-green-600 group-hover:scale-110 transition-transform" />
                 <SiExpress className="text-5xl text-gray-700 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-semibold">Node & Express</span>
            </div>

            {/* MongoDB */}
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <SiMongodb className="text-5xl text-green-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">MongoDB</span>
            </div>

          </div>
        </div>
      </FadeInSection>

      {/* 3. Developer Note */}
      <div className="mt-20 text-center">
        <p className="italic text-gray-400">
          "Designed and Developed by Saad Ali"
        </p>
      </div>

    </div>
  );
};

export default About;