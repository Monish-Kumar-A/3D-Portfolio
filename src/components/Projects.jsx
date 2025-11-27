import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import '../styles/Projects.css'

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.03, z: 20 }}
    >
      <div className="project-header">
        <div className="project-category">
          {project.category}
        </div>
        <h3 className="project-title">{project.title}</h3>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-tech">
        {project.tech.map((tech, techIndex) => (
          <motion.span 
            key={techIndex} 
            className="tech-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + techIndex * 0.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
      <div className="project-buttons">
        <motion.a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          GitHub
        </motion.a>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const projects = [
    {
      title: 'CareerSync - AI-Powered Career Guidance Platform',
      description: 'A full-stack AI-powered career guidance platform for job discovery, resume critique, and networking. Features personalized job recommendations using AI models, React-based frontend, Node.js/Express backend with MongoDB Atlas, authentication, and interactive job postings.',
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'LangChain', 'OpenAI API'],
      category: 'AI and Full Stack',
      github: 'https://github.com/Monish-Kumar-A/CarrerSync'
    },
    {
      title: 'Startup Trend Prediction',
      description: 'Used LSTM (Long Short-Term Memory networks) in TensorFlow to predict startup funding trends. Built an interactive dashboard using Streamlit for time-series forecasting, helping investors and entrepreneurs make data-driven decisions.',
      tech: ['Python', 'LSTM', 'TensorFlow', 'Streamlit'],
      category: 'AI and Machine Learning',
      github: 'https://github.com/Monish-Kumar-A/startup-trend-prediction'
    },
    {
      title: 'Loan Approval Prediction',
      description: 'Built a machine learning model using XGBoost to predict loan application approval based on applicant details. Deployed the model using FastAPI with a responsive React frontend, creating a complete end-to-end ML application.',
      tech: ['Python', 'XGBoost', 'FastAPI', 'React'],
      category: 'Machine Learning',
      github: 'https://github.com/Monish-Kumar-A'
    },
    {
      title: 'Cats and Dogs Classifier',
      description: 'Built a Convolutional Neural Network (CNN) model to classify images of cats and dogs. Trained the model to achieve high accuracy and created a simple front-end for users to upload images and get instant classification results.',
      tech: ['Python', 'CNN', 'Deep Learning', 'Computer Vision'],
      category: 'Deep Learning',
      github: 'https://github.com/Monish-Kumar-A/Cats-and-Dogs-Image-Classifier'
    },
  ]

  return (
    <section id="projects" className="projects">
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
