import { Canvas } from '@react-three/fiber';
    import { Stars, OrbitControls, Float, Text, Sparkles, Cloud, Caustics, Environment, Effects, ContactShadows, Sky } from '@react-three/drei';
    import { useEffect, useState, useRef  } from 'react';
    import { motion, useAnimation } from 'framer-motion';
    import './App.css';
    import EnhancedCertificateSlider from './components/EnhancedCertificateSlider';
    import CertificateCard from './components/CertificateCard';
import CertificateModal from './components/CertificateModal';
    import profileImg2 from './assets/profile2.jpg';
    import resume from './assets/CV_Abhay.pdf';
    import { Toaster, toast } from 'react-hot-toast';
    import VoiceAssistant from './components/VoiceAssistant';
    import VoiceTipsModal from './components/VoiceTipsModal';

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
    
    <div className="text-2xl font-bold">Abhay</div>

    <div className="hidden md:flex gap-6">
      <a href="#profile" className="hover:text-pink-400">My Profile</a>
      <a href="#about" className="hover:text-yellow-300">About Me</a>
      <a href="#experience" className="hover:text-green-300">Experience</a>
      <a href="#certifications" className="hover:text-purple-300">Achivements</a>
      <a href="#contact" className="hover:text-blue-300">Contact Me</a>
      <a href={resume} download className="text-cyan-300 hover:text-cyan-100">Download Resume</a>
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
    <a href="#profile" className="hover:text-pink-400" onClick={() => setIsMobileMenuOpen(false)}>My Profile</a>
    <a href="#about" className="hover:text-yellow-300" onClick={() => setIsMobileMenuOpen(false)}>About Me</a>
    <a href="#experience" className="hover:text-green-300" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
    <a href="#certifications" className="hover:text-purple-300" onClick={() => setIsMobileMenuOpen(false)}>Achivements</a>
    <a href="#contact" className="hover:text-blue-300" onClick={() => setIsMobileMenuOpen(false)}>Contact Me</a>
    <a href={resume} download className="text-cyan-300 hover:text-cyan-100" onClick={() => setIsMobileMenuOpen(false)}>Download Resume</a>
  </motion.div>
</nav>

                <Toaster position="top-right" reverseOrder={false} />

                <section
                    id="profile"
                    className="h-screen relative bg-gradient-to-br from-black via-indigo-900 to-gray-900 text-white overflow-hidden"
                >
                    <Canvas
                        className="absolute top-0 left-0 w-full h-full !z-0"
                        camera={{ position: [0, 0, 8], fov: 50 }}
                        gl={{ preserveDrawingBuffer: true }}
                        onCreated={({ gl }) => {
                            gl.setClearColor('#0f172a'); // Tailwind's slate-900
                        }}
                    >

                        <ambientLight intensity={0.8} color="#cbd5e1" /> {/* soft blue-gray */}
                        <directionalLight position={[4, 10, 4]} intensity={1.5} color="white" />
                        <Stars radius={120} depth={60} count={6000} factor={6} fade speed={2} />
                        <Sparkles
                            count={350}
                            scale={50}
                            speed={1.5}
                            size={3.5}
                            color="#8be9fd" // a nice icy blue or use "#a78bfa" for violet
                        />
                        <Cloud position={[0, 4, -12]} opacity={0.3} speed={0.6} />
                        <Environment preset="sunset" background />

                        <Sky sunPosition={[100, 20, 100]} />
                        <ContactShadows
                            position={[0, -1.5, 0]}
                            opacity={0.75}
                            width={10}
                            height={10}
                            blur={1.5}
                            far={4.5}
                        />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />



                    </Canvas>

                    {/* Centered Foreground Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                        <motion.img
                            src={profileImg2}
                            alt="Abhay"
                            className="w-40 h-40 rounded-full mb-4 border-4 border-white shadow-2xl hover:scale-110 transition-transform duration-500 animate__animated animate__zoomIn"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                        />
                        <motion.h2
                            className="text-6xl text-orange-500 font-bold" style={{marginBottom: '100px'}}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Abhay
                        </motion.h2>

                        <motion.h1
                            className="text-4xl md:text-4xl font-extrabold text-pink-400 animate__animated animate__fadeIn" style={{marginTop: '-20px'}}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Frontend Developer <br/> & <br/>Data Analyst
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl mt-4 text-gray-300 animate__animated animate__fadeInUp"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Hi, I'm Abhay Upadhyay
                        </motion.p>
                    </div>
                </section>

                <section id="about" className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 text-black py-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-6 text-blue-800">About Me</h2>
                        <p className="mb-4 text-lg">I'm a skilled Frontend Developer with professional experience, currently enhancing my expertise by learning Data Analysis to better understand and serve user needs. skilled in:</p>
                        <ul className="list-disc pl-6 text-lg grid grid-cols-2 gap-3 text-purple-900">
                            <li>HTML5</li>
                            <li>CSS3</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>TypeScript</li>
                            <li>Node.js</li>
                            <li>MySQL</li>
                            <li>Data Analyst</li>
                            <li>Excel Formulas</li>
                            <li>Python For Data Analyst (Pandas, Numpy, Seaborn, plotlib)</li>
                            <li>Data Visulization</li>
                            <li>MySQL</li>
                            <li>Power BI</li>
                        </ul>
                    </motion.div>
                </section>

                <section id="experience" className="min-h-screen bg-gradient-to-br from-green-200 via-white to-yellow-100 text-black py-20 px-4">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl font-bold mb-6 text-green-800">Experience</h2>
            <p className="text-lg text-gray-800 mb-2">
                1 year internship experience at <strong className="text-purple-700">GOIP Global Services (Syrotech)</strong>, where I worked as a Frontend Developer on network management solutions.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Project Focus:</strong> Developed GUI interfaces for Optical Network Units (ONU) to ensure a user-friendly and responsive design.</li>
                <li><strong>Technologies Used:</strong> JavaScript, ASP (Active Server Pages), and API integration.</li>
                <li><strong>Key Contributions:</strong></li>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Utilized JavaScript extensively to build dynamic pages and real-time data updates.</li>
                    <li>Integrated RESTful APIs to fetch and display live device data dynamically.</li>
                    <li>Replaced static HTML with ASP for better backend communication and control.</li>
                    <li>Implemented dynamic UI components for a seamless and interactive user experience.</li>
                </ul>
            </ul>
        </motion.div>
    </section>
                          <section id="certifications" >
                        <EnhancedCertificateSlider 
  selectedCert={selectedCert} 
  setSelectedCert={setSelectedCert} 
/>
      </section>
                <section id="contact" className="min-h-screen bg-gradient-to-tl from-purple-100 via-white to-cyan-100 text-black py-20 px-4 relative overflow-hidden">
                    <Canvas className="absolute top-0 left-0 w-full h-full -z-10">
                        <ambientLight intensity={0.5} />
                        <Sparkles count={200} scale={30} speed={1} size={2} color="aqua" />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                        <Float speed={1} rotationIntensity={1} floatIntensity={2}>
                            <Text
                                position={[0, 2, 0]}
                                fontSize={0.8}
                                color="skyblue"
                                anchorX="center"
                                anchorY="middle"
                            >
                                Let's Connect
                            </Text>
                        </Float>
                    </Canvas>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-6 text-cyan-800">Contact Me</h2>
                        <p className="mb-2 text-lg">📧 Email: <span className="text-blue-600">abhay9412541844@gmail.com</span></p>
                        <p className="mb-2 text-lg">📱 Phone: <span className="text-green-600">+91-9389881323</span></p>
                        <p className="mb-6 text-lg">🏠 Address: <span className="text-purple-600">D 206, Sector 63, Noida</span></p>


                        <form
                            onSubmit={handleSubmit}
                            className="relative bg-white bg-opacity-90 p-6 rounded-lg shadow-2xl max-w-md mx-auto space-y-4 backdrop-blur-md border border-white/20 overflow-hidden animate__animated animate__fadeInUp"
                        >
                            {/* Sparkle Effect */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_40%)]"
                            />

                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <label className="block font-semibold mb-1">Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    maxLength={20}
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded px-3 py-2 transition-all duration-300 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
                                    placeholder="Your Name"
                                    required
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <label className="block font-semibold mb-1">Phone Number</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    maxLength={13}
                                    disabled={loading}
                                    pattern="\+91\d{10}"
                                    className="w-full border border-gray-300 rounded px-3 py-2 transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
                                    placeholder="+91XXXXXXXXXX"
                                    required
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                <label className="block font-semibold mb-1">Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    maxLength={30}
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded px-3 py-2 transition-all duration-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
                                    placeholder="yourname@example.com"
                                    required
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                                <label className="block font-semibold mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded px-3 py-2 transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                                    placeholder="Your Message"
                                    rows={4}
                                    required
                                ></textarea>
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={isSending}
                                whileHover={{
                                    scale: isSending ? 1 : 1.05,
                                    boxShadow: isSending ? undefined : "0 0 20px rgba(236,72,153,0.7)",
                                    textShadow: isSending ? undefined : "0 0 10px rgba(255,255,255,0.7)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className={`w-full font-bold py-2 rounded-lg transition-all duration-300 shadow-md ${isSending
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-600 hover:to-purple-600'
                                    }`}
                            >
                                {isSending ? 'Sending...' : 'Send Message 🚀'}
                            </motion.button>


                        </form>

                    </motion.div>
                </section>
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
