'use client'

import { useEffect, useRef } from 'react'
import { TypingAnimation } from './components/typing-animation'

export default function PortfolioCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1,
      speed: Math.random() * 0.1
    }))

    const animate = () => {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(star.x, star.y, star.size, star.size)

        star.y = (star.y + star.speed) % canvas.height
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  const jsonContent = `{
  "name": "Chad Devz",
  "age": 19,
  "country": "philippines",
  "socials": {
    "facebook": "@chadivannillo",
    "instagram": "@chadivannillo",
    "github": "@ChadsPH"
  }
}`

  const sentences = [
  "Code, eat, sleep, repeat",
  "Error is my love language",
  "Caffeine fueled code",
  "May the code be with you",
  "Ctrl+Alt+Procrastinate",
  "I'd rather be coding",
  "Code is my therapy",
  "Debugging is my life",
  "Code all night, sleep all day",
  "Bugs are my pets",
  "Code, commit, repeat",
  "I'm not lazy, I'm just on coding mode",
  "Code is my happy place",
  "Error 404: Productivity not found",
  "Coding is my superpower"
  ]

  return (
  <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-mono">
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ background: 'rgba(169, 169, 169, 0.5)' }}
    />
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
      <div className="card w-full max-w-[280px] rounded-lg bg-[#1e1e1e]/80 backdrop-blur-sm shadow-lg transition duration-300 hover:shadow-xl">
        <div>
          <pre className="title p-4 text-sm border-b border-[#333]">
            <TypingAnimation sentences={sentences} typingSpeed={100} pauseBetweenSentences={1000} />
          </pre>
          <hr className="border-t border-[#333]" />
        </div>
        <pre className="json p-4 text-xs leading-5">
          <code>{jsonContent}</code>
        </pre>
        <footer className="p-4 text-[10px] text-center border-t border-[#333]">
          <pre>© 2024 | Made with ❤️</pre>
        </footer>
      </div>
    </div>
  </div>
);

}

