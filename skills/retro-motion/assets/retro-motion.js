// retro-motion.js: the three classic window moves, as plain functions. No dependencies.
//   zoomOpen(win, { from })    dotted outlines step from `from` (an element or rect) out to `win`, then `win` appears
//   zoomClose(win, { to })     the reverse: `win` hides, outlines shrink toward `to` (a taskbar button, say)
//   dragOutline(handle, win)   dragging `handle` moves a dotted outline; `win` jumps there on release
// All respect prefers-reduced-motion (they cut straight to the end) and return a Promise that resolves when done.
// Needs .rm-outline from retro-motion.css (or style the outline yourself).

const reduced = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const rectOf = (x) => (x instanceof Element ? x.getBoundingClientRect() : x);
const snap = (n) => Math.round(n / 2) * 2; // even pixels keep dotted borders steady
const mix = (a, b, t) => a + (b - a) * t;

function outline() {
  const o = document.createElement("div");
  o.className = "rm-outline";
  o.setAttribute("aria-hidden", "true");
  document.body.appendChild(o);
  return o;
}
const place = (o, r) => Object.assign(o.style, { left: `${snap(r.left)}px`, top: `${snap(r.top)}px`, width: `${snap(r.width)}px`, height: `${snap(r.height)}px` });

// steps the outlines through `frames` positions, `trail` outlines behind each other
function zoom(fromRect, toRect, { frames = 6, trail = 3, frameMs = 30 } = {}) {
  return new Promise((done) => {
    const boxes = Array.from({ length: trail }, outline);
    let f = 0;
    const tick = () => {
      boxes.forEach((o, i) => {
        const t = Math.min(1, Math.max(0, (f - i) / (frames - 1)));
        const live = f - i >= 0 && t < 1;
        o.style.display = live ? "block" : "none";
        if (live) place(o, {
          left: mix(fromRect.left, toRect.left, t), top: mix(fromRect.top, toRect.top, t),
          width: mix(fromRect.width, toRect.width, t), height: mix(fromRect.height, toRect.height, t),
        });
      });
      f++;
      if (f < frames + trail) setTimeout(tick, frameMs);
      else { boxes.forEach((o) => o.remove()); done(); }
    };
    tick();
  });
}

const centreDot = (r) => ({ left: r.left + r.width / 2 - 4, top: r.top + r.height / 2 - 4, width: 8, height: 8 });

export async function zoomOpen(win, { from, ...opts } = {}) {
  win.hidden = false;
  win.style.visibility = "hidden";
  const to = win.getBoundingClientRect();
  if (!reduced()) await zoom(from ? rectOf(from) : centreDot(to), to, opts);
  win.style.visibility = "";
}

export async function zoomClose(win, { to, ...opts } = {}) {
  const fromRect = win.getBoundingClientRect();
  win.hidden = true;
  if (!reduced()) await zoom(fromRect, to ? rectOf(to) : centreDot(fromRect), opts);
}

export function dragOutline(handle, win, { onMove } = {}) {
  let start = null, o = null, base = { x: 0, y: 0 };
  const down = (e) => {
    if (e.button !== 0 || e.target.closest("button, a, input, select, textarea")) return;
    const r = win.getBoundingClientRect();
    start = { x: e.clientX, y: e.clientY, r };
    if (reduced()) o = null; else { o = outline(); place(o, r); }
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const move = (e) => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (o) place(o, { ...start.r.toJSON(), left: start.r.left + dx, top: start.r.top + dy });
    else apply(dx, dy); // reduced motion: move the window directly, no outline
  };
  const apply = (dx, dy) => {
    const x = base.x + dx, y = base.y + dy;
    win.style.transform = `translate(${snap(x)}px, ${snap(y)}px)`;
    return { x, y };
  };
  const up = (e) => {
    if (!start) return;
    const p = apply(e.clientX - start.x, e.clientY - start.y);
    base = p; o?.remove(); o = null; start = null;
    onMove?.(p);
  };
  handle.addEventListener("pointerdown", down);
  handle.addEventListener("pointermove", move);
  handle.addEventListener("pointerup", up);
  handle.addEventListener("pointercancel", up);
  return () => { handle.removeEventListener("pointerdown", down); handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", up); handle.removeEventListener("pointercancel", up); };
}
