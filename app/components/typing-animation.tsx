'use client'

import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  sentences: string[]
  typingSpeed?: number
  pauseBetweenSentences?: number
}

export function TypingAnimation({
  sentences,
  typingSpeed = 100,
  pauseBetweenSentences = 1000
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isTyping) {
      const currentSentence = sentences[currentSentenceIndex]
      if (displayText.length < currentSentence.length) {
        timer = setTimeout(() => {
          setDisplayText(currentSentence.slice(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        timer = setTimeout(() => {
          setIsTyping(false)
        }, pauseBetweenSentences)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, typingSpeed / 2)
      } else {
        setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, currentSentenceIndex, isTyping, sentences, typingSpeed, pauseBetweenSentences])

  return (
    <div className="Typewriter" data-testid="typewriter-wrapper">
      <span className="Typewriter__wrapper">{displayText}</span>
      <span className="Typewriter__cursor">|</span>
    </div>
  )
}

