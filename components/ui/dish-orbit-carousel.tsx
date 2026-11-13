"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/*
 * Dish Orbit Carousel: a smart-kitchen-display menu.
 * High-contrast dark luxury hero stage with circular plated gourmet cutouts,
 * two-weight title wipe, GSAP orbit swing physics, dynamic glowing accent arc,
 * and frosted glass chef card.
 *
 * Page scroll drives the dishes until all dishes are viewed, after which
 * the hero unpins smoothly to allow scrolling down to the rest of the website.
 */

export type Dish = {
  title: string
  subtitle: string
  image: string
  alt?: string
  eyebrow?: string
  label?: string
  rating: number
  chef: string
  kitchen?: string
  description: string
  likes: number
  ingredients?: string[]
  accent: string
}

export type DishOrbitCarouselProps = {
  dishes: Dish[]
  height?: string
  onPlay?: (dish: Dish, index: number) => void
  onOrder?: (dish: Dish, index: number) => void
  onExploreMenu?: () => void
  onOrderFood?: () => void
  onChange?: (index: number) => void
  className?: string
}

export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0
  return ((Math.round(i) % n) + n) % n
}

export function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1
  const fwd = (((to - from) % n) + n) % n
  return fwd <= n - fwd ? 1 : -1
}

export function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em))
}

export function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = []
  const inner: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45)
    const c = Math.cos(a)
    const s = Math.sin(a)
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1))
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1))
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z"
}

export const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]]
export function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length]
}

export const ARC_SWEEP = [38, 146]

const ORBIT_X = 299
const ORBIT_Y = -450
const ORBIT_R = 650
const SWING = 50
const ITEM = 118
const VISIBLE = 4

const FONT = "dsh-face"

const CSS =
  ".dsh-trk{position:relative;width:100%}" +
  ".dsh-root{position:sticky;top:0;overflow:hidden;width:100%;height:100vh;background:#0f0e0d !important;color:#ffffff !important;" +
  "font-family:" + FONT + ",ui-sans-serif,system-ui,sans-serif;container-type:inline-size;-webkit-tap-highlight-color:transparent;" +
  "display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:4.75rem}" +
  ".dsh-root *{box-sizing:border-box}" +
  /* Integrated Hero Header */
  ".dsh-hero-intro{text-align:center;max-width:720px;padding:0 1rem;z-index:20;margin-bottom:0.25rem;flex-shrink:0}" +
  ".dsh-hero-badge{display:inline-flex;align-items:center;gap:0.4rem;padding:0.25rem 0.85rem;border-radius:9999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);font-size:0.72rem;font-weight:600;color:#d6cbbe;margin-bottom:0.35rem}" +
  ".dsh-hero-dot{width:6px;height:6px;border-radius:9999px;background:#c96342;animation:dsh-pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}" +
  "@keyframes dsh-pulse{0%,100%{opacity:1}50%{opacity:.4}}" +
  ".dsh-hero-title{font-size:clamp(1.75rem,3.2vw,2.65rem);font-family:ui-serif,Georgia,Cambria,serif;font-weight:400;letter-spacing:-0.02em;line-height:1.15;color:#ffffff;margin:0}" +
  ".dsh-hero-accent{font-style:italic;font-weight:300;color:#e07a5f}" +
  ".dsh-hero-desc{font-size:clamp(0.82rem,1.1vw,0.92rem);color:#a8a29e;margin:0.35rem auto 0.65rem;max-width:480px;line-height:1.4}" +
  ".dsh-hero-ctas{display:flex;gap:0.75rem;justify-content:center;align-items:center}" +
  ".dsh-hero-btn-primary{display:inline-flex;align-items:center;gap:0.45rem;padding:0.5rem 1.35rem;border-radius:9999px;background:#c96342;color:#ffffff;font-weight:500;font-size:0.82rem;border:none;cursor:pointer;transition:all 0.2s ease;box-shadow:0 4px 14px -3px rgba(201,99,66,0.5)}" +
  ".dsh-hero-btn-primary:hover{background:#a84d31;box-shadow:0 6px 18px -3px rgba(201,99,66,0.6);transform:translateY(-1px)}" +
  ".dsh-hero-btn-secondary{display:inline-flex;align-items:center;gap:0.45rem;padding:0.5rem 1.35rem;border-radius:9999px;background:rgba(255,255,255,0.08);color:#ffffff;font-weight:500;font-size:0.82rem;border:1px solid rgba(255,255,255,0.18);cursor:pointer;transition:all 0.2s ease;backdrop-filter:blur(8px)}" +
  ".dsh-hero-btn-secondary:hover{background:rgba(255,255,255,0.16);border-color:rgba(255,255,255,0.3);transform:translateY(-1px)}" +
  ".dsh-btn-icon{width:13px;height:13px}" +
  /* 960 x 460 Canvas */
  ".dsh-canvas{position:relative;width:960px;height:460px;margin:0 auto;transform:scale(var(--dsh-s,1));transform-origin:50% 0;flex-shrink:0}" +
  ".dsh-arc{position:absolute;left:0;top:0;width:960px;height:460px;overflow:visible;pointer-events:none}" +
  ".dsh-btn{appearance:none;border:0;background:none;color:inherit;font:inherit;padding:0;margin:0;cursor:pointer}" +
  ".dsh-btn:focus-visible{outline:2px solid #c96342;outline-offset:3px;border-radius:10px}" +
  ".dsh-ico{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}" +
  ".dsh-top{position:absolute;left:820px;top:10px;display:flex;gap:10px}" +
  ".dsh-top .dsh-btn{width:32px;height:32px;display:grid;place-items:center;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#d6cbbe;transition:all 0.2s}" +
  ".dsh-top .dsh-btn:hover{background:rgba(255,255,255,0.15);color:#ffffff}" +
  ".dsh-pager{position:absolute;left:76px;top:110px;display:flex;flex-direction:column;align-items:center;gap:7px}" +
  ".dsh-dot{width:14px;height:10px;display:grid;place-items:center}" +
  ".dsh-dot i{display:block;width:4px;height:4px;border-radius:4px;background:#78716c;opacity:.5;transition:height .45s cubic-bezier(.3,.7,.2,1),opacity .3s}" +
  ".dsh-dot[aria-current] i{height:22px;opacity:1;background:#c96342}" +
  ".dsh-dot[aria-current]{height:26px}" +
  /* Plated Dish Cutout */
  ".dsh-plates{position:absolute;left:130px;top:30px;width:245px;height:245px;touch-action:pan-y}" +
  ".dsh-orbit{position:absolute;inset:0;transform-origin:69% -217%;visibility:hidden;will-change:transform}" +
  ".dsh-orbit>img{display:block;width:245px;height:245px;max-width:none;object-fit:cover;border-radius:9999px;border:3px solid rgba(255,255,255,0.14);box-shadow:0 25px 50px -12px rgba(0,0,0,0.8),0 0 35px rgba(201,99,66,0.22);user-select:none;-webkit-user-drag:none}" +
  /* Title & Eyebrow */
  ".dsh-head{position:absolute;left:388px;top:45px;width:330px;height:140px}" +
  ".dsh-hd{position:absolute;inset:0;visibility:hidden}" +
  ".dsh-eye{font-size:11px;font-weight:600;letter-spacing:.02em;color:#e07a5f;margin:0 0 4px 2px;text-transform:uppercase}" +
  ".dsh-t1,.dsh-t2{display:block;white-space:nowrap;line-height:1;text-transform:uppercase;margin:0}" +
  ".dsh-t1{font-weight:200;letter-spacing:-.015em;margin-top:6px;color:#d6cbbe}" +
  ".dsh-t2{font-weight:800;letter-spacing:-.025em;margin-top:6px;color:#ffffff}" +
  /* In-Canvas Action Buttons */
  ".dsh-acts{position:absolute;left:396px;top:210px;display:flex;gap:14px;font-size:12.5px;font-weight:500}" +
  ".dsh-acts .dsh-btn{display:flex;align-items:center;gap:7px;padding:6px 14px;border-radius:9999px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);color:#ffffff;transition:all 0.2s}" +
  ".dsh-acts .dsh-btn:hover{background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.25)}" +
  ".dsh-acts .dsh-btn-highlight{background:#c96342 !important;color:#ffffff !important;border-color:#c96342 !important;box-shadow:0 4px 14px -3px rgba(201,99,66,0.5)}" +
  ".dsh-acts .dsh-btn-highlight:hover{background:#a84d31 !important}" +
  /* Frosted Glass Chef Card */
  ".dsh-card{position:absolute;left:722px;top:45px;width:230px;padding:16px 18px;border-radius:20px;background:rgba(22,20,18,0.88) !important;border:1px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px -15px rgba(0,0,0,0.7);backdrop-filter:blur(16px);color:#ffffff}" +
  ".dsh-tabs{display:flex;justify-content:space-between;padding:0 4px;font-size:12px;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.1)}" +
  ".dsh-tab{color:#a8a29e;font-weight:500;padding:4px 6px;border-bottom:2px solid transparent}" +
  ".dsh-tab[aria-selected=true]{color:#ffffff;font-weight:600;border-bottom-color:#c96342}" +
  ".dsh-bodies{display:grid}" +
  ".dsh-body{grid-area:1/1;visibility:hidden}" +
  ".dsh-rate{position:relative;height:48px;margin:0 0 8px 0;display:flex;align-items:center;gap:10px}" +
  ".dsh-badge{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#ffffff;position:relative}" +
  ".dsh-badge svg{width:13px;height:13px;fill:#ffffff}" +
  ".dsh-num{font-size:24px;font-weight:700;letter-spacing:-.03em;line-height:1;color:#ffffff}" +
  ".dsh-chef{font-size:15px;font-weight:600;letter-spacing:-.01em;margin:0;color:#ffffff}" +
  ".dsh-kit{font-size:10.5px;color:#a8a29e;margin:2px 0 8px}" +
  ".dsh-desc{font-size:11.5px;line-height:1.42;margin:0;min-height:50px;color:#d6cbbe}" +
  ".dsh-ing{display:flex;flex-wrap:wrap;gap:4px;margin:0;padding:0;list-style:none;min-height:50px}" +
  ".dsh-ing li{font-size:10px;padding:2px 7px;border-radius:99px;background:rgba(255,255,255,0.08);color:#e7dfd5;border:1px solid rgba(255,255,255,0.1)}" +
  ".dsh-react{display:flex;gap:7px;margin-top:14px}" +
  ".dsh-like{display:flex;align-items:center;gap:5px;height:30px;padding:0 10px;border-radius:99px;font-size:10.5px;background:rgba(255,255,255,0.08);color:#d6cbbe;border:1px solid rgba(255,255,255,0.1);transition:background .2s}" +
  ".dsh-like:hover{background:rgba(255,255,255,0.16);color:#ffffff}" +
  ".dsh-meh{width:30px;height:30px;display:grid;place-items:center;border-radius:99px;background:rgba(255,255,255,0.08);color:#a8a29e;border:1px solid rgba(255,255,255,0.1)}" +
  ".dsh-meh:hover{background:rgba(255,255,255,0.16);color:#ffffff}" +
  ".dsh-react .dsh-ico{width:13px;height:13px}" +
  /* Thumbnail Carousel Strip */
  ".dsh-strip{position:absolute;left:130px;top:295px;width:550px;height:115px;display:flex;align-items:center}" +
  ".dsh-arrow{width:30px;height:30px;display:grid;place-items:center;flex:none;border-radius:99px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#e7dfd5;transition:all 0.2s}" +
  ".dsh-arrow:hover{background:rgba(255,255,255,0.18);color:#ffffff}" +
  ".dsh-arrow svg{width:10px;height:13px;fill:currentColor}" +
  ".dsh-win{position:relative;width:472px;height:115px;overflow:hidden;flex:none;margin:0 4px;-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}" +
  ".dsh-track{position:absolute;left:0;top:0;display:flex;transition:transform .6s cubic-bezier(.65,0,.35,1)}" +
  ".dsh-th{width:118px;height:115px;display:flex;justify-content:center;padding-top:2px}" +
  ".dsh-th .dsh-btn{width:88px;height:108px;border-radius:16px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);transition:all .3s}" +
  ".dsh-th .dsh-btn:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.2)}" +
  ".dsh-th .dsh-btn[aria-current]{background:rgba(255,255,255,0.16) !important;border:1.5px solid #c96342 !important;box-shadow:0 8px 24px -6px rgba(201,99,66,0.4)}" +
  ".dsh-th img{width:48px;height:48px;border-radius:9999px;object-fit:cover;border:1.5px solid rgba(255,255,255,0.2);transition:transform .3s}" +
  ".dsh-th .dsh-btn[aria-current] img{transform:scale(1.08);border-color:#c96342}" +
  ".dsh-th span{font-size:10px;line-height:1.2;text-align:center;font-weight:500;color:#d6cbbe;max-width:80px}" +
  /* Scroll cue bar */
  ".dsh-scroll-cue{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:6px;font-size:0.75rem;color:#78716c;z-index:20;pointer-events:none;letter-spacing:0.02em}" +
  ".dsh-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
  "@container (max-width:639px){" +
  ".dsh-root{height:auto !important;min-height:100vh;position:relative !important;padding:5rem 1rem 2rem}" +
  ".dsh-canvas{position:relative;left:auto;top:auto;width:100%;height:auto;transform:none;display:flex;flex-direction:column;align-items:center;padding:0}" +
  ".dsh-arc{width:160%;height:auto;left:-30%;top:-20px}" +
  ".dsh-top{position:relative;left:auto;top:auto;align-self:flex-end;margin-bottom:0.5rem}" +
  ".dsh-pager{left:8px;top:100px}" +
  ".dsh-plates{position:relative;left:auto;top:auto;width:min(52vw,230px);height:min(52vw,230px);margin-top:0}" +
  ".dsh-orbit>img{width:100%;height:100%}" +
  ".dsh-head{position:relative;left:auto;top:auto;width:100%;height:100px;margin-top:8px;text-align:center}" +
  ".dsh-hd{text-align:center;transform:scale(.85);transform-origin:50% 0}" +
  ".dsh-acts{position:relative;left:auto;top:auto;margin-top:6px}" +
  ".dsh-card{position:relative;left:auto;top:auto;width:100%;max-width:360px;margin-top:12px}" +
  ".dsh-strip{display:none}" +
  ".dsh-scroll-cue{display:none}" +
  "}" +
  "@media (prefers-reduced-motion:reduce){.dsh-track,.dsh-dot,.dsh-dot i,.dsh-th .dsh-btn,.dsh-th img,.dsh-like{transition:none}}"

const HIDE_1 = "inset(0% 0% 0% 100%)"
const HIDE_2 = "inset(0% 100% 0% 0%)"
const SHOW = "inset(0% 0% 0% 0%)"

const Icon = {
  search: <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>,
  menu: <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16M4 12h16M4 17.5h16" /></svg>,
  explore: <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" /><path d="M12 2v20" /><path d="M6 2v6a3 3 0 0 0 3 3 3 3 0 0 0 3-3V2" /></svg>,
  order: <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2c.5 3 2 4.5 4 6 1.5 1 2 2.5 2 4a6 6 0 1 1-12 0c0-2.5 2-4.5 3.5-6.5C11 3.5 11.5 2.5 12 2z" /></svg>,
  up: <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v10H3.5V10zM7 10l4-7c1.6 0 2.6 1.2 2.2 2.8L12.6 9H19a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 17.7 20H7" /></svg>,
  down: <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 14V4h3.5v10zM17 14l-4 7c-1.6 0-2.6-1.2-2.2-2.8l.6-3.2H5a2 2 0 0 1-2-2.3l1.3-7A2 2 0 0 1 6.3 4H17" /></svg>,
}

export function DishOrbitCarousel({
  dishes,
  onOrder,
  onExploreMenu,
  onOrderFood,
  onChange,
  className,
}: DishOrbitCarouselProps) {
  const n = dishes.length
  const [index, setIndex] = useState(0)
  const [tab, setTab] = useState("overview")
  const [liked, setLiked] = useState({} as Record<number, boolean>)
  const [disliked, setDisliked] = useState({} as Record<number, boolean>)

  const trackRef = useRef(null as HTMLDivElement | null)
  const rootRef = useRef(null as HTMLDivElement | null)
  const stRef = useRef(null as ScrollTrigger | null)
  const indexRef = useRef(0)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const orbits = useRef([] as (HTMLDivElement | null)[])
  const heads = useRef([] as (HTMLDivElement | null)[])
  const bodies = useRef([] as (HTMLDivElement | null)[])
  const arcRef = useRef(null as SVGPathElement | null)
  const arc = useRef({ a0: 0, a1: 0 })
  const shown = useRef(-1)
  const dirRef = useRef(1 as 1 | -1)
  const tlRef = useRef(null as gsap.core.Timeline | null)
  const reducedRef = useRef(false)
  const swipe = useRef(null as { x: number; y: number } | null)

  // Fit the 960 x 460 design canvas smoothly to the root viewport
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const fit = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      const availableH = Math.max(300, h - 210)
      el.style.setProperty("--dsh-s", String(Math.min(w / 960, availableH / 460, 1.15)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => (reducedRef.current = mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  // Swap animation: GSAP moves outgoing and incoming dishes on the wide orbit
  useLayoutEffect(() => {
    const from = shown.current
    const to = index
    const parts = (i: number) => {
      const head = heads.current[i]
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector(".dsh-eye"),
        t1: head && head.querySelector(".dsh-t1"),
        t2: head && head.querySelector(".dsh-t2"),
        body: bodies.current[i],
      }
    }
    const drawArc = () => arcRef.current?.setAttribute("d", arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 118))
    const rest = arcRest(to)
    const tint = dishes[to] ? dishes[to].accent : "#c96342"
    if (tlRef.current) tlRef.current.progress(1).kill()
    const b = parts(to)
    if (from === -1 || from === to || reducedRef.current) {
      for (let i = 0; i < n; i++) if (i !== to) {
        const p = parts(i)
        gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 })
      }
      gsap.set([b.orbit, b.head, b.body, b.eye], { autoAlpha: 1, rotation: 0, y: 0 })
      gsap.set(b.t1, { clipPath: SHOW })
      gsap.set(b.t2, { clipPath: SHOW })
      arc.current.a0 = rest[0]
      arc.current.a1 = rest[1]
      drawArc()
      if (arcRef.current) gsap.set(arcRef.current, { fill: tint })
      shown.current = to
      return
    }
    const a = parts(from)
    const d = dirRef.current
    const tl = gsap.timeline({ onComplete: () => { tlRef.current = null } })
    tlRef.current = tl

    // Orbit swing
    tl.to(a.orbit, { rotation: SWING * d, duration: 0.62, ease: "power2.in" }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, 0.62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: 0.95, ease: "power3.out" }, 0.3)

    // Title wipe
    tl.to(a.t1, { clipPath: HIDE_1, duration: 0.42, ease: "power2.in" }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: 0.42, ease: "power2.in" }, 0.06)
      .to(a.eye, { autoAlpha: 0, duration: 0.25 }, 0)
      .set(a.head, { autoAlpha: 0 }, 0.5)
      .set(b.head, { autoAlpha: 1 }, 0.5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.62)

    // Chef card cross-fade
    tl.to(a.body, { autoAlpha: 0, y: -6, duration: 0.3, ease: "power1.in" }, 0.05)
      .set(b.body, { autoAlpha: 1, y: 0 }, 0.4)
    if (b.body) tl.fromTo(b.body.children, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0.4)

    // Glowing arc trail
    tl.to(arc.current, { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.6, ease: "power2.inOut", onUpdate: drawArc }, 0)
      .to(arc.current, { a0: rest[0], a1: rest[1], duration: 0.85, ease: "power3.out", onUpdate: drawArc }, 0.6)
    if (arcRef.current) tl.to(arcRef.current, { fill: tint, duration: 1.1, ease: "power1.inOut" }, 0.1)
    shown.current = to
  }, [index, n, dishes])

  useEffect(() => () => { tlRef.current?.kill() }, [])

  const select = (next: number, dir: 1 | -1) => {
    if (next === indexRef.current) return
    dirRef.current = dir
    indexRef.current = next
    setIndex(next)
    onChangeRef.current?.(next)
  }

  // Scroll distance: 750px per dish step. The hero stays pinned until all dishes are orbited!
  useEffect(() => {
    const track = trackRef.current
    if (!track || n <= 1) return

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Map self.progress (0.0 to 1.0) evenly across dishes (0 to n - 1)
        const raw = self.progress * (n - 1)
        const target = Math.min(n - 1, Math.max(0, Math.round(raw)))
        if (target !== indexRef.current) {
          const dir = target > indexRef.current ? 1 : -1
          select(target, dir)
        }
      },
    })

    stRef.current = trigger
    return () => {
      trigger.kill()
      stRef.current = null
    }
  }, [n])

  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return
    const next = Math.max(0, Math.min(n - 1, to))
    if (next === index) return
    const st = stRef.current
    if (st) {
      const targetY = st.start + (next / (n - 1)) * (st.end - st.start)
      window.scrollTo({ top: targetY, behavior: "smooth" })
    }
    select(next, dir ?? stepDirection(index, next, n))
  }
  const step = (d: 1 | -1) => go(index + d, d)

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1) }
  }
  const onPointerDown = (e: React.PointerEvent) => { swipe.current = { x: e.clientX, y: e.clientY } }
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) step(dx < 0 ? 1 : -1)
  }

  const start = Math.max(0, Math.min(index - 1, n - VISIBLE))
  const dish = dishes[index]

  // Track height gives enough scroll room for each dish to play before unpinning to the rest of the site
  const trackHeight = `${100 + (n - 1) * 75}vh`

  return (
    <div
      ref={trackRef}
      className={"dsh-trk" + (className ? " " + className : "")}
      style={{ height: trackHeight }}
    >
      <div
        ref={rootRef}
        className="dsh-root"
        role="region"
        aria-roledescription="carousel"
        aria-label="Dishes"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <style>{CSS}</style>

        {/* Integrated Restaurant Hero Header */}
        <div className="dsh-hero-intro">
          <div className="dsh-hero-badge">
            <span className="dsh-hero-dot" />
            <span>Artisanal Kitchen & Hearth · Active Service</span>
          </div>
          <h1 className="dsh-hero-title">
            Good food. Honest ingredients.
            <br />
            <span className="dsh-hero-accent">Made fresh for your table.</span>
          </h1>
          <p className="dsh-hero-desc">
            Explore our menu, customize your favourites and enjoy a simpler way to order.
          </p>
          <div className="dsh-hero-ctas">
            <button
              type="button"
              onClick={onExploreMenu}
              className="dsh-hero-btn-primary"
            >
              <svg className="dsh-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
                <path d="M12 2v20" />
                <path d="M6 2v6a3 3 0 0 0 3 3 3 3 0 0 0 3-3V2" />
              </svg>
              <span>Explore Menu</span>
            </button>
            <button
              type="button"
              onClick={onOrderFood}
              className="dsh-hero-btn-secondary"
            >
              <svg className="dsh-btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c.5 3 2 4.5 4 6 1.5 1 2 2.5 2 4a6 6 0 1 1-12 0c0-2.5 2-4.5 3.5-6.5C11 3.5 11.5 2.5 12 2z" />
              </svg>
              <span>Order Your Food</span>
            </button>
          </div>
        </div>

        {/* Scaled 960x460 Stage */}
        <div className="dsh-canvas">
          <svg className="dsh-arc" viewBox="0 0 960 460" aria-hidden="true">
            <path ref={arcRef} style={{ opacity: 0.45 }} />
          </svg>

          <div className="dsh-top">
            <button
              type="button"
              className="dsh-btn"
              aria-label="Search Menu"
              onClick={onExploreMenu}
            >
              {Icon.search}
            </button>
            <button
              type="button"
              className="dsh-btn"
              aria-label="View Menu"
              onClick={onExploreMenu}
            >
              {Icon.menu}
            </button>
          </div>

          <div className="dsh-pager" role="tablist" aria-label="Choose a dish">
            {dishes.map((d, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className="dsh-btn dsh-dot"
                aria-selected={i === index}
                aria-current={i === index ? "true" : undefined}
                aria-label={d.title + " " + d.subtitle}
                onClick={() => go(i)}
              >
                <i />
              </button>
            ))}
          </div>

          <div
            className="dsh-plates"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            {dishes.map((d, i) => (
              <div
                key={i}
                ref={(el) => { orbits.current[i] = el }}
                className="dsh-orbit"
                aria-hidden={i !== index}
              >
                <img
                  src={d.image}
                  alt={d.alt ?? d.title + " " + d.subtitle}
                  width={245}
                  height={245}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="dsh-head" aria-live="polite">
            {dishes.map((d, i) => (
              <div
                key={i}
                ref={(el) => { heads.current[i] = el }}
                className="dsh-hd"
                aria-hidden={i !== index}
              >
                <p className="dsh-eye">{d.eyebrow ?? "#" + (i + 1) + " Most loved dish"}</p>
                <h2 style={{ margin: 0, font: "inherit" }}>
                  <span
                    className="dsh-t1"
                    style={{ fontSize: fitSize(d.title.length, 50, 330, 0.56) + "px" }}
                  >
                    {d.title}
                  </span>
                  <span
                    className="dsh-t2"
                    style={{ fontSize: fitSize(d.subtitle.length, 56, 320, 0.64) + "px" }}
                  >
                    {d.subtitle}
                  </span>
                </h2>
              </div>
            ))}
          </div>

          <div className="dsh-acts">
            <button
              type="button"
              className="dsh-btn"
              onClick={onExploreMenu}
            >
              {Icon.explore}Explore Menu
            </button>
            <button
              type="button"
              className="dsh-btn dsh-btn-highlight"
              onClick={() => dish && onOrder?.(dish, index)}
            >
              {Icon.order}Order This Dish
            </button>
          </div>

          <div className="dsh-card">
            <div className="dsh-tabs" role="tablist" aria-label="Dish details">
              {["overview", "ingredients"].map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  className="dsh-btn dsh-tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                >
                  {t === "overview" ? "Overview" : "Ingredients"}
                </button>
              ))}
            </div>
            <div className="dsh-bodies">
              {dishes.map((d, i) => (
                <div
                  key={i}
                  ref={(el) => { bodies.current[i] = el }}
                  className="dsh-body"
                  aria-hidden={i !== index}
                >
                  <div className="dsh-rate">
                    <div className="dsh-badge" style={{ background: d.accent }}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                      </svg>
                    </div>
                    <span className="dsh-num" aria-label={"Rated " + d.rating.toFixed(1) + " out of 5"}>
                      {d.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="dsh-chef">{d.chef}</p>
                  <p className="dsh-kit">{d.kitchen ?? " "}</p>
                  {tab === "overview" || !d.ingredients?.length ? (
                    <p className="dsh-desc">{d.description}</p>
                  ) : (
                    <ul className="dsh-ing">
                      {d.ingredients.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                  <div className="dsh-react">
                    <button
                      type="button"
                      className="dsh-btn dsh-like"
                      aria-pressed={!!liked[i]}
                      tabIndex={i === index ? 0 : -1}
                      onClick={() => {
                        setLiked((s) => ({ ...s, [i]: !s[i] }))
                        setDisliked((s) => ({ ...s, [i]: false }))
                      }}
                    >
                      {Icon.up}
                      {d.likes + (liked[i] ? 1 : 0)} likes
                    </button>
                    <button
                      type="button"
                      className="dsh-btn dsh-meh"
                      aria-pressed={!!disliked[i]}
                      aria-label="Not for me"
                      tabIndex={i === index ? 0 : -1}
                      onClick={() => {
                        setDisliked((s) => ({ ...s, [i]: !s[i] }))
                        setLiked((s) => ({ ...s, [i]: false }))
                      }}
                    >
                      {Icon.down}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dsh-strip">
            <button
              type="button"
              className="dsh-btn dsh-arrow"
              aria-label="Previous dish"
              onClick={() => step(-1)}
            >
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M11 0v16L0 8z" />
              </svg>
            </button>
            <div className="dsh-win">
              <div
                className="dsh-track"
                style={{ transform: "translateX(" + -start * ITEM + "px)" }}
              >
                {dishes.map((d, i) => (
                  <div key={i} className="dsh-th">
                    <button
                      type="button"
                      className="dsh-btn"
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => go(i)}
                    >
                      <img
                        src={d.image}
                        alt=""
                        width={48}
                        height={48}
                        draggable={false}
                      />
                      <span>{d.label ?? d.title + " " + d.subtitle}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="dsh-btn dsh-arrow"
              aria-label="Next dish"
              onClick={() => step(1)}
            >
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M1 0v16l11-8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ambient bottom cue indicating scroll down */}
        <div className="dsh-scroll-cue">
          <span>Scroll down to explore all creations · Then menu reveals below</span>
          <svg className="w-3.5 h-3.5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <p className="dsh-sr" aria-live="polite">
          {dish ? "Dish " + (index + 1) + " of " + n + ": " + dish.title + " " + dish.subtitle : ""}
        </p>
      </div>
    </div>
  )
}

export default DishOrbitCarousel
