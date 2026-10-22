let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function playLongCrankSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  for (let i = 0; i < 9; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(130 + (i % 3) * 45, now + i * 0.16)
    osc.frequency.exponentialRampToValueAtTime(65, now + i * 0.16 + 0.08)

    filter.type = 'bandpass'
    filter.frequency.value = 850
    filter.Q.value = 3.5

    gain.gain.setValueAtTime(0.25, now + i * 0.16)
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.16 + 0.09)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now + i * 0.16)
    osc.stop(now + i * 0.16 + 0.1)
  }
}

export function playDropSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const bounces = [
    { delay: 0, freq: 190, dur: 0.12, vol: 0.35 },
    { delay: 0.14, freq: 250, dur: 0.09, vol: 0.22 },
    { delay: 0.25, freq: 310, dur: 0.06, vol: 0.12 },
  ]

  bounces.forEach((b) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(b.freq, now + b.delay)
    osc.frequency.exponentialRampToValueAtTime(60, now + b.delay + b.dur)

    gain.gain.setValueAtTime(b.vol, now + b.delay)
    gain.gain.exponentialRampToValueAtTime(0.001, now + b.delay + b.dur)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now + b.delay)
    osc.stop(now + b.delay + b.dur)
  })
}

export function playPopSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(320, now)
  osc.frequency.exponentialRampToValueAtTime(950, now + 0.09)

  gain.gain.setValueAtTime(0.35, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.15)
}

export function playChimeSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const notes = [523.25, 659.25, 783.99]
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now + idx * 0.06)

    gain.gain.setValueAtTime(0.2, now + idx * 0.06)
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now + idx * 0.06)
    osc.stop(now + idx * 0.06 + 0.35)
  })
}

function playTrumpetTone(ctx: AudioContext, freq: number, startTime: number, duration: number, volume: number) {
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()

  osc1.type = 'sawtooth'
  osc1.frequency.setValueAtTime(freq, startTime)

  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(freq * 2, startTime)

  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(freq * 1.5, startTime)
  filter.frequency.exponentialRampToValueAtTime(freq * 4.5, startTime + 0.06)
  filter.frequency.exponentialRampToValueAtTime(freq * 2.2, startTime + duration)
  filter.Q.value = 4.2

  gain.gain.setValueAtTime(0.0001, startTime)
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.04)
  gain.gain.setValueAtTime(volume * 0.85, startTime + duration * 0.6)
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  osc1.connect(filter)
  osc2.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  osc1.start(startTime)
  osc2.start(startTime)
  osc1.stop(startTime + duration)
  osc2.stop(startTime + duration)
}

function playSparkleTone(ctx: AudioContext, freq: number, startTime: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, startTime)

  gain.gain.setValueAtTime(0.09, startTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(startTime)
  osc.stop(startTime + 0.5)
}

export function playTrumpetFanfare(isLegendary: boolean) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  if (isLegendary) {
    const fanfareNotes = [
      { freq: 392.0, time: 0.0, dur: 0.15 },
      { freq: 523.25, time: 0.14, dur: 0.15 },
      { freq: 659.25, time: 0.28, dur: 0.16 },
      { freq: 783.99, time: 0.43, dur: 0.22 },
      { freq: 659.25, time: 0.65, dur: 0.14 },
      { freq: 783.99, time: 0.78, dur: 0.15 },
      { freq: 1046.5, time: 0.93, dur: 0.9 },
    ]

    fanfareNotes.forEach((n) => {
      playTrumpetTone(ctx, n.freq, now + n.time, n.dur, 0.45)
    })

    const sparkles = [1200, 1600, 2100, 2600, 3200]
    sparkles.forEach((sf, i) => {
      playSparkleTone(ctx, sf, now + 0.95 + i * 0.1)
    })
  } else {
    const victoryNotes = [
      { freq: 440.0, time: 0.0, dur: 0.12 },
      { freq: 554.37, time: 0.11, dur: 0.12 },
      { freq: 659.25, time: 0.22, dur: 0.16 },
      { freq: 880.0, time: 0.38, dur: 0.6 },
    ]

    victoryNotes.forEach((n) => {
      playTrumpetTone(ctx, n.freq, now + n.time, n.dur, 0.35)
    })
  }
}
