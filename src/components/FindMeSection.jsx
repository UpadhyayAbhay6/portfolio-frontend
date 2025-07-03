import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Float, Text, Sparkles, Environment, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// 3D Floating Icon Component
const FloatingIcon = ({ position, children }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
        />
        {children}
      </mesh>
    </Float>
  );
};

// Social Media Icons SVG Components
const GitHubIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Main Find Me Section
const FindMeSection = () => {
  return (
    <section id="connectMe" className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 px-4 relative overflow-hidden">
      <Canvas
        className="absolute top-0 left-0 w-full h-full -z-10"
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <Sparkles
          count={200}
          scale={40}
          speed={1}
          size={3}
          color="#fbbf24"
        />
        <Environment preset="night" />
        
        {/* Floating 3D Elements */}
        <FloatingIcon position={[-4, 2, -5]} />
        <FloatingIcon position={[4, -2, -5]} />
        <FloatingIcon position={[0, 3, -8]} />
        
        {/* 3D Text */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={[0, 4, -2]}
            fontSize={1.2}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
          >
            Connect With Me
          </Text>
        </Float>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Find Me On
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Feel free to connect with me on these platforms
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center gap-8 md:gap-12"
        >
          {/* GitHub */}
          <motion.a
            href="https://github.com/upadhyayabhay6" // Replace with your GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group-hover:shadow-purple-500/25 group-hover:shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              
              <GitHubIcon className="w-16 h-16 md:w-20 md:h-20 text-white group-hover:text-purple-400 transition-colors duration-300 relative z-10" />
              
              {/* Floating particles */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <p className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                GitHub
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                @upadhyayabhay6
              </p>
            </motion.div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/abhay-upadhyay67"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative p-6 bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl shadow-2xl border border-blue-700 hover:border-cyan-500 transition-all duration-300 group-hover:shadow-cyan-500/25 group-hover:shadow-2xl">
         
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              
              <LinkedInIcon className="w-16 h-16 md:w-20 md:h-20 text-white group-hover:text-cyan-400 transition-colors duration-300 relative z-10" />
              
              <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <p className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                LinkedIn
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                /in/upadhyayabhay67
              </p>
            </motion.div>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>
          <div className="relative bg-gradient-to-br from-purple-900 to-pink-900 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FindMeSection;