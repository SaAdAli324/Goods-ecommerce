import React from "react";
import { motion } from "framer-motion";

const FadeInSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      viewport={{ once: true }} // animates only once per section
    >
      {children}
    </motion.div>
  );
};
export default FadeInSection;