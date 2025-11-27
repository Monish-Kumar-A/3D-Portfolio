import React from 'react'
import { motion } from 'framer-motion'
import '../styles/ThemeToggle.css'

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        className="theme-toggle-icon"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3 }}
        key={theme}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.span>
    </motion.button>
  )
}

export default ThemeToggle
