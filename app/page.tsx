'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'

// Floating Particles Component
// Memoize particles array outside component to avoid re-creation on renders
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  delay: Math.random() * 5,
  duration: 10 + Math.random() * 6,
  x: Math.random() * 100,
  type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'circle',
}))

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ contain: 'strict' }}>
      {PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{ left: `${particle.x}%`, willChange: 'transform, opacity' }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-100vh', opacity: [0, 0.25, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="text-2xl">
            {particle.type === 'heart' && '💖'}
            {particle.type === 'sparkle' && '✨'}
            {particle.type === 'circle' && '🌸'}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Polaroid Component
interface PolaroidProps {
  image: string
  caption: string
  style?: React.CSSProperties
  className?: string
}

function Polaroid({ image, caption, style, className = '' }: PolaroidProps) {
  const rotation = Math.random() * 8 - 4

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        ...style,
        rotate: rotation,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 50,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="bg-white p-3 shadow-lg rounded-sm w-full">
        <img
          src={image}
          alt={caption}
          className="w-full h-32 object-cover object-center rounded-sm"
          loading="lazy"
          decoding="async"
        />
        <p className="mt-2 text-xs font-sacramento text-rose-400 text-center whitespace-normal">
          {caption}
        </p>
      </div>
    </motion.div>
  )
}

// Main Page
export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const melodyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Lazily create AudioContext (must happen from a user gesture)
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (melodyTimeoutRef.current) clearTimeout(melodyTimeoutRef.current)
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const toggleMusic = async () => {
    try {
      const ctx = getAudioContext()

      if (musicPlaying) {
        // Stop melody by suspending context
        await ctx.suspend().catch(() => {})
        setMusicPlaying(false)
      } else {
        // Resume context first (required by autoplay policy)
        await ctx.resume().catch(() => {})
        if (ctx.state === 'running') {
          playMelody(ctx)
          setMusicPlaying(true)
        }
      }
    } catch {
      // Gracefully handle any DOMException from autoplay policy
      console.warn('Audio playback was blocked by the browser.')
      setMusicPlaying(false)
    }
  }

  const playMelody = (ctx: AudioContext) => {
    const notes = [
      { freq: 261.63, duration: 0.5 },
      { freq: 293.66, duration: 0.5 },
      { freq: 329.63, duration: 0.5 },
      { freq: 349.23, duration: 1 },
      { freq: 329.63, duration: 0.5 },
      { freq: 349.23, duration: 0.5 },
      { freq: 392, duration: 1 },
    ]

    let time = ctx.currentTime
    let totalDuration = 0

    notes.forEach(({ freq, duration }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.frequency.value = freq
      osc.type = 'sine'

      gain.gain.setValueAtTime(0.1, time)
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(time)
      osc.stop(time + duration)

      totalDuration += duration + 0.05
      time += duration + 0.05
    })

    // Sync button state when melody finishes
    melodyTimeoutRef.current = setTimeout(() => {
      setMusicPlaying(false)
    }, totalDuration * 1000)
  }

  return (
    <div className="overflow-x-hidden">
      <FloatingParticles />

      {/* Opening Overlay */}
      <motion.div
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex items-center justify-center ${
          !showOverlay && 'pointer-events-none'
        }`}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setShowOverlay(false)}
      >
        <div className="text-center cursor-pointer">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💌
          </motion.div>
          <p className="text-rose-400 font-sacramento text-xl mb-2">
            tap tap layarnya untuk buka
          </p>
          <p className="text-stone-500 font-inter text-sm">siapkan speaker kamu</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex flex-col items-center justify-center px-4 pt-12 pb-28 sm:pb-20 relative overflow-hidden sm:overflow-visible"
        >
          {/* Background polaroids pushed to margins */}
          <motion.div
            className="absolute -left-32 md:-left-40 top-20 w-20 h-28 sm:w-28 sm:h-36 z-0 hidden md:block pointer-events-none"
            animate={{ rotate: -15, y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Polaroid image="/polaroid3.png" caption="💭" className="w-full" />
          </motion.div>

          <motion.div
            className="absolute -right-32 md:-right-40 bottom-32 w-20 h-28 sm:w-28 sm:h-36 z-0 hidden md:block pointer-events-none"
            animate={{ rotate: 12, y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Polaroid image="/polaroid6.png" caption="✨" className="w-full" />
          </motion.div>

          {/* Centered content */}
          <div className="max-w-3xl mx-auto relative z-10">
            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-dancing text-rose-400 text-center mb-6 text-balance"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Happy Level Up Day!
            </motion.h1>

            {/* Message */}
            <motion.p
              className="text-center text-stone-600 font-lora text-lg leading-relaxed mb-12 text-pretty"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Here&apos;s to celebrating you and all the beautiful moments we&apos;ve shared
              together. You&apos;re absolutely wonderful, and this year is going to be magical.
            </motion.p>

            {/* Floating Stickers */}
            <motion.div
              className="flex gap-8 flex-wrap justify-center"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {['🌻', '💌', '👟', '🍜', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Scroll to Next Button */}
          <motion.button
            onClick={() => {
              document.getElementById('poem')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-400 hover:text-rose-400 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.button>
        </section>

        {/* Poem Section */}
        <section
          id="poem"
          className="min-h-screen flex items-center justify-center px-4 py-24 sm:py-20 relative overflow-hidden sm:overflow-visible"
        >
          {/* Background polaroids pushed to margins */}
          <motion.div
            className="absolute -left-28 md:-left-36 top-12 w-18 h-24 sm:w-24 sm:h-32 z-0 hidden md:block pointer-events-none"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Polaroid image="/polaroid5.png" caption="☕" className="w-full" />
          </motion.div>

          <motion.div
            className="absolute -right-28 md:-right-36 bottom-20 w-18 h-24 sm:w-24 sm:h-32 z-0 hidden md:block pointer-events-none"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            <Polaroid image="/polaroid7.png" caption="🌅" className="w-full" />
          </motion.div>

          {/* Centered Poem Card */}
          <motion.div
            className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-12 rounded-lg shadow-2xl border border-pink-100 relative z-10"
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-pink-50/50 rounded-lg pointer-events-none" />

            <h2 className="text-3xl font-dancing text-rose-400 text-center mb-8 relative z-10">
              A Little Something for You
            </h2>

            <div className="font-lora text-stone-700 space-y-6 text-center leading-relaxed text-lg relative z-10">
              <p>
                In every sunrise, I see your smile,
                <br />
                In every moment, it&apos;s worth your while.
              </p>
              <p>
                With every step, you&apos;re running free,
                <br />
                Living fully, just as you should be.
              </p>
              <p>
                The world tastes sweeter when you&apos;re near,
                <br />
                Each memory this year we hold so dear.
              </p>
              <p>
                So here&apos;s to you, wonderful soul,
                <br />
                May this year complete your every goal.
              </p>
            </div>
          </motion.div>

          {/* Scroll to Next Button */}
          <motion.button
            onClick={() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-400 hover:text-rose-400 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.button>
        </section>

        {/* Highlight Reel Section */}
        <section
          id="gallery"
          className="min-h-screen py-24 sm:py-20 px-4 relative overflow-hidden sm:overflow-visible"
        >
          <motion.h2
            className="text-4xl font-dancing text-rose-400 text-center mb-16 text-balance"
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our Favorite Memories
          </motion.h2>

          {/* Responsive Flexbox Gallery */}
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex flex-wrap justify-center gap-8 md:gap-6">
              {[
                { image: '/polaroid1.png', caption: 'Post-run vibes', rotate: 'md:rotate-3' },
                { image: '/polaroid2.png', caption: 'Culinary dates', rotate: 'md:-rotate-2' },
                { image: '/polaroid5.png', caption: 'Brunch bliss', rotate: 'md:rotate-6' },
                { image: '/polaroid6.png', caption: 'Golden nights', rotate: 'md:-rotate-3' },
                { image: '/polaroid3.png', caption: 'Candid moments', rotate: 'md:rotate-2' },
                { image: '/polaroid7.png', caption: 'Peaceful moments', rotate: 'md:-rotate-5' },
                { image: '/polaroid4.png', caption: 'Sunset walks', rotate: 'md:rotate-4' },
                { image: '/polaroid8.png', caption: 'Pure joy', rotate: 'md:-rotate-4' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`w-28 h-36 md:w-32 md:h-40 flex-shrink-0 ${item.rotate}`}
                  animate={{ opacity: [0, 1] }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Polaroid
                    image={item.image}
                    caption={item.caption}
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll to Next Button */}
          <motion.button
            onClick={() => {
              document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-400 hover:text-rose-400 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.button>
        </section>

        {/* Footer Section */}
        <section
          id="footer"
          className="min-h-screen flex flex-col items-center justify-center px-4 py-24 sm:py-20 relative overflow-hidden sm:overflow-visible"
        >
          {/* Fading background polaroids pushed to margins */}
          <motion.div
            className="absolute -left-32 md:-left-40 top-32 w-16 h-22 sm:w-20 sm:h-28 opacity-30 z-0 hidden md:block pointer-events-none"
            animate={{ rotate: -20, y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Polaroid image="/polaroid1.png" caption="" className="w-full" />
          </motion.div>

          <motion.div
            className="absolute -right-32 md:-right-40 bottom-20 w-16 h-22 sm:w-20 sm:h-28 opacity-20 z-0 hidden md:block pointer-events-none"
            animate={{ rotate: 15, y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <Polaroid image="/polaroid4.png" caption="" className="w-full" />
          </motion.div>

          <motion.div
            className="absolute -left-28 md:-left-36 bottom-40 w-16 h-22 sm:w-20 sm:h-28 opacity-25 z-0 hidden md:block pointer-events-none"
            animate={{ rotate: 8, y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Polaroid image="/polaroid2.png" caption="" className="w-full" />
          </motion.div>

          {/* Centered Closing Message */}
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <motion.h2
              className="text-5xl font-dancing text-rose-400 mb-6 text-balance"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              With All My Love
            </motion.h2>

            <motion.p
              className="text-lg text-stone-600 font-lora leading-relaxed mb-8 text-pretty"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Thank you for being the most incredible person to celebrate. You bring so much
              light and joy wherever you go. Here&apos;s to another year of adventures, laughter,
              and beautiful moments together.
            </motion.p>

            <motion.p
              className="text-pink-500 font-sacramento text-2xl"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              All my love & best wishes,
              <br />
              Always 💝
            </motion.p>

            {/* Floating Stickers */}
            <motion.div
              className="flex gap-6 justify-center mt-12"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {['🎉', '✨', '💖'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-4xl"
                  animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* Music Toggle Button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-30 bg-rose-300 hover:bg-rose-400 text-white rounded-full p-4 shadow-lg transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {musicPlaying ? '🔊' : '🔇'}
      </motion.button>
    </div>
  )
}
