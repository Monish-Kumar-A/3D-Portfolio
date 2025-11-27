import React from 'react'
import { motion } from 'framer-motion'
import '../styles/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="footer-text"
        >
          © {currentYear} Monish Kumar Anandan. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}

export default Footer

