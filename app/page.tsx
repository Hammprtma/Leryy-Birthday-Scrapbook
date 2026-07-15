'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronDown, Play, Pause } from 'lucide-react'

// ════════════════════════════════════════════
// LAYERED PARTICLES — bokeh, stars, hearts
// ════════════════════════════════════════════
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const rand = Math.random()
  let type: 'bokeh' | 'star' | 'heart'
  if (rand < 0.4) type = 'bokeh'
  else if (rand < 0.75) type = 'star'
  else type = 'heart'
  return {
    id: i,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 15,
    x: Math.random() * 100,
    swayAmount: 15 + Math.random() * 25,
    swayDuration: 6 + Math.random() * 6,
    size: type === 'bokeh' ? 20 + Math.random() * 40 : 10 + Math.random() * 14,
    opacity: 0.1 + Math.random() * 0.3,
    type,
  }
})

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ contain: 'strict' }}>
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{ left: `${p.x}%`, willChange: 'transform, opacity' }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            x: [0, p.swayAmount, -p.swayAmount, 0],
            opacity: [0, p.opacity, p.opacity * 0.7, 0],
          }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: p.swayDuration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
          }}
        >
          {p.type === 'bokeh' && (
            <div
              className="rounded-full"
              style={{
                width: p.size, height: p.size,
                background: 'radial-gradient(circle, rgba(229,183,105,0.3) 0%, rgba(229,183,105,0.05) 60%, transparent 100%)',
                filter: 'blur(4px)',
              }}
            />
          )}
          {p.type === 'star' && <span style={{ fontSize: `${p.size}px` }}>✨</span>}
          {p.type === 'heart' && <span style={{ fontSize: `${p.size}px`, opacity: 0.6 }}>💖</span>}
        </motion.div>
      ))}
    </div>
  )
}

// ════════════════════════════════════════════
// GIFT TAG SVG — w-36 (144px rendered)
// ════════════════════════════════════════════
function GiftTag() {
  return (
    <svg width="144" height="210" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
      <path d="M30 0 Q32 12, 30 18" stroke="#8b7355" strokeWidth="1.2" fill="none" />
      <path d="M10 18 L50 18 L50 85 L30 90 L10 85 Z" fill="#d4c5a9" stroke="#8b7355" strokeWidth="0.8" />
      <circle cx="30" cy="26" r="4" fill="#2a2421" stroke="#8b7355" strokeWidth="0.6" />
      <line x1="18" y1="38" x2="42" y2="38" stroke="#8b7355" strokeWidth="0.5" opacity="0.5" />
      <line x1="18" y1="45" x2="42" y2="45" stroke="#8b7355" strokeWidth="0.5" opacity="0.5" />
      <line x1="18" y1="52" x2="35" y2="52" stroke="#8b7355" strokeWidth="0.5" opacity="0.5" />
      <text x="19" y="70" fontSize="11" fill="#c47a7a" opacity="0.6" fontFamily="cursive">for you</text>
      <text x="24" y="82" fontSize="14" fill="#c47a7a" opacity="0.7">♥</text>
    </svg>
  )
}

// ════════════════════════════════════════════
// FILM STRIP — w-40+ (140×100px images)
// ════════════════════════════════════════════
function FilmStrip() {
  return (
    <div className="film-strip hidden md:flex">
      <img src="/polaroid1.png" alt="Memory 1" loading="lazy" decoding="async" />
      <img src="/polaroid3.png" alt="Memory 2" loading="lazy" decoding="async" />
      <img src="/polaroid5.png" alt="Memory 3" loading="lazy" decoding="async" />
    </div>
  )
}

// ════════════════════════════════════════════
// WASHI TAPE DATA
// ════════════════════════════════════════════
const WASHI_COLORS = ['bg-red-500/50','bg-amber-600/50','bg-emerald-600/40','bg-sky-500/40','bg-pink-400/50','bg-violet-500/40','bg-orange-400/50','bg-teal-500/40']
const WASHI_ROTATIONS = [-3, 2, -1, 4, -2, 1, -4, 3]

// ════════════════════════════════════════════
// DECORATIVE SVG DOODLES
// ════════════════════════════════════════════
function DoodleStar({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2L16.5 11.5L26 14L16.5 16.5L14 26L11.5 16.5L2 14L11.5 11.5L14 2Z" stroke="#e5b769" strokeWidth="1.2" fill="none" opacity="0.5" />
    </svg>
  )
}

function DoodleHeart({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C12 21 2 14 2 7.5C2 4 4.5 2 7 2C9 2 11 3.5 12 5C13 3.5 15 2 17 2C19.5 2 22 4 22 7.5C22 14 12 21 12 21Z" stroke="#c47a7a" strokeWidth="1.2" fill="none" opacity="0.4" />
    </svg>
  )
}

function DoodleSquiggle({ className }: { className?: string }) {
  return (
    <svg className={className} width="60" height="16" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8C8 2 12 14 18 8C24 2 28 14 34 8C40 2 44 14 50 8C56 2 58 8 58 8" stroke="#e5b769" strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round" />
    </svg>
  )
}

function DoodleSparkle({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L10 7L16 9L10 11L9 17L8 11L2 9L8 7L9 1Z" fill="#e5b769" opacity="0.25" />
    </svg>
  )
}

// ════════════════════════════════════════════
// POLAROID COMPONENT
// ════════════════════════════════════════════
interface PolaroidProps {
  image: string; caption: string; washiColor?: string; washiRotate?: number
  rotation?: number; style?: React.CSSProperties; className?: string
  onClick?: () => void
}

function Polaroid({ image, caption, washiColor = 'bg-amber-600/50', washiRotate = -2, rotation = 0, style, className = '', onClick }: PolaroidProps) {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ ...style, rotate: rotation }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50, boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <div className={`washi-tape ${washiColor}`} style={{ transform: `translateX(-50%) rotate(${washiRotate}deg)` }} />
      <div className="bg-white p-3 shadow-lg rounded-sm w-full">
        <img src={image} alt={caption} className="w-full h-32 object-cover object-center rounded-sm" loading="lazy" decoding="async" />
        <p className="mt-2 text-xs font-sacramento text-stone-500 text-center whitespace-normal leading-tight">{caption}</p>
      </div>
    </motion.div>
  )
}

// ════════════════════════════════════════════
// POLAROID LIGHTBOX MODAL
// ════════════════════════════════════════════
function PolaroidLightbox({ image, caption, onClose }: { image: string; caption: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-zoom-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative cursor-default"
        initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotate: 3 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-4 sm:p-6 shadow-2xl rounded-sm max-w-[90vw] max-h-[85vh]">
          <img
            src={image}
            alt={caption}
            className="max-w-[80vw] max-h-[65vh] w-auto h-auto object-contain rounded-sm"
          />
          <p className="mt-3 text-sm sm:text-base font-sacramento text-stone-500 text-center">{caption}</p>
        </div>
        {/* Close hint */}
        <motion.p
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 font-inter text-xs tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          click anywhere to close
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

// ════════════════════════════════════════════
// GLASSMORPHISM SCROLL BUTTON
// ════════════════════════════════════════════
function ScrollButton({ targetId }: { targetId: string }) {
  return (
    <motion.button
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-[#e5b769]/50 flex items-center justify-center shadow-lg hover:bg-white/15 transition-colors"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <ChevronDown size={28} className="text-[#e5b769] drop-shadow-[0_0_8px_rgba(229,183,105,0.6)]" />
    </motion.button>
  )
}

// ════════════════════════════════════════════
// FLOATING STICKER
// ════════════════════════════════════════════
function FloatingSticker({ emoji, className, delay = 0, duration = 3.5 }: { emoji: string; className: string; delay?: number; duration?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      {emoji}
    </motion.div>
  )
}

// ════════════════════════════════════════════
// AUDIO WAVE INDICATOR
// ════════════════════════════════════════════
function AudioWave() {
  return (
    <div className="flex items-center gap-[3px] h-5">
      <div className="audio-bar audio-bar-1" />
      <div className="audio-bar audio-bar-2" />
      <div className="audio-bar audio-bar-3" />
      <div className="audio-bar audio-bar-4" />
    </div>
  )
}

// ════════════════════════════════════════════
// VINYL RECORD VOICE NOTES
// ════════════════════════════════════════════
const VOICE_NOTES = [
  { id: 1, name: 'Bestie', emoji: '👩‍🦰', src: '/audio/friend1.mp3', labelColor: '#e8b4b8' },
  { id: 2, name: 'Squad', emoji: '👯', src: '/audio/friend2.mp3', labelColor: '#e5c690' },
  { id: 3, name: 'Partner in Crime', emoji: '🧑‍🤝‍🧑', src: '/audio/friend3.mp3', labelColor: '#a8cce0' },
  { id: 4, name: 'The Fam', emoji: '👨‍👩‍👧', src: '/audio/friend4.mp3', labelColor: '#a8d8b9' },
]

function VinylRecord({ name, emoji, src, labelColor }: { name: string; emoji: string; src: string; labelColor: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.addEventListener('ended', () => setIsPlaying(false))
      audioRef.current.addEventListener('error', () => setIsPlaying(false))
    }
    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Vinyl disc */}
      <motion.div
        className="vinyl-record relative cursor-pointer"
        onClick={togglePlay}
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={
          isPlaying
            ? { repeat: Infinity, duration: 4, ease: 'linear' }
            : { duration: 0 }
        }
        whileHover={{ scale: 1.05 }}
      >
        {/* Outer disc with grooves */}
        <div className="vinyl-disc">
          {/* Groove rings */}
          <div className="vinyl-groove vinyl-groove-1" />
          <div className="vinyl-groove vinyl-groove-2" />
          <div className="vinyl-groove vinyl-groove-3" />
          <div className="vinyl-groove vinyl-groove-4" />
          <div className="vinyl-groove vinyl-groove-5" />

          {/* Center label */}
          <div className="vinyl-label" style={{ backgroundColor: labelColor }}>
            <span className="text-2xl mb-0.5">{emoji}</span>
            <p className="font-sacramento text-stone-700 text-sm leading-tight text-center px-1">{name}</p>
          </div>

          {/* Spindle hole */}
          <div className="vinyl-spindle" />
        </div>

        {/* Play/Pause overlay button */}
        <motion.div
          className="vinyl-play-btn"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {isPlaying
            ? <Pause size={20} className="text-white" />
            : <Play size={20} className="text-white ml-0.5" />
          }
        </motion.div>

        {/* Glow when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: `0 0 30px ${labelColor}40, 0 0 60px ${labelColor}20` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Status text below */}
      <div className="text-center">
        <p className="font-sacramento text-[#c4a882] text-lg">{name}</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          {isPlaying && <AudioWave />}
          <p className="text-[11px] text-[#8b7355]/70 font-inter">
            {isPlaying ? 'Now playing...' : 'Tap to play'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════
const GALLERY_ITEMS = [
  { image: '/polaroid1.png', caption: 'Morning runs ☀️',            rotation: -5,  top: '0%',  left: '5%' },
  { image: '/polaroid2.png', caption: 'Food hunting adventures 🍜', rotation: 3,   top: '3%',  left: '27%' },
  { image: '/polaroid5.png', caption: 'Brunch dates 🥐',            rotation: -3,  top: '1%',  left: '50%' },
  { image: '/polaroid6.png', caption: 'Golden hour ✨',              rotation: 5,   top: '4%',  left: '73%' },
  { image: '/polaroid3.png', caption: 'candid queen 👑',            rotation: 4,   top: '50%', left: '8%' },
  { image: '/polaroid7.png', caption: 'Peaceful sunsets 🌅',        rotation: -6,  top: '48%', left: '30%' },
  { image: '/polaroid4.png', caption: 'Our happy place 💫',         rotation: 3,   top: '52%', left: '52%' },
  { image: '/polaroid8.png', caption: 'Pure joy 💖',                rotation: -4,  top: '47%', left: '74%' },
]

const POEM_STANZAS = [
  ['In every sunrise, I see your smile,', 'In every moment, it\'s worth your while.'],
  ['With every step, you\'re running free,', 'Living fully, just as you should be.'],
  ['The world tastes sweeter when you\'re near,', 'Each memory this year we hold so dear.'],
  ['So here\'s to you, wonderful soul,', 'May this year complete your every goal.'],
]

// ════════════════════════════════════════════
// HERO STAGGER VARIANTS
// ════════════════════════════════════════════
const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.5 },
  },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
}

// ════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════
export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [selectedPolaroid, setSelectedPolaroid] = useState<{ image: string; caption: string } | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const melodyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  useEffect(() => {
    return () => {
      if (melodyTimeoutRef.current) clearTimeout(melodyTimeoutRef.current)
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current)
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {})
    }
  }, [])

  // Show notification when overlay is dismissed
  useEffect(() => {
    if (!showOverlay) {
      setShowNotification(true)
      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(false)
      }, 4000)
    }
  }, [showOverlay])

  const toggleMusic = async () => {
    try {
      const ctx = getAudioContext()
      if (musicPlaying) {
        await ctx.suspend().catch(() => {})
        setMusicPlaying(false)
      } else {
        await ctx.resume().catch(() => {})
        if (ctx.state === 'running') { playMelody(ctx); setMusicPlaying(true) }
      }
    } catch { console.warn('Audio blocked.'); setMusicPlaying(false) }
  }

  const playMelody = (ctx: AudioContext) => {
    const notes = [
      { freq: 261.63, duration: 0.5 }, { freq: 293.66, duration: 0.5 },
      { freq: 329.63, duration: 0.5 }, { freq: 349.23, duration: 1 },
      { freq: 329.63, duration: 0.5 }, { freq: 349.23, duration: 0.5 },
      { freq: 392, duration: 1 },
    ]
    let time = ctx.currentTime, totalDuration = 0
    notes.forEach(({ freq, duration }) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain()
      osc.frequency.value = freq; osc.type = 'sine'
      gain.gain.setValueAtTime(0.1, time)
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(time); osc.stop(time + duration)
      totalDuration += duration + 0.05; time += duration + 0.05
    })
    melodyTimeoutRef.current = setTimeout(() => setMusicPlaying(false), totalDuration * 1000)
  }

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <FloatingParticles />

      {/* ═══ POLAROID LIGHTBOX ═══ */}
      <AnimatePresence>
        {selectedPolaroid && (
          <PolaroidLightbox
            image={selectedPolaroid.image}
            caption={selectedPolaroid.caption}
            onClose={() => setSelectedPolaroid(null)}
          />
        )}
      </AnimatePresence>

      {/* ═══ CURTAIN REVEAL OVERLAY ═══ */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 bg-[#2a2421] z-40 flex items-center justify-center"
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: '-100vh', opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                💌
              </motion.div>
              <p className="text-[#c4a882] font-sacramento text-xl mb-2">you have a letter...</p>
              <p className="text-[#8b7355] font-inter text-sm mb-8">siapkan speaker kamu</p>
              <motion.button
                onClick={() => setShowOverlay(false)}
                className="px-8 py-3 bg-transparent border-2 border-[#e5b769] text-[#e5b769] font-lora text-lg rounded-full tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,183,105,0.6)] hover:bg-[#e5b769]/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Buka ✨
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SCROLL-SNAP CONTAINER ═══ */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide relative z-10">

        {/* ─── SEGMENT 1 · HERO ─── */}
        <section
          id="hero"
          className="min-h-screen w-full snap-center flex flex-col justify-center items-center relative overflow-hidden px-4"
        >
          {/* Blurred background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img src="/polaroid2.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-3xl scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a2421]/50 via-transparent to-[#2a2421]/70" />
          </div>

          {/* ── Scattered Polaroids (decorative) ── */}
          <motion.div
            className="absolute top-10 left-4 md:left-10 lg:left-20 w-24 h-32 sm:w-32 sm:h-40 z-0 pointer-events-none opacity-30 hidden sm:block"
            animate={{ rotate: [-12, -10, -12], y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Polaroid image="/polaroid3.png" caption="💭" className="w-full" rotation={-12} />
          </motion.div>
          <motion.div
            className="absolute top-16 right-4 md:right-10 lg:right-20 w-24 h-32 sm:w-28 sm:h-36 z-0 pointer-events-none opacity-30 hidden sm:block"
            animate={{ rotate: [6, 8, 6], y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Polaroid image="/polaroid6.png" caption="✨" className="w-full" rotation={6} />
          </motion.div>

          {/* ── SVG Doodles ── */}
          <motion.div className="absolute top-[12%] left-[15%] pointer-events-none z-0 hidden md:block"
            animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <DoodleStar />
          </motion.div>
          <motion.div className="absolute top-[18%] right-[12%] pointer-events-none z-0 hidden md:block"
            animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
            <DoodleHeart />
          </motion.div>
          <motion.div className="absolute bottom-[22%] left-[8%] pointer-events-none z-0 hidden md:block"
            animate={{ rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <DoodleSquiggle />
          </motion.div>
          <motion.div className="absolute bottom-[28%] right-[14%] pointer-events-none z-0 hidden md:block"
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <DoodleSparkle />
          </motion.div>
          <motion.div className="absolute top-[45%] left-[6%] pointer-events-none z-0 hidden lg:block"
            animate={{ rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <DoodleStar className="opacity-30" />
          </motion.div>
          <motion.div className="absolute top-[35%] right-[6%] pointer-events-none z-0 hidden lg:block"
            animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <DoodleHeart className="opacity-30" />
          </motion.div>

          {/* ── Hero Content ── */}
          <motion.div
            className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center"
            variants={heroContainer}
            initial="hidden"
            animate={showOverlay ? 'hidden' : 'visible'}
          >
            {/* Large envelope */}
            <motion.div
              className="text-7xl md:text-8xl mb-6"
              variants={heroItem}
              animate={showOverlay ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              💌
            </motion.div>

            {/* Main title */}
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-dancing text-[#e5b769] mb-6 text-balance leading-[1.1]"
              style={{ textShadow: '0 2px 24px rgba(229,183,105,0.4), 0 4px 48px rgba(229,183,105,0.15)' }}
              variants={heroItem}
            >
              Suka Duka Sama Kamu
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-[#c4a882]/80 font-inter text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto"
              variants={heroItem}
            >
              Here&apos;s to celebrating you and all the beautiful moments we&apos;ve shared
              together. You&apos;re absolutely wonderful, and this year is going to be magical.
            </motion.p>

            {/* Open the note pill button */}
            <motion.button
              className="px-6 py-2.5 rounded-full border border-[#e5b769]/50 text-[#e5b769] font-inter text-sm tracking-wide bg-transparent hover:bg-[#e5b769]/10 hover:border-[#e5b769]/80 transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,183,105,0.3)] flex items-center gap-2"
              variants={heroItem}
              onClick={() => document.getElementById('poem')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              open the note
              <ChevronDown size={16} className="animate-bounce" />
            </motion.button>
          </motion.div>

          <ScrollButton targetId="poem" />
        </section>

        {/* ─── SEGMENT 2 · POEM ─── */}
        <section
          id="poem"
          className="min-h-screen w-full snap-center flex flex-col justify-center items-center relative overflow-hidden px-4 py-20"
        >
          {/* Background polaroids */}
          <motion.div className="absolute left-2 md:left-[10%] lg:left-[14%] top-[18%] w-28 h-36 md:w-36 md:h-44 z-0 pointer-events-none opacity-25 blur-[1px]"
            animate={{ rotate: [-12, -10, -12], y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <Polaroid image="/polaroid4.png" caption="" className="w-full" rotation={-12} />
          </motion.div>
          <motion.div className="absolute left-0 md:left-[8%] lg:left-[12%] bottom-[16%] w-24 h-32 md:w-32 md:h-40 z-0 pointer-events-none opacity-20 blur-[1px]"
            animate={{ rotate: [8, 6, 8], y: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
            <Polaroid image="/polaroid8.png" caption="" className="w-full" rotation={8} />
          </motion.div>
          <motion.div className="absolute right-2 md:right-[9%] lg:right-[13%] top-[14%] w-28 h-36 md:w-34 md:h-42 z-0 pointer-events-none opacity-25 blur-[1px]"
            animate={{ rotate: [10, 12, 10], y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
            <Polaroid image="/polaroid6.png" caption="" className="w-full" rotation={10} />
          </motion.div>
          <motion.div className="absolute right-4 md:right-[11%] lg:right-[15%] bottom-[20%] w-24 h-32 md:w-30 md:h-38 z-0 pointer-events-none opacity-20 blur-[1px]"
            animate={{ rotate: [-6, -8, -6], y: [0, 7, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}>
            <Polaroid image="/polaroid2.png" caption="" className="w-full" rotation={-6} />
          </motion.div>

          {/* Breathing paper wrapper */}
          <motion.div
            className="max-w-2xl w-full mx-auto relative z-10"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Film Strip — z-20, hanging left edge */}
            <FilmStrip />

            {/* Gift Tag — z-20, swinging right edge */}
            <div className="gift-tag hidden md:block">
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: 'top center' }}
              >
                <GiftTag />
              </motion.div>
            </div>

            {/* Paper Card */}
            <motion.div
              className="paper-card px-8 py-14 sm:px-14 sm:py-18 rotate-1 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl font-dancing text-stone-700 text-center mb-10"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                A Little Something for You
              </motion.h2>

              <motion.div
                className="font-typewriter text-stone-700 text-center leading-loose text-base sm:text-lg space-y-6"
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.45 } } }}
              >
                {POEM_STANZAS.map((stanza, si) => (
                  <motion.div key={si} className="space-y-1"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
                    {stanza.map((line, li) => (
                      <motion.p key={li} className="flex flex-wrap justify-center gap-x-1.5">
                        {line.split(' ').map((word, wi) => (
                          <motion.span key={wi}
                            variants={{
                              hidden: { opacity: 0, y: 4, filter: 'blur(8px)' },
                              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                            }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}>
                            {word}
                          </motion.span>
                        ))}
                      </motion.p>
                    ))}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="text-center mt-12 text-stone-400 text-2xl"
                initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }} transition={{ delay: 3, duration: 0.8 }}>
                ✦
              </motion.div>
            </motion.div>
          </motion.div>

          <ScrollButton targetId="gallery" />
        </section>

        {/* ─── SEGMENT 3 · GALLERY ─── */}
        <section
          id="gallery"
          className="min-h-screen w-full snap-center flex flex-col justify-center items-center relative overflow-hidden px-4 py-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-dancing text-[#e5b769] text-center mb-16 text-balance"
            style={{ textShadow: '0 2px 12px rgba(229,183,105,0.2)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Our Favorite Memories
          </motion.h2>

          <div className="max-w-5xl w-full mx-auto relative z-10">
            {/* Mobile */}
            <div className="flex flex-wrap justify-center gap-6 md:hidden">
              {GALLERY_ITEMS.map((item, index) => (
                <motion.div key={index} className="w-36 h-48 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100, damping: 10 }}>
                  <Polaroid image={item.image} caption={item.caption} washiColor={WASHI_COLORS[index]}
                    washiRotate={WASHI_ROTATIONS[index]} rotation={item.rotation} className="w-full h-full"
                    onClick={() => setSelectedPolaroid({ image: item.image, caption: item.caption })} />
                </motion.div>
              ))}
            </div>
            {/* Desktop */}
            <div className="hidden md:block relative" style={{ height: '640px' }}>
              {GALLERY_ITEMS.map((item, index) => (
                <motion.div key={index} className="absolute"
                  style={{ top: item.top, left: item.left, width: '200px' }}
                  initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 100, damping: 10 }}>
                  <Polaroid image={item.image} caption={item.caption} washiColor={WASHI_COLORS[index]}
                    washiRotate={WASHI_ROTATIONS[index]} rotation={item.rotation} className="w-full"
                    onClick={() => setSelectedPolaroid({ image: item.image, caption: item.caption })} />
                </motion.div>
              ))}
            </div>
          </div>

          <ScrollButton targetId="voice-notes" />
        </section>

        {/* ─── SEGMENT 4 · VOICE NOTES ─── */}
        <section
          id="voice-notes"
          className="min-h-screen w-full snap-center flex flex-col justify-center items-center relative overflow-hidden px-4 py-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-dancing text-[#e5b769] text-center mb-4 text-balance"
            style={{ textShadow: '0 2px 12px rgba(229,183,105,0.2)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Messages from Your Favorite People
          </motion.h2>
          <motion.p
            className="text-[#c4a882]/70 font-lora text-base mb-12 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
          >
            tap to hear their birthday wishes 🎧
          </motion.p>

          <div className="flex flex-wrap justify-center gap-10 md:gap-14 max-w-5xl">
            {VOICE_NOTES.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 120, damping: 14 }}
              >
                <VinylRecord name={note.name} emoji={note.emoji} src={note.src} labelColor={note.labelColor} />
              </motion.div>
            ))}
          </div>

          {/* Scattered decorative elements */}
          <FloatingSticker emoji="🎵" className="top-[15%] left-[8%] text-2xl opacity-40" delay={0} duration={3.5} />
          <FloatingSticker emoji="🎶" className="top-[20%] right-[10%] text-xl opacity-30" delay={1} duration={4} />
          <FloatingSticker emoji="📻" className="bottom-[18%] left-[12%] text-2xl opacity-30" delay={0.5} duration={3.8} />
          <FloatingSticker emoji="💿" className="bottom-[22%] right-[8%] text-2xl opacity-35" delay={1.5} duration={4.2} />

          <ScrollButton targetId="footer" />
        </section>

        {/* ─── SEGMENT 5 · FOOTER ─── */}
        <section
          id="footer"
          className="min-h-screen w-full snap-center flex flex-col justify-center items-center relative overflow-hidden px-4 py-20"
        >
          <FloatingSticker emoji="💖" className="top-[8%] left-[8%] text-2xl" delay={0} duration={3} />
          <FloatingSticker emoji="✨" className="top-[12%] right-[10%] text-3xl" delay={0.4} duration={3.5} />
          <FloatingSticker emoji="🎀" className="top-[25%] left-[5%] text-2xl" delay={1.2} duration={4} />
          <FloatingSticker emoji="🌸" className="top-[30%] right-[7%] text-2xl" delay={0.8} duration={3.2} />
          <FloatingSticker emoji="💫" className="top-[45%] left-[3%] text-xl opacity-60" delay={2} duration={3.8} />
          <FloatingSticker emoji="🎂" className="bottom-[22%] left-[7%] text-3xl" delay={0.5} duration={4.2} />
          <FloatingSticker emoji="🐱" className="bottom-[28%] right-[8%] text-3xl" delay={1.5} duration={3.6} />
          <FloatingSticker emoji="🌹" className="bottom-[10%] left-[14%] text-2xl" delay={1} duration={3.4} />
          <FloatingSticker emoji="💌" className="bottom-[12%] right-[12%] text-2xl" delay={1.8} duration={3.9} />
          <FloatingSticker emoji="🦋" className="top-[10%] left-[42%] text-xl opacity-50" delay={2.5} duration={4.5} />
          <FloatingSticker emoji="🌟" className="bottom-[6%] left-[40%] text-xl opacity-50" delay={0.3} duration={3.7} />
          <FloatingSticker emoji="✨" className="top-[50%] right-[4%] text-xl opacity-40" delay={1.6} duration={4.1} />
          <FloatingSticker emoji="🎀" className="bottom-[40%] left-[12%] text-lg opacity-50" delay={2.2} duration={3.3} />

          <div className="relative z-10 flex flex-col items-center w-full max-w-xl">
            <motion.h2
              className="text-5xl md:text-6xl font-dancing text-[#e5b769] text-center mb-12 text-balance"
              style={{ textShadow: '0 2px 16px rgba(229,183,105,0.3)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
            >
              With All My Love
            </motion.h2>

            <motion.div className="w-full"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }}>
              <div className="paper-card p-8 sm:p-10 -rotate-1">
                <p className="text-base sm:text-lg text-stone-700 font-lora leading-relaxed mb-6 text-center">
                  I hope this new chapter brings you all the adventures, laughter,
                  and beautiful moments you deserve. You bring so much
                  light wherever you go.
                </p>
                <div className="border-t border-stone-300/50 pt-5 mt-4">
                  <p className="text-stone-500 font-sacramento text-2xl sm:text-3xl text-right pr-4">
                    All my love &amp; best wishes,<br />Always 💝
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div className="flex gap-8 justify-center mt-14"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }}>
              {['🎉', '✨', '💖'].map((emoji, i) => (
                <motion.span key={i} className="text-4xl"
                  animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.15 }}>
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

      </div>

      {/* ═══ Notification Popup ═══ */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed bottom-20 right-4 sm:right-8 z-30 bg-white/10 backdrop-blur-md text-[#e5b769] px-4 py-2.5 rounded-full shadow-lg border border-[#e5b769]/30 flex items-center gap-2 text-sm font-inter"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span>✨</span>
            <span>Scroll untuk melihat kenangan</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Music Toggle ═══ */}
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-30 bg-[#e5b769]/15 hover:bg-[#e5b769]/25 border border-[#e5b769]/40 text-[#e5b769] rounded-full p-4 shadow-lg transition-all backdrop-blur-sm"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
      >
        {musicPlaying ? '🔊' : '🔇'}
      </motion.button>
    </div>
  )
}
