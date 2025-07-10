import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Float, Text, Sparkles, Cloud, Environment, ContactShadows, Sky, Sphere, Box, Torus, Dodecahedron } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './App.css';
import EnhancedCertificateSlider from './components/EnhancedCertificateSlider';
import CertificateCard from './components/CertificateCard';
import CertificateModal from './components/CertificateModal';
import profileImg2 from './assets/profile1.jpg';
import resume from './assets/CV_Abhay.pdf';
import FindMeSection from './components/FindMeSection';
import { Toaster, toast } from 'react-hot-toast';
import VoiceAssistant from './components/VoiceAssistant';
import VoiceTipsModal from './components/VoiceTipsModal';

const AnimatedSphere = ({ position, color, size = 1 }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Sphere>
    </Float>
  );
};

const AnimatedTorus = ({ position, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} args={[1, 0.4, 16, 100]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Torus>
    </Float>
  );
};

const AnimatedBox = ({ position, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 1.5) * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2.5}>
      <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </Box>
    </Float>
  );
};

const AnimatedDodecahedron = ({ position, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.015;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 1.2) * 0.6;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={3} floatIntensity={1.5}>
      <Dodecahedron ref={meshRef} args={[1]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.8} wireframe />
      </Dodecahedron>
    </Float>
  );
};

const ProfileScene = () => {
  return (
    <>
      <ambientLight intensity={0.8} color="#cbd5e1" />
      <directionalLight position={[4, 10, 4]} intensity={1.5} color="white" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4ecdc4" />
      
      <Stars radius={120} depth={60} count={8000} factor={8} fade speed={3} />
      
      <Sparkles
        count={500}
        scale={80}
        speed={2}
        size={4}
        color="#8be9fd"
      />
      
      <Cloud position={[0, 4, -12]} opacity={0.4} speed={0.8} />
      <Cloud position={[-8, 2, -15]} opacity={0.3} speed={0.6} />
      <Cloud position={[8, 6, -10]} opacity={0.35} speed={0.7} />
      
      <Environment preset="sunset" background />
      <Sky sunPosition={[100, 20, 100]} />
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.8}
        width={15}
        height={15}
        blur={2}
        far={5}
      />
      
      <AnimatedSphere position={[-6, 3, -8]} color="#ff6b6b" size={0.8} />
      <AnimatedSphere position={[6, -2, -6]} color="#4ecdc4" size={1.2} />
      <AnimatedTorus position={[-4, -3, -5]} color="#feca57" />
      <AnimatedTorus position={[5, 4, -7]} color="#a78bfa" />
      <AnimatedBox position={[-8, 1, -10]} color="#ff9ff3" />
      <AnimatedBox position={[7, -1, -9]} color="#54a0ff" />
      <AnimatedDodecahedron position={[0, 5, -12]} color="#5f27cd" />
      
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <Text
          position={[0, -4, 0]}
          fontSize={0.6}
          color="#8be9fd"
          anchorX="center"
          anchorY="middle"
        >
          Welcome to My Universe
        </Text>
      </Float>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </>
  );
};

const AboutScene = () => {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffeaa7" />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fdcb6e" />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#e17055" />
      
      <Sparkles
        count={300}
        scale={40}
        speed={1.5}
        size={3}
        color="#fd79a8"
      />
      
      <AnimatedSphere position={[-5, 2, -6]} color="#74b9ff" size={0.6} />
      <AnimatedSphere position={[5, -1, -4]} color="#00b894" size={0.8} />
      <AnimatedTorus position={[0, 3, -8]} color="#e84393" />
      <AnimatedBox position={[-3, -2, -5]} color="#a29bfe" />
      <AnimatedDodecahedron position={[4, 2, -7]} color="#fd79a8" />
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Text
          position={[0, 4, -3]}
          fontSize={0.8}
          color="#00b894"
          anchorX="center"
          anchorY="middle"
        >
          Skills & Passion
        </Text>
      </Float>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </>
  );
};

const ExperienceScene = () => {
  return (
    <>
      <ambientLight intensity={0.7} color="#55a3ff" />
      <directionalLight position={[3, 8, 3]} intensity={1.2} color="white" />
      <pointLight position={[8, -5, 8]} intensity={0.6} color="#00cec9" />
      
      <Sparkles
        count={400}
        scale={50}
        speed={2}
        size={3.5}
        color="#00cec9"
      />
      
      <AnimatedSphere position={[-4, 3, -5]} color="#6c5ce7" size={0.7} />
      <AnimatedSphere position={[6, -2, -6]} color="#fd79a8" size={0.9} />
      <AnimatedTorus position={[-6, 0, -8]} color="#fdcb6e" />
      <AnimatedTorus position={[3, 4, -4]} color="#00b894" />
      <AnimatedBox position={[0, -3, -7]} color="#e17055" />
      <AnimatedDodecahedron position={[-2, 5, -9]} color="#74b9ff" />
      <AnimatedDodecahedron position={[5, 1, -10]} color="#a29bfe" />
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
        <Text
          position={[0, 6, -2]}
          fontSize={0.7}
          color="#00cec9"
          anchorX="center"
          anchorY="middle"
        >
          Professional Journey
        </Text>
      </Float>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
    </>
  );
};

const ContactScene = () => {
  const FloatingCube = ({ position, color, size = 1, speed = 1 }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01 * speed;
        meshRef.current.rotation.y += 0.015 * speed;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
        meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3;
      }
    });

    return (
      <Float speed={speed} rotationIntensity={2} floatIntensity={3}>
        <Box ref={meshRef} args={[size, size, size]} position={position}>
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </Box>
      </Float>
    );
  };

  const FloatingIcosahedron = ({ position, color, size = 1 }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.z += 0.008;
        meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
      }
    });

    return (
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} position={position}>
          <icosahedronGeometry args={[size, 0]} />
          <meshStandardMaterial color={color} transparent opacity={0.7} wireframe />
        </mesh>
      </Float>
    );
  };

  return (
    <>
      <ambientLight intensity={0.4} color="#e0e7ff" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ec4899" />
      <pointLight position={[10, -5, 10]} intensity={0.6} color="#06b6d4" />
      <pointLight position={[-5, 10, -5]} intensity={0.5} color="#8b5cf6" />
      
      <Stars radius={150} depth={50} count={5000} factor={4} fade speed={2} />
      
      <Sparkles
        count={800}
        scale={100}
        speed={1.5}
        size={3}
        color="#06b6d4"
      />
      
      <Sparkles
        count={400}
        scale={60}
        speed={2}
        size={2}
        color="#ec4899"
      />
      
      <FloatingCube position={[-8, 2, -6]} color="#ec4899" size={0.8} speed={1.2} />
      <FloatingCube position={[8, -1, -4]} color="#06b6d4" size={1.2} speed={0.8} />
      <FloatingCube position={[-6, -3, -8]} color="#8b5cf6" size={0.6} speed={1.5} />
      <FloatingCube position={[6, 4, -5]} color="#10b981" size={0.9} speed={1.1} />
      
      <FloatingIcosahedron position={[-4, 5, -10]} color="#f59e0b" size={1} />
      <FloatingIcosahedron position={[5, -4, -7]} color="#ef4444" size={0.8} />
      <FloatingIcosahedron position={[0, 2, -12]} color="#06b6d4" size={1.2} />
      
      <AnimatedSphere position={[-10, 0, -8]} color="#ec4899" size={0.7} />
      <AnimatedSphere position={[10, 3, -6]} color="#8b5cf6" size={0.9} />
      <AnimatedSphere position={[0, -5, -9]} color="#06b6d4" size={0.5} />
      
      <AnimatedTorus position={[-7, -2, -7]} color="#10b981" />
      <AnimatedTorus position={[7, 2, -9]} color="#f59e0b" />
      
      <Cloud position={[-12, 6, -15]} opacity={0.3} speed={0.5} />
      <Cloud position={[12, -2, -12]} opacity={0.4} speed={0.7} />
      <Cloud position={[0, 8, -18]} opacity={0.25} speed={0.6} />
      
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[0, 8, -5]}
          fontSize={1.2}
          color="#06b6d4"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Let's Connect
        </Text>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[0, -8, -3]}
          fontSize={0.6}
          color="#ec4899"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Ready to Build Something Amazing?
        </Text>
      </Float>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </>
  );
};

const CustomToast = ({ message }: { message: string }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: '0%',
      transition: { duration: 4, ease: 'linear' },
    });
  }, [controls]);

  return (
    <div className="p-4 bg-white rounded shadow-lg text-green-700 font-semibold w-72">
      {message}
      <motion.div
        initial={{ width: '100%' }}
        animate={controls}
        className="h-1 mt-2 bg-green-400 rounded"
      />
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent | { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('http://localhost:5000/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.custom(() => <CustomToast message="SMS sent successfully!" />, {
          duration: 4000,
        });
      } else {
        toast.error(result.message || 'Failed to send SMS.');
      }
    } catch (error) {
      toast.error('Failed to send SMS. Please try again later.');
      console.error('SMS error:', error);
    }
    setFormData({ name: '', phone: '', email: '', message: '' });
    setIsSending(false);
  };

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const itemWidth = 320;
      const scrollLeft = itemWidth * currentIndex - container.offsetWidth / 2 + itemWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <div className="App font-sans">
      <nav className="sticky top-0 bg-gradient-to-r from-purple-900 via-blue-800 to-black text-white p-4 z-50 shadow-md animate__animated animate__fadeInDown">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.1, color: "#8be9fd" }}
            transition={{ duration: 0.3 }}
          >
            Abhay
          </motion.div>

          <div className="hidden md:flex gap-6">
            <motion.a href="#profile" className="hover:text-pink-400" whileHover={{ scale: 1.1 }}>My Profile</motion.a>
            <motion.a href="#about" className="hover:text-yellow-300" whileHover={{ scale: 1.1 }}>About Me</motion.a>
            <motion.a href="#experience" className="hover:text-green-300" whileHover={{ scale: 1.1 }}>Experience</motion.a>
            <motion.a href="#certifications" className="hover:text-purple-300" whileHover={{ scale: 1.1 }}>Achievements</motion.a>
            <motion.a href="#contact" className="hover:text-blue-300" whileHover={{ scale: 1.1 }}>Contact Me</motion.a>
            <motion.a href="#connectMe" className="hover:text-green-300" whileHover={{ scale: 1.1 }}>ConnectWithMe</motion.a>
            <motion.a href={resume} download className="text-cyan-300 hover:text-cyan-100" whileHover={{ scale: 1.1 }}>Download Resume</motion.a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="focus:outline-none transition-transform duration-300">
              <motion.svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
            overflow: isMobileMenuOpen ? 'visible' : 'hidden',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="md:hidden flex flex-col gap-4 px-2 mt-4 bg-gradient-to-r from-purple-900 via-blue-800 to-black text-white"
        >
          <motion.a href="#profile" className="hover:text-pink-400" onClick={() => setIsMobileMenuOpen(false)} whileHover={{ x: 10 }}>My Profile</motion.a>
          <motion.a href="#about" className="hover:text-yellow-300" onClick={() => setIsMobileMenuOpen(false)} whileHover={{ x: 10 }}>About Me</motion.a>
          <motion.a href="#experience" className="hover:text-green-300" onClick={() => setIsMobileMenuOpen(false)} whileHover={{ x: 10 }}>Experience</motion.a>
          <motion.a href="#certifications" className="hover:text-purple-300" onClick={() => setIsMobileMenuOpen(false)} whileHover={{ x: 10 }}>Achievements</motion.a>
          <motion.a href="#contact" className="hover:text-blue-300" onClick={() => setIsMobileMenuOpen(false)} whileHover={{ x: 10 }}>Contact Me</motion.a>
          <motion.a href="#connectMe" className="hover:text-green-300" onClick={() => setIsMobileMenuOpen(false)} whileHover={{ x: 10 }}>ConnectWithMe</motion.a>
          <motion.a href={resume} download className="text-cyan-300 hover:text-cyan-100" onClick={() => setIsMobileMenuOpen(false)} whileHover={{ x: 10 }}>Download Resume</motion.a>
        </motion.div>
      </nav>

      <Toaster position="top-right" reverseOrder={false} />

      <section
        id="profile"
        className="h-screen relative bg-gradient-to-br from-black via-indigo-900 to-gray-900 text-white overflow-hidden"
      >
        <Canvas
          className="absolute top-0 left-0 w-full h-full !z-0"
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0f172a');
          }}
        >
          <ProfileScene />
        </Canvas>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <motion.img
            src={profileImg2}
            alt="Abhay"
            className="w-40 h-40 rounded-full mb-4 border-4 border-white shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 100, 
              damping: 10,
              duration: 1.5
            }}
            whileHover={{ 
              scale: 1.15, 
              rotate: 5,
              boxShadow: "0 0 30px rgba(139, 233, 253, 0.8)"
            }}
          />
          
          <motion.h2
            className="text-6xl text-orange-500 font-bold mb-8"
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 1,
              type: 'spring'
            }}
            whileHover={{ 
              scale: 1.1,
              textShadow: "0 0 20px rgba(255, 165, 0, 0.8)"
            }}
          >
            Abhay
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-4xl font-extrabold text-pink-400 mb-4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.6, 
              duration: 1,
              type: 'spring'
            }}
            whileHover={{ 
              scale: 1.05,
              color: "#8be9fd"
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Frontend Developer
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              &
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Data Analyst
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mt-4 text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              color: "#ffffff"
            }}
          >
            Hi, I'm Abhay Upadhyay
          </motion.p>
          
          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
           
            <motion.a href="#connectMe"
              className="px-6 py-3 border-2 border-cyan-400 rounded-full font-semibold"
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "#06b6d4",
                color: "#000000"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="about" className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 text-black py-20 px-4 relative overflow-hidden">
        <Canvas className="absolute top-0 left-0 w-full h-full !z-0">
          <AboutScene />
        </Canvas>
        
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl font-bold mb-8 text-blue-800 text-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              scale: 1.1,
              textShadow: "0 0 20px rgba(37, 99, 235, 0.8)"
            }}
          >
            About Me
          </motion.h2>
          
          <motion.p 
            className="mb-12 text-lg text-center max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
            }}
          >
            I'm a skilled <strong className="text-purple-600">Frontend Developer</strong> with professional experience, 
            currently enhancing my expertise by learning <strong className="text-green-600">Data Analysis</strong> to 
            better understand and serve user needs.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-purple-900 text-lg">
            
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-4 text-blue-700"
                whileHover={{ color: "#1e40af" }}
              >
                Frontend
              </motion.h3>
              <motion.ul className="space-y-2">
                {['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js'].map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      x: 10,
                      color: "#4338ca"
                    }}
                  >
                    <span className="mr-2">•</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-4 text-pink-700"
                whileHover={{ color: "#be185d" }}
              >
                Data Analytics
              </motion.h3>
              <motion.ul className="space-y-2">
                {['Python For Data Analyst (Pandas, Numpy, Seaborn, plotlib)', 'Excel Formulas', 'Data Visualization', 'Power BI', 'MySQL'].map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    whileHover={{ 
                      x: 10,
                      color: "#be185d"
                    }}
                  >
                    <span className="mr-2 mt-1">•</span>
                    <span className="">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-4 text-yellow-700"
                whileHover={{ color: "#a16207" }}
              >
                Tools & Backend
              </motion.h3>
              <motion.ul className="space-y-2">
                {['Github', 'VS Code', 'Jupyter Notebook', 'Power BI', 'Postman'].map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ 
                      x: 10,
                      color: "#a16207"
                    }}
                  >
                    <span className="mr-2">•</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="experience" className="min-h-screen bg-gradient-to-br from-green-200 via-white to-yellow-100 text-black py-20 px-4 relative overflow-hidden">
        <Canvas className="absolute top-0 left-0 w-full h-full !z-0">
          <ExperienceScene />
        </Canvas>
        
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl font-bold mb-8 text-green-800 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              scale: 1.1,
              textShadow: "0 0 20px rgba(34, 197, 94, 0.8)"
            }}
          >
            Experience
          </motion.h2>
          
          <motion.div
            className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-lg p-8 shadow-xl"
            initial={{ opacity: 0, rotateX: -30 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
            }}
          >
            <motion.p 
              className="text-lg text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              1 year internship experience at <strong className="text-purple-700">GOIP Global Services (Syrotech)</strong>, 
              where I worked as a Frontend Developer on network management solutions.
            </motion.p>
            
            <motion.div className="space-y-6">
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "#8b5cf6"
                }}
              >
                <motion.h3 
                  className="text-xl font-bold text-blue-700 mb-2"
                  whileHover={{ color: "#1d4ed8" }}
                >
                  Project Focus
                </motion.h3>
                <motion.p 
                  className="text-gray-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  Developed GUI interfaces for Optical Network Units (ONU) to ensure a user-friendly and responsive design.
                </motion.p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-lg border-l-4 border-green-500"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "#10b981"
                }}
              >
                <motion.h3 
                  className="text-xl font-bold text-green-700 mb-2"
                  whileHover={{ color: "#047857" }}
                >
                  Technologies Used
                </motion.h3>
                <motion.p 
                  className="text-gray-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  JavaScript, ASP (Active Server Pages), and API integration.
                </motion.p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "#a855f7"
                }}
              >
                <motion.h3 
                  className="text-xl font-bold text-purple-700 mb-4"
                  whileHover={{ color: "#7c3aed" }}
                >
                  Key Contributions
                </motion.h3>
                <motion.ul className="space-y-3">
                  {[
                    'Utilized JavaScript extensively to build dynamic pages and real-time data updates.',
                    'Integrated RESTful APIs to fetch and display live device data dynamically.',
                    'Replaced static HTML with ASP for better backend communication and control.',
                    'Implemented dynamic UI components for a seamless and interactive user experience.'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      whileHover={{ 
                        x: 10,
                        color: "#7c3aed"
                      }}
                    >
                      <motion.span 
                        className="mr-3 mt-1 text-purple-500"
                        whileHover={{ scale: 1.2 }}
                      >
                        ✓
                      </motion.span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="certifications">
        <EnhancedCertificateSlider 
          selectedCert={selectedCert} 
          setSelectedCert={setSelectedCert} 
        />
      </section>

      <section id="contact" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
  <Canvas className="absolute top-0 left-0 w-full h-full !z-0">
    <ContactScene />
  </Canvas>
  
  <div className="relative z-10 max-w-7xl mx-auto">
   
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        whileHover={{ 
          scale: 1.05,
          textShadow: "0 0 30px rgba(6, 182, 212, 0.8)"
        }}
      >
        Contact Me
      </motion.h2>
      
      <motion.p
        className="text-xl text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Ready to bring your ideas to life? Let's create something extraordinary together.
      </motion.p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12 items-center">
   
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.15)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-6 text-cyan-300"
            whileHover={{ color: "#06b6d4" }}
          >
            Get In Touch
          </motion.h3>
          
          <div className="space-y-6">
            {[
              { icon: "📧", label: "Email", value: "abhay9412541844@gmail.com", color: "text-blue-400" },
              { icon: "📱", label: "Phone", value: "+91-9389881323", color: "text-green-400" },
              { icon: "🏠", label: "Address", value: "D 206, Sector 63, Noida", color: "text-purple-400" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  x: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  scale: 1.02
                }}
              >
                <motion.span 
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {item.icon}
                </motion.span>
                <div>
                  <p className="text-gray-300 text-sm">{item.label}</p>
                  <p className={`font-semibold ${item.color}`}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
       
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))",
                "linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1))"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <div className="relative z-10 space-y-6">
            <motion.h3 
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Send Message
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
                <motion.input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  maxLength={20}
                  disabled={loading}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Your Name"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-semibold mb-2 text-gray-300">Phone</label>
                <motion.input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  maxLength={13}
                  disabled={loading}
                  pattern="\+91\d{10}"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="+91XXXXXXXXXX"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
              <motion.input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                maxLength={30}
                disabled={loading}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="yourname@example.com"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder="Tell me about your project..."
                rows={4}
                required
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSending}
              className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSending ? {
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              } : {}}
              whileTap={!isSending ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%]"
                animate={{
                  translateX: isSending ? "0%" : ["100%", "200%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <span className="relative z-10 flex items-center justify-center">
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      🚀
                    </motion.span>
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  </div>
</section>
      
      <FindMeSection />
      
      <VoiceAssistant
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        resume="/assets/CV_Abhay.pdf"
        setSelectedCert={setSelectedCert}
      />
      
      <VoiceTipsModal />  
    </div>
  );
}

export default App;