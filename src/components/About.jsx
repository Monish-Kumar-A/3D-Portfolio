import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import '../styles/About.css'

const AboutCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="about-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

const About = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <div className="about-content">
          <motion.div 
            className="about-text"
            style={{ y, opacity }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I'm a B.Tech Information Technology student at St. Joseph's Institute of Technology 
              with a passion for full-stack development and artificial intelligence. I have hands-on 
              experience building scalable web applications and integrating AI/ML solutions.
            </p>
            <p>
              I've worked as an AI Intern at Predhivaru Wedocs Solutions, where I developed 
              product recommendation systems and AI-powered chatbots. I'm also a finalist in 
              intra-college hackathons and achieved Top 5 position in national-level competitions, 
              showcasing my ability to build innovative solutions under pressure.
            </p>
          </motion.div>
          <div className="about-cards">
            <AboutCard 
              icon="🎨" 
              title="Frontend" 
              description="React.js, Tailwind CSS, JavaScript, Three.js" 
              index={0}
            />
            <AboutCard 
              icon="⚙️" 
              title="Backend & AI" 
              description="Node.js, Express.js, Flask, FastAPI, MongoDB" 
              index={1}
            />
            <AboutCard 
              icon="🤖" 
              title="ML & Tools" 
              description="Python, TensorFlow, XGBoost, LSTM, Git, GitHub" 
              index={2}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
