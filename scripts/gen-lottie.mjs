// Generates the profile accessory animations (Lottie JSON) into src/assets/lottie.
//   node scripts/gen-lottie.mjs
// Every animation is built from plain shapes (ellipses, stars, strokes) and loops seamlessly. They are written by
// code instead of exported from a design tool so the look can be tuned here and reviewed as a diff.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'lottie')
mkdirSync(OUT, { recursive: true })

const rgb = (r, g, b) => [r / 255, g / 255, b / 255, 1]
const still = (k) => ({ a: 0, k })
const EASE = { i: { x: [0.45], y: [1] }, o: { x: [0.55], y: [0] } }
const LIN = { i: { x: [1], y: [1] }, o: { x: [0], y: [0] } }

/** Animated property from [time, value, hold?] frames. Values are arrays. */
const anim = (frames, ease = EASE) => ({
  a: 1,
  k: frames.map(([t, s, hold], idx) => {
    const kf = { t, s: Array.isArray(s) ? s : [s] }
    if (idx < frames.length - 1) Object.assign(kf, hold ? { h: 1 } : ease)
    return kf
  }),
})

const transform = (o = {}) => ({
  ty: 'tr',
  p: o.p ?? still([0, 0]),
  a: still([0, 0]),
  s: o.s ?? still([100, 100]),
  r: o.r ?? still(0),
  o: o.o ?? still(100),
  sk: still(0),
  sa: still(0),
})

const group = (items, tr, nm = 'g') => ({ ty: 'gr', nm, it: [...items, transform(tr)] })
const ellipse = (w, h = w, p = [0, 0]) => ({ ty: 'el', nm: 'ellipse', d: 1, p: still(p), s: still([w, h]) })
const star = (points, outer, inner, rot = 0) => ({
  ty: 'sr', nm: 'star', sy: 1, d: 1, pt: still(points), p: still([0, 0]), r: still(rot),
  ir: still(inner), is: still(0), or: still(outer), os: still(0),
})
const fill = (c, o = 100) => ({ ty: 'fl', nm: 'fill', c: still(c), o: still(o), r: 1 })
const stroke = (c, w, { o = still(100), dash } = {}) => {
  const s = { ty: 'st', nm: 'stroke', c: still(c), o, w: still(w), lc: 2, lj: 2 }
  if (dash) {
    s.d = [
      { n: 'd', nm: 'dash', v: still(dash.on) },
      { n: 'g', nm: 'gap', v: still(dash.off) },
      { n: 'o', nm: 'offset', v: dash.offset },
    ]
  }
  return s
}

let ind = 0
const layer = (shapes, { o, r, p, s, a, nm = 'layer' } = {}, len) => ({
  ddd: 0, ind: ++ind, ty: 4, nm, sr: 1,
  ks: {
    o: o ?? still(100), r: r ?? still(0), p: p ?? still([0, 0, 0]),
    a: a ?? still([0, 0, 0]), s: s ?? still([100, 100, 100]),
  },
  ao: 0, shapes, ip: 0, op: len, st: 0, bm: 0,
})

const comp = (name, w, h, len, layers) => ({
  v: '5.7.0', fr: 30, ip: 0, op: len, w, h, nm: name, ddd: 0, assets: [], layers,
})

const save = (name, json) => writeFileSync(join(OUT, `${name}.json`), JSON.stringify(json))

/* ------------------------------------------------------------------------------------------------------------ */
/* Frames: 200x200, centre (100,100). The avatar fills the middle 64%, so rings sit between radius 66 and 96.      */
/* ------------------------------------------------------------------------------------------------------------ */
const C = [100, 100, 0]
const spin = (len, turns = 1) => anim([[0, 0], [len, 360 * turns]], LIN)
const ring = (radius, c, w, extra) => group([ellipse(radius * 2), stroke(c, w, extra)], {}, 'ring')

function frameNeon() {
  const len = 90
  ind = 0
  return comp('neon', 200, 200, len, [
    layer([ring(80, rgb(255, 60, 200), 2.5)], {
      nm: 'outer', p: still(C), s: anim([[0, [96, 96, 100]], [45, [104, 104, 100]], [90, [96, 96, 100]]]),
      o: anim([[0, 55], [45, 95], [90, 55]]),
    }, len),
    layer([ring(70, rgb(0, 230, 255), 5)], {
      nm: 'inner', p: still(C), o: anim([[0, 70], [45, 100], [90, 70]]),
    }, len),
  ])
}

const orbit = (n, radius, make) =>
  Array.from({ length: n }, (_, i) => {
    const ang = (i / n) * Math.PI * 2
    return make(i, [Math.cos(ang) * radius, Math.sin(ang) * radius], (ang * 180) / Math.PI)
  })

function frameStars() {
  const len = 150
  ind = 0
  const stars = orbit(4, 78, (i, pos) =>
    group([star(4, i % 2 ? 7 : 10, 2.6), fill(rgb(255, 224, 102))], {
      p: still(pos),
      s: anim([[0, i % 2 ? [60, 60] : [100, 100]], [75, i % 2 ? [100, 100] : [60, 60]], [150, i % 2 ? [60, 60] : [100, 100]]]),
    }),
  )
  return comp('stars', 200, 200, len, [
    layer([ring(70, rgb(255, 224, 102), 2, { o: still(45) })], { nm: 'trace', p: still(C) }, len),
    layer(stars, { nm: 'orbit', p: still(C), r: spin(len) }, len),
  ])
}

function frameSakura() {
  const len = 180
  ind = 0
  const petals = orbit(6, 77, (_, pos, deg) =>
    group([ellipse(9, 17), fill(rgb(255, 154, 190))], { p: still(pos), r: still(deg + 90) }),
  )
  return comp('sakura', 200, 200, len, [
    layer([ring(70, rgb(255, 183, 213), 3, { o: still(60) })], { nm: 'trace', p: still(C) }, len),
    layer(petals, {
      nm: 'orbit', p: still(C), r: spin(len),
      o: anim([[0, 100], [90, 80], [180, 100]]),
    }, len),
  ])
}

function frameFlame() {
  const len = 96
  ind = 0
  return comp('flame', 200, 200, len, [
    layer(
      [ring(80, rgb(255, 214, 51), 3, { dash: { on: 5, off: 11, offset: anim([[0, 0], [len, 96]], LIN) } })],
      { nm: 'sparks', p: still(C), o: anim([[0, 90], [24, 60], [48, 100], [72, 70], [96, 90]]) }, len,
    ),
    layer(
      [ring(71, rgb(255, 98, 28), 7, { dash: { on: 16, off: 9, offset: anim([[0, 0], [len, -100]], LIN) } })],
      { nm: 'fire', p: still(C), o: anim([[0, 100], [20, 78], [40, 100], [60, 82], [80, 100], [96, 100]]) }, len,
    ),
  ])
}

function frameHalo() {
  const len = 120
  ind = 0
  const sparkle = (pos, phase) =>
    layer([group([star(4, 9, 2.4), fill(rgb(255, 250, 220))], { p: still(pos) })], {
      nm: 'sparkle', p: still(C),
      s: anim([[0, [0, 0, 100]], [phase, [0, 0, 100]], [phase + 14, [110, 110, 100]], [phase + 30, [0, 0, 100]], [len, [0, 0, 100]]]),
    }, len)
  return comp('halo', 200, 200, len, [
    layer([ring(78, rgb(255, 214, 80), 9, { o: still(22) })], {
      nm: 'glow', p: still(C), o: anim([[0, 60], [60, 100], [120, 60]]),
    }, len),
    layer([ring(70, rgb(255, 207, 64), 5)], { nm: 'ring', p: still(C) }, len),
    sparkle([-50, -52], 4),
    sparkle([62, -34], 38),
    sparkle([8, 74], 76),
  ])
}

function frameRainbow() {
  const len = 120
  ind = 0
  const dash = (on, off, dir) => ({ dash: { on, off, offset: anim([[0, 0], [len, dir * (on + off) * 4]], LIN) } })
  return comp('rainbow', 200, 200, len, [
    layer([ring(82, rgb(120, 190, 255), 4, dash(18, 10, 1))], { nm: 'blue', p: still(C) }, len),
    layer([ring(75, rgb(120, 230, 150), 4, dash(26, 8, -1))], { nm: 'green', p: still(C) }, len),
    layer([ring(68, rgb(255, 120, 190), 4, dash(14, 12, 1))], { nm: 'pink', p: still(C) }, len),
  ])
}

/* ------------------------------------------------------------------------------------------------------------ */
/* Effects: 800x200, drawn over the banner (scaled to cover it). Particles loop by wrapping off screen.          */
/* ------------------------------------------------------------------------------------------------------------ */
// Position keyframes for something that travels from y0 to the far edge, wraps to the near edge and continues,
// so every particle starts at a different point of its path and the loop has no seam.
function wrapPath(x0, y0, dx, fromY, toY, len) {
  const share = Math.abs(toY - y0) / Math.abs(toY - fromY)
  const t1 = Math.min(len - 2, Math.max(1, Math.round(len * share)))
  const xEnd = x0 + dx * share
  return [
    [0, [x0, y0, 0]],
    [t1, [xEnd, toY, 0], true],
    [t1 + 1, [xEnd - dx, fromY, 0]],
    [len, [x0, y0, 0]],
  ]
}

function effectPetals() {
  const len = 240
  ind = 0
  const layers = Array.from({ length: 9 }, (_, i) => {
    const x = 40 + i * 90 + (i % 2) * 20
    const y0 = ((i * 83) % 230) - 15
    const frames = wrapPath(x, y0, 70 + (i % 3) * 20, -16, 216, len)
    return layer([group([ellipse(10, 18), fill(rgb(255, 170, 200), 90)], {})], {
      nm: 'petal',
      p: anim(frames, LIN),
      r: anim([[0, i * 40], [len, i * 40 + (i % 2 ? 720 : -720)]], LIN),
    }, len)
  })
  return comp('petals', 800, 200, len, layers)
}

function effectTwinkle() {
  const len = 120
  ind = 0
  const spots = [
    [60, 40], [150, 140], [230, 60], [310, 160], [390, 30], [470, 120], [540, 60],
    [620, 150], [700, 50], [760, 130], [110, 100], [350, 90], [580, 100], [680, 20],
  ]
  const layers = spots.map(([x, y], i) => {
    const p = (i * 17) % 30
    const sizeUp = 100 + (i % 3) * 25
    return layer([group([star(4, 9, 2.6), fill(rgb(255, 245, 200))], {})], {
      nm: 'twinkle', p: still([x, y, 0]),
      s: anim([[0, [0, 0, 100]], [p, [0, 0, 100]], [p + 15, [sizeUp, sizeUp, 100]], [p + 30, [0, 0, 100]], [p + 60, [0, 0, 100]], [p + 75, [sizeUp, sizeUp, 100]], [p + 90, [0, 0, 100]], [len, [0, 0, 100]]]),
      r: anim([[0, 0], [len, 90]], LIN),
    }, len)
  })
  return comp('twinkle', 800, 200, len, layers)
}

function effectEmbers() {
  const len = 150
  ind = 0
  const layers = Array.from({ length: 14 }, (_, i) => {
    const x = 30 + i * 56 + ((i * 29) % 30)
    const y0 = 210 - ((i * 61) % 220)
    const frames = wrapPath(x, y0, i % 2 ? 24 : -24, 214, -16, len)
    const size = 4 + (i % 3) * 2
    return layer([group([ellipse(size), fill(i % 2 ? rgb(255, 150, 40) : rgb(255, 90, 30), 95)], {})], {
      nm: 'ember', p: anim(frames, LIN),
      o: anim([[0, 100], [len / 2, 70], [len, 100]]),
    }, len)
  })
  return comp('embers', 800, 200, len, layers)
}

function effectAurora() {
  const len = 180
  ind = 0
  const band = (color, y, w, h, phase) =>
    layer([group([ellipse(w, h), fill(color, 100)], {})], {
      nm: 'band',
      p: anim([[0, [400 - 60, y, 0]], [90, [400 + 60, y + 14, 0]], [180, [400 - 60, y, 0]]]),
      s: anim([[0, [100, 100, 100]], [90, [112, 130, 100]], [180, [100, 100, 100]]]),
      o: anim([[0, 9 + phase], [90, 20 + phase], [180, 9 + phase]]),
    }, len)
  return comp('aurora', 800, 200, len, [
    band(rgb(60, 255, 190), 150, 1100, 70, 0),
    band(rgb(120, 110, 255), 105, 900, 60, -2),
    band(rgb(255, 110, 220), 60, 760, 46, -3),
  ])
}

const FILES = {
  'frame-neon': frameNeon, 'frame-stars': frameStars, 'frame-sakura': frameSakura, 'frame-flame': frameFlame,
  'frame-halo': frameHalo, 'frame-rainbow': frameRainbow,
  'effect-petals': effectPetals, 'effect-twinkle': effectTwinkle, 'effect-embers': effectEmbers, 'effect-aurora': effectAurora,
}
for (const [name, build] of Object.entries(FILES)) save(name, build())
console.log(`wrote ${Object.keys(FILES).length} animations to ${OUT}`)
