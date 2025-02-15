import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaDownload } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const ImageScraper = () => {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  // Auto color-changing background
  useEffect(() => {
    const cycleColors = async () => {
      while (true) {
        await controls.start({ background: "linear-gradient(to right, #ff7eb3, #ff758c)", transition: { duration: 3 } });
        await controls.start({ background: "linear-gradient(to right, #6a11cb, #2575fc)", transition: { duration: 3 } });
        await controls.start({ background: "linear-gradient(to right, #ff6e7f, #bfe9ff)", transition: { duration: 3 } });
      }
    };
    cycleColors();
  }, [controls]);

  const fetchImages = async () => {
    if (!url) {
      alert("⚠️ Please enter a valid URL!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://image-backend-231q.onrender.com", { url });
      setImages(response.data.images || []);
    } catch {
      alert("❌ Error fetching images!");
    }
    setLoading(false);
  };

  return (
    <motion.div 
      animate={controls}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-white transition-all duration-1000"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full text-gray-800 text-center"
      >
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >📸 Web Image Scraper</motion.h2>
        <p className="text-gray-600">Enter a website URL to fetch all images.</p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 flex items-center border rounded-full overflow-hidden shadow-sm bg-gray-100"
        >
          <input
            type="text"
            placeholder="🔗 Enter Website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 text-gray-700 outline-none bg-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={fetchImages}
            className="bg-blue-600 text-white px-6 py-3 flex items-center rounded-r-full hover:bg-blue-700 transition"
          >
            <FaSearch className="mr-2" /> Fetch
          </motion.button>
        </motion.div>

        {loading && <p className="text-blue-500 mt-4">⏳ Loading images...</p>}

        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h3 className="text-xl font-semibold text-gray-700">📷 Download Images:</h3>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
            >
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="border rounded-lg overflow-hidden shadow-md bg-white"
                >
                  <img src={img} alt="scraped" className="w-full h-32 object-cover" />
                  <motion.a
                    whileHover={{ backgroundColor: "#4a90e2" }}
                    href={img}
                    download
                    className="block bg-blue-600 text-white text-center py-2 text-sm hover:bg-blue-700 transition"
                  >
                    <FaDownload className="inline mr-1" /> Download
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImageScraper;
