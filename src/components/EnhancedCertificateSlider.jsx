import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Certificate3D({ position, rotation, scale, certificate, onClick }) {
  const meshRef = useRef();


  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={onClick}
        onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
        onPointerOut={(e) => (document.body.style.cursor = 'auto')}
      >
        <planeGeometry args={[2, 1.2, 1]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
        
        <Text
          position={[0, 0.2, 0.01]}
          fontSize={0.12}
          color="#4F46E5"
          anchorX="center"
          anchorY="middle"
        >
          {certificate.title}
        </Text>
        
        <Text
          position={[0, -0.1, 0.01]}
          fontSize={0.08}
          color="#6366F1"
          anchorX="center"
          anchorY="middle"
        >
          {certificate.issuer}
        </Text>
        
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[2.05, 1.25]} />
          <meshStandardMaterial color="#8B5CF6" />
        </mesh>
      </mesh>
    </Float>
  );
}
export default function EnhancedCertificateSlider({selectedCert, setSelectedCert}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef();
    const [sidePadding, setSidePadding] = useState(0);
useEffect(() => {
  if (!sliderRef.current) return;

  const container = sliderRef.current;
  const items = container.querySelectorAll('.cert-card'); // mark cards with this class
  const currentItem = items[currentIndex];

  if (currentItem) {
    const containerWidth = container.offsetWidth;
    const itemOffsetLeft = currentItem.offsetLeft;
    const itemWidth = currentItem.offsetWidth;

    const scrollLeft = itemOffsetLeft - (containerWidth - itemWidth) / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }
}, [currentIndex]);

  const certificates = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      issuer: "Udemy",
      category: "DEVELOPMENT",
     thumbnail: '/certificates/web_dev_thumb.jpg',
    full: '/certificates/web_dev_full.jpg'
    },
    {
      id: 2,
      title: "GenAI Powered Data Analytics Job Simulation Certificate",
      issuer: "TATA (Forage)",
      category: "GenAI Powered Data Analytics",
      thumbnail: '/certificates/genai_thumb.jpg',
      full: '/certificates/genai_full.jpg'
    },
     {
      id: 3,
     title: "Data Analytics GeeksForGeeks Certificate",
      issuer: "GeeksForGeeks",
      category: "Data Analytics",
      thumbnail: '/certificates/genai_thumb.jpg',
      full: '/certificates/GFG_DA_CERTIFICATE.png'
    },
     {
      id: 4,
     title: "Data Analytics IBM Certificate",
      issuer: "IBM",
      category: "Data Analytics",
      thumbnail: '/certificates/genai_thumb.jpg',
      full: '/certificates/DA_python.png'
    },
     {
      id: 5,
     title: "Python IBM Certificate",
      issuer: "IBM",
      category: "Python for Data Science",
      thumbnail: '/certificates/genai_thumb.jpg',
      full: '/certificates/IBM_python.png'
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [certificates.length]);

  useEffect(() => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const itemWidth = 320;
      const gap = 40;
      const scrollLeft =(itemWidth + gap) * currentIndex - (container.offsetWidth - itemWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20 px-4 relative overflow-hidden">
      
      <Canvas className="absolute top-0 left-0 w-full h-full -z-10">
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        
        <Sparkles 
          count={500} 
          scale={100} 
          speed={2} 
          size={4} 
          color="#A855F7" 
        />
        
        <Environment preset="night" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        
        {certificates.map((cert, index) => (
          <Certificate3D
            key={cert.id}
            position={[
              (index - certificates.length / 2) * 3,
              Math.sin(index * 0.5) * 2,
              -5 + Math.cos(index * 0.3) * 2
            ]}
            rotation={[0, index * 0.2, 0]}
            scale={index === currentIndex ? [1.2, 1.2, 1.2] : [0.8, 0.8, 0.8]}
            certificate={cert}
            onClick={() => setSelectedCert(cert.full)}
          />
        ))}
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={[0, 4, -8]}
            fontSize={window.innerWidth < 640 ? 0.5 : 1}
            color="#F8FAFC"
            anchorX="center"
            anchorY="middle"
          >
            My Certifications
          </Text>
        </Float>
      </Canvas>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Professional Certifications
          </h2>
          
          <motion.div
            className="w-3/4 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full mx-auto mb-8 shadow-lg shadow-purple-500/50"
            initial={{ width: '0%' }}
            whileInView={{ width: '75%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="relative">
          <div
            ref={sliderRef}
 className="flex overflow-x-auto gap-6 py-8 px-4 scrollbar-hide snap-x snap-mandatory"
  style={{
    paddingLeft: `${sidePadding}px`,
    paddingRight: `${sidePadding}px`,
  }}
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 cursor-pointer group snap-center"
                onClick={() => setSelectedCert(cert.full)}
                animate={{
                  scale: index === currentIndex ? 1.05 : 0.95,
  opacity: index === currentIndex ? 1 : 0.7,
  y: index === currentIndex ? -10 : 0,
                }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -30,
                  rotateY: 10,
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500">
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {cert.category}
                    </span>
                  </div>
                  
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative">
                    <div className="text-6xl opacity-30">🏆</div>
                   
                    {/* {<img 
                      src={cert.thumbnail} 
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />} */}
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Issued by {cert.issuer}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all">
                      <span>View Certificate</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-400 scale-125 shadow-lg shadow-purple-400/50' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Certificate Preview</h3>
              <p className="text-gray-600">Certificate image will be displayed here</p>
              { <img 
                src={selectedCert} 
                alt="Certificate" 
                className="w-full max-h-[78vh] rounded-lg"
              /> }
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}