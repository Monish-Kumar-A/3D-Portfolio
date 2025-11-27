import React from 'react'
import { motion } from 'framer-motion'
import HeroCanvas from './HeroCanvas'
import '../styles/Hero.css'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <motion.span 
              className="hero-name"
              variants={itemVariants}
            >
              Monish Kumar Anandan
            </motion.span>
            <motion.span 
              className="hero-subtitle"
              variants={itemVariants}
            >
              Full-Stack Developer & AI/ML Engineer
            </motion.span>
          </motion.h1>
          <motion.p 
            className="hero-description"
            variants={itemVariants}
          >
            B.Tech Information Technology student passionate about building intelligent web applications 
            using React, Node.js, and Machine Learning. I specialize in full-stack development with 
            expertise in AI/ML integration to create innovative solutions.
          </motion.p>
          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <motion.button 
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="hero-canvas-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <HeroCanvas />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

