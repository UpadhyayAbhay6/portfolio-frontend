import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface Props {
  formData: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | { preventDefault: () => void }) => void;
  resume: string;
  setSelectedCert: React.Dispatch<React.SetStateAction<string | null>>; // ✅ add this
}

const VoiceAssistant: React.FC<Props> = ({ formData, setFormData, handleSubmit, resume, setSelectedCert}) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  // Voice commands logic
  useEffect(() => {
    const text = transcript.toLowerCase();

    if (text.includes("go to profile")) {
      document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" });
      resetTranscript();
    }
    if (text.includes("go to about")) {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      resetTranscript();
    }
    if (text.includes("my experience")) {
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      resetTranscript();
    }
    if (text.includes("go to certificates") || text.includes("my achivements")) {
      document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
      resetTranscript();
    }
    if (text.includes("contact me")) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      resetTranscript();
    }
    if (text.includes("connect with me")) {
      document.getElementById("connectMe")?.scrollIntoView({ behavior: "smooth" });
      resetTranscript();
    }

    if (text.includes("open web certificate")) {
  setSelectedCert("/certificates/web_dev_full.jpg");
  resetTranscript();
}

if (text.includes("open tata certificate")) {
  setSelectedCert("/certificates/genai_full.jpg");
  resetTranscript();
}
if (text.includes("open geeks certificate")) {
  setSelectedCert("/certificates/GFG_DA_CERTIFICATE.png");
  resetTranscript();
}

    const nameMatch = text.match(/my name is ([a-z]+(?: [a-z]+)+)/i);
    if (nameMatch) {
      setFormData((prev: any) => ({ ...prev, name: nameMatch[1].trim() }));
      resetTranscript();
    }

    const phoneMatch = text.match(/my phone number is (\+91)?\s?(\d{10})/i);
    if (phoneMatch) {
      const cleanNumber = phoneMatch[2].replace(/\D/g, "");
      setFormData((prev: any) => ({ ...prev, phone: `+91${cleanNumber}` }));
      resetTranscript();
    }

    const emailMatch = text.match(/my email is ([\w.-]+@[a-z]+\.[a-z.]+)/i);
    if (emailMatch) {
      setFormData((prev: any) => ({ ...prev, email: emailMatch[1].trim() }));
      resetTranscript();
    }

    const msgMatch = text.match(/my message is (.+)/i);
    if (msgMatch) {
      setFormData((prev: any) => ({ ...prev, message: msgMatch[1].trim() }));
      resetTranscript();
    }

    if (text.includes("send message")) {
      handleSubmit({ preventDefault: () => {} });
      resetTranscript();
    }

    if (text.includes("download resume")) {
      const link = document.createElement("a");
      link.href = resume;
      link.download = "CV_Abhay.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      resetTranscript();
    }
  }, [transcript, resetTranscript, setFormData, handleSubmit, resume, setSelectedCert]);

  const handleMicClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Close stream after permission check
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    } catch (error) {
      console.error("Microphone access denied or blocked.", error);
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p className="text-red-500 text-center">Browser does not support voice recognition.</p>;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 text-center">
      <div className="text-5xl animate-bounce mb-1">👇🏻</div>
      <button
        onClick={handleMicClick}
        className="p-4 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
      >
        🎤
      </button>
      <p className="text-sm mt-1 font-medium text-gray-800">
        {listening ? <span className="text-green-600">Listening...</span> : <span className="text-red-500">Not Listening</span>}
      </p>
    </div>
  );
};

export default VoiceAssistant;
