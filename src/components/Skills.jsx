import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import '../styles/Skills.css'

// SVG Icon Component
const SkillIcon = ({ icon, name }) => {
  const icons = {
    'Python': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#3776AB" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-1.01-8.645-1.03-11.841-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
        <path fill="#FFD43B" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521H91.682zm-16.556 81.517c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
      </svg>
    ),
    'React.js': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <circle cx="64" cy="64" r="11.4" fill="#61dafb"/>
        <path stroke="#61dafb" strokeWidth="5" strokeLinecap="round" fill="none" d="M64 96c-28.8 0-52-7.2-52-16s23.2-16 52-16 52 7.2 52 16-23.2 16-52 16z"/>
        <path stroke="#61dafb" strokeWidth="5" strokeLinecap="round" fill="none" d="M64 32c28.8 0 52 7.2 52 16s-23.2 16-52 16-52-7.2-52-16S35.2 32 64 32z"/>
        <ellipse cx="64" cy="80" rx="52" ry="12" fill="none" stroke="#61dafb" strokeWidth="5"/>
        <ellipse cx="64" cy="48" rx="52" ry="12" fill="none" stroke="#61dafb" strokeWidth="5"/>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#339933" d="M67.234 120.834c-3.173 0-5.873-.293-8.08-.867-2.2-.574-4.013-1.44-5.44-2.6a11.47 11.47 0 01-3.127-4.16c-.72-1.653-1.08-3.733-1.08-6.24V51.667h12.867v54.133c0 2.507.613 4.267 1.84 5.28 1.22 1.013 3.173 1.52 5.867 1.52 2.693 0 4.64-.507 5.853-1.52 1.22-1.013 1.827-2.773 1.827-5.28V51.667h12.867v53.4c0 2.507-.36 4.587-1.08 6.24a11.47 11.47 0 01-3.127 4.16c-1.427 1.16-3.24 2.026-5.44 2.6-2.207.574-4.907.867-8.08.867z"/>
        <path fill="#339933" d="M77.574 66.533c0-1.92-.574-3.387-1.72-4.4-1.147-1.013-2.867-1.52-5.16-1.52-2.027 0-3.707.427-5.04 1.28-1.333.853-2.24 2.107-2.72 3.76-.48 1.653-.72 3.627-.72 5.92v12.587c0 2.293.24 4.267.72 5.92.48 1.653 1.387 2.907 2.72 3.76 1.333.853 3.013 1.28 5.04 1.28 2.293 0 4.013-.507 5.16-1.52 1.146-1.013 1.72-2.48 1.72-4.4V66.533z"/>
      </svg>
    ),
    'JavaScript': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#F7DF1E" d="M1.408 1.408h125.184v125.185H1.408z"/>
        <path fill="#000000" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.402-3.498 9.169-5.81-1.393-2.148-2.137-3.161-3.022-4.144-3.249-4.084-7.616-7.46-15.344-7.252l-3.849.49c-3.693.469-7.229 2.197-9.41 5.07-5.659 5.925-4.033 17.451 3.9 22.579 7.824 4.847 19.355 6.848 19.916 11.834.229 2.183-.574 4.471-3.57 6.081-9.053 5.244-22.51 3.08-29.788-1.97-3.844-2.718-6.747-7.245-8.562-11.745zm-46.885-37.894h-11.456l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
      </svg>
    ),
    'TensorFlow': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#FF6F00" d="M40.694 15.541a4.63 4.63 0 00-3.932 2.314l-14.75 24.351H4.629a4.628 4.628 0 000 9.255h22.549l-8.369 13.813a4.631 4.631 0 003.932 6.946h14.751L14.498 96.888a4.632 4.632 0 003.933 6.946h14.752L4.955 123.531a4.633 4.633 0 006.298 6.362l46.882-27.069L60.24 77.554h24.744a4.63 4.63 0 003.932-2.314l24.35-42.099a4.632 4.632 0 000-4.629L88.914-2.314A4.628 4.628 0 0084.984-4.63H40.694z"/>
        <path fill="#FF6F00" d="M92.473 32.075H65.496l21.977 38.003h26.977z"/>
      </svg>
    ),
    'MongoDB': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#47A248" d="M82.621 27.2c1.35 2.363 2.633 4.694 3.806 7.06 6.36 12.694 9.876 26.006 10.752 39.867.489 7.62.119 15.207-1.037 22.737-.144.952-.308 1.898-.489 2.84-.182.952-.505 1.741-1.037 2.455-.728.945-1.641 1.17-2.614.897-.827-.229-1.532-.758-2.137-1.41-2.288-2.476-4.023-5.33-5.567-8.326-6.106-11.914-9.218-24.548-10.686-37.64-.637-5.683-.88-11.41-.719-17.123.032-1.143.134-2.29.308-3.42.139-.897.362-1.738.82-2.5.637-1.061 1.532-1.593 2.68-1.583.988.009 1.939.362 2.83.848z"/>
        <path fill="#47A248" d="M65.876 21.045c.342.544.637 1.107.897 1.672 5.025 11.042 8.36 22.737 10.326 34.887 1.37 8.417 1.854 16.911 1.443 25.379-.146 2.964-.427 5.91-.82 8.84-.149 1.13-.362 2.25-.647 3.344-.309 1.17-.717 2.25-1.443 3.207-.597.789-1.323 1.107-2.228 1.006-1.006-.111-1.878-.566-2.614-1.241-2.786-2.558-4.842-5.458-6.688-8.523-5.196-8.52-8.516-17.968-10.326-27.832-1.854-10.052-2.003-20.16-.445-30.218.206-1.323.45-2.64.758-3.944.154-.654.342-1.293.597-1.906.51-1.222 1.273-2.115 2.366-2.643.956-.465 1.984-.506 3.03-.368.966.127 1.878.506 2.728.996z"/>
        <path fill="#47A248" d="M81.608 96.115c-.809 1.969-1.732 3.889-2.758 5.762-2.501 4.579-5.474 8.888-8.84 12.906-1.059 1.272-2.168 2.5-3.38 3.608-.957.877-2.063 1.443-3.378 1.583-1.107.119-2.068-.182-2.922-.88-2.061-1.688-3.474-3.933-4.63-6.362-4.381-9.236-6.742-18.96-7.337-29.027-.298-5.036-.24-10.089.172-15.135.268-3.31.662-6.6 1.18-9.875.26-1.643.572-3.275.935-4.894.228-1.006.53-1.984.897-2.937.466-1.222 1.17-2.182 2.228-2.822 1.006-.617 2.168-.758 3.344-.466 1.107.278 2.088.758 2.965 1.41 4.191 3.086 7.3 6.765 9.876 11.042 4.058 6.723 6.572 14.038 7.794 21.737.62 3.933.853 7.894.717 11.869-.053 1.593-.154 3.182-.309 4.766-.103 1.006-.24 2.003-.427 2.994z"/>
      </svg>
    ),
    'Express.js': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#000000" d="M126.612 97.764c-2.395-3.161-7.257-4.218-11.281-2.22l-30.312 15.484-3.71-9.677 30.311-15.485c3.997-2.013 5.467-6.783 3.273-10.658-2.193-3.894-6.969-5.15-10.966-3.136L78.625 91.07l-4.127-10.768 30.311-15.485c3.998-2.013 5.468-6.783 3.274-10.658-2.195-3.894-6.969-5.15-10.966-3.137L49.2 77.953c-1.08.553-1.997 1.393-2.648 2.416L1.564 69.938c-3.628-.932-7.244 1.605-8.068 5.662-.824 4.057 1.598 8.062 5.226 8.994l47.13 11.178c.564 1.866 1.51 3.593 2.782 5.07l-28.246 14.428c-4.024 2.013-5.468 6.783-3.274 10.658 1.648 2.935 4.862 4.545 8.202 4.545 1.254 0 2.532-.295 3.749-.916l48.667-24.87 3.712 9.677-48.667 24.87c-4.024 2.013-5.468 6.783-3.274 10.658 1.648 2.935 4.862 4.545 8.202 4.545 1.254 0 2.532-.295 3.749-.916l55.82-28.52c3.998-2.013 5.468-6.783 3.274-10.658zM52.837 85.826L14.762 74.938l14.482-7.401 38.074 10.888-14.48 7.401z"/>
      </svg>
    ),
    'FastAPI': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#009688" d="M64 4L8 20v44c0 32 24 60 56 68 32-8 56-36 56-68V20L64 4zm0 8.828L105.172 26.4c.585 3.044.828 6.14.828 9.244v.688H55.172v24H107v8H55.172v16H107v8H21v-8h33.828V56H21v-8h33.828V24H21c0-3.104.243-6.2.828-9.244L64 12.828z"/>
      </svg>
    ),
    'Flask': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#000000" d="M82.798 114.499c-1.513 0-2.738-1.225-2.738-2.738 0-1.513 1.225-2.738 2.738-2.738s2.738 1.225 2.738 2.738c0 1.513-1.225 2.738-2.738 2.738zm-2.14-8.033l-1.404-17.548h7.088l-1.404 17.548h-4.28zm14.574-2.053h-6.854l1.826-22.826h10.506l1.826 22.826zm8.571-2.053h-6.854l2.513-31.406h11.692l2.513 31.406zm12.523-2.053h-6.854l2.697-33.717h12.06l2.697 33.717z"/>
        <path fill="#000000" d="M84.938 121.668h-41.876c-3.341 0-6.049-2.708-6.049-6.049V62.499c0-3.341 2.708-6.049 6.049-6.049h41.876c3.341 0 6.049 2.708 6.049 6.049v53.12c0 3.341-2.708 6.049-6.049 6.049z"/>
      </svg>
    ),
    'Tailwind CSS': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#06b6d4" d="M64 25.6c-17.067 0-27.733 8.533-32 25.6 6.4-8.533 13.867-11.733 22.4-9.6 4.871 1.218 8.352 4.747 12.222 8.647C72.53 56.53 78.506 62.4 96 62.4c17.067 0 27.733-8.533 32-25.6-6.4 8.533-13.867 11.733-22.4 9.6-4.871-1.218-8.352-4.747-12.222-8.647C87.47 33.87 81.494 28 64 28zM32 65.6C14.933 65.6 4.267 74.133 0 91.2c6.4-8.533 13.867-11.733 22.4-9.6 4.871 1.218 8.352 4.747 12.222 8.647C40.53 96.53 46.506 102.4 64 102.4c17.067 0 27.733-8.533 32-25.6-6.4 8.533-13.867 11.733-22.4 9.6-4.871-1.218-8.352-4.747-12.222-8.647C55.47 73.87 49.494 68 32 68z"/>
      </svg>
    ),
    'Git': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#F05032" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.462 6.607 2.293 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0c-2.842-2.844-3.545-7.019-2.105-10.521l-13.048-13.048-.002 34.341c.92.515 1.791 1.124 2.597 1.93a9.677 9.677 0 010 13.683l-.002.002c-3.777 3.777-9.898 3.785-13.683 0-3.78-3.78-3.78-9.9 0-13.679.806-.805 1.677-1.415 2.597-1.93V52.736a9.683 9.683 0 01-2.597-1.931c-2.862-2.86-3.551-7.06-2.083-10.563L30.725 23.345 3.264 50.809c-3.174 3.177-3.174 8.325 0 11.5l55.116 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858c3.175-3.176 3.175-8.327 0-11.501z"/>
      </svg>
    ),
    'MySQL': (
      <svg viewBox="0 0 128 128" className="skill-svg-icon">
        <path fill="#4479A1" d="M110.8 77.9c-9.6 14.5-29.6 21.8-49.5 21.8-31.8 0-57.5-21.2-57.5-57.5v-2.2C3.8 17.5 0 21.8 0 27.1c0 6.2 5 11.2 11.2 11.2h4.2c1.8 0 3.3-1.5 3.3-3.3V27.1c0-22.5 16.4-37.5 45.2-37.5 28.8 0 45.2 15 45.2 37.5v40.7c0 2.2-1.8 4-4 4h-8.5c-1.8 0-3.3-1.5-3.3-3.3V27.1c0-17.9-10.2-27.3-29.4-27.3S36.1 9.2 36.1 27.1v69.8c0 17.9 10.2 27.3 29.4 27.3s29.4-9.4 29.4-27.3v-40.7c0-6.2 5-11.2 11.2-11.2s11.2 5 11.2 11.2v40.7c0 22.5-16.4 37.5-45.2 37.5S15.9 119.6 15.9 97.1H0c0 28.8 16.4 45 45.8 45 28.8 0 45.2-15 45.2-37.5V79.4c0-1.5-1.2-3.3-2.7-3.3h-2.2c-1.5 0-3 1.2-3.7 2.7z"/>
      </svg>
    ),
  }

  return <div className="skill-icon-wrapper">{icons[name] || <span className="skill-icon-emoji">{icon}</span>}</div>
}

const SkillCard = ({ skill, index, isActive, onActivate }) => {
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

  const handleClick = () => {
    onActivate(index)
  }

  return (
    <motion.div
      ref={ref}
      className={`skill-card ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05, z: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      <SkillIcon icon={skill.icon} name={skill.name} />
      <h3 className="skill-name">{skill.name}</h3>
      
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            className="skill-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 1000 }}
          >
            <p className="tooltip-line">{skill.description[0]}</p>
            <p className="tooltip-line">{skill.description[1]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null)
  const [showHint, setShowHint] = useState(true)
  const skillsRef = useRef(null)

  const skills = [
    { 
      name: 'Python', 
      icon: '🐍', 
      key: 'p',
      description: [
        'Versatile programming language for AI/ML',
        'Used for data science, automation, and backend development'
      ]
    },
    { 
      name: 'React.js', 
      icon: '⚛️', 
      key: 'r',
      description: [
        'Modern JavaScript library for building UIs',
        'Component-based architecture with hooks and virtual DOM'
      ]
    },
    { 
      name: 'Node.js', 
      icon: '🟢', 
      key: 'n',
      description: [
        'JavaScript runtime for server-side development',
        'Enables scalable backend applications with npm ecosystem'
      ]
    },
    { 
      name: 'JavaScript', 
      icon: '📜', 
      key: 'j',
      description: [
        'Core web development language',
        'Dynamic, multi-paradigm language for interactive websites'
      ]
    },
    { 
      name: 'TensorFlow', 
      icon: '🧠', 
      key: 't',
      description: [
        'Open-source ML framework by Google',
        'Used for deep learning, neural networks, and AI models'
      ]
    },
    { 
      name: 'MongoDB', 
      icon: '🍃', 
      key: 'm',
      description: [
        'NoSQL document database',
        'Flexible schema for storing and querying JSON-like documents'
      ]
    },
    { 
      name: 'Express.js', 
      icon: '🚂', 
      key: 'e',
      description: [
        'Fast, minimalist web framework for Node.js',
        'Simplifies API creation and server-side routing'
      ]
    },
    { 
      name: 'FastAPI', 
      icon: '⚡', 
      key: 'f',
      description: [
        'Modern Python web framework for APIs',
        'High performance with automatic API documentation'
      ]
    },
    { 
      name: 'Flask', 
      icon: '🌶️', 
      key: 'l',
      description: [
        'Lightweight Python web framework',
        'Microframework for building web applications and APIs'
      ]
    },
    { 
      name: 'Tailwind CSS', 
      icon: '🎨', 
      key: 'w',
      description: [
        'Utility-first CSS framework',
        'Rapid UI development with pre-built utility classes'
      ]
    },
    { 
      name: 'Git', 
      icon: '📦', 
      key: 'g',
      description: [
        'Version control system for tracking changes',
        'Essential tool for collaboration and code management'
      ]
    },
    { 
      name: 'MySQL', 
      icon: '🗄️', 
      key: 's',
      description: [
        'Relational database management system',
        'Structured data storage with SQL queries and ACID compliance'
      ]
    },
  ]

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showHint) setShowHint(false)
      
      const key = e.key.toLowerCase()
      const skillIndex = skills.findIndex(skill => skill.key === key)
      
      if (skillIndex !== -1) {
        setActiveSkill(skillIndex)
        const skillCards = document.querySelectorAll('.skill-card')
        if (skillCards[skillIndex]) {
          skillCards[skillIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
        
        setTimeout(() => {
          setActiveSkill(null)
        }, 2000)
      }
    }

    const handleClick = () => {
      if (showHint) setShowHint(false)
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('click', handleClick)
    }
  }, [showHint, skills])

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="skills-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.h2>
          <AnimatePresence>
            {showHint && (
              <motion.p 
                className="skills-hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                (hint: press a key)
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillCard 
              key={index} 
              skill={skill} 
              index={index}
              isActive={activeSkill === index}
              onActivate={setActiveSkill}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
