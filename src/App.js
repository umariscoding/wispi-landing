import { useState, useEffect, useRef } from 'react';
import './App.css';

/* ── HOOKS ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── ICONS ── */
const AppleIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);
const WindowsIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .08V5.21L20 3zm-10 9.5l10-.08V21l-10-1.76V12.5zM3 12.25l6 .09v6.33l-6-1.07V12.25z"/>
  </svg>
);
const ChevronIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

/* ── MOCKUP COMPONENTS ── */

// macOS window chrome
function MacWindow({ children, title, className = '' }) {
  return (
    <div className={`mac-window ${className}`}>
      <div className="mac-titlebar">
        <div className="mac-dots">
          <span className="mac-dot mac-dot--red" />
          <span className="mac-dot mac-dot--yellow" />
          <span className="mac-dot mac-dot--green" />
        </div>
        <span className="mac-titlebar-text">{title}</span>
      </div>
      <div className="mac-body">{children}</div>
    </div>
  );
}

// Wispi panel overlay mockup
function WispiPanelMockup() {
  return (
    <div className="wispi-panel-mock">
      <div className="wispi-panel-inner">
        <div className="wispi-panel-header">
          <div className="wispi-panel-indicator" />
          <span>wispi</span>
        </div>
        <div className="wispi-panel-msg wispi-panel-msg--heard">
          <span className="wispi-panel-msg-label">Heard:</span>
          <span>Can you walk us through your approach to the two sum problem?</span>
        </div>
        <div className="wispi-panel-msg wispi-panel-msg--ai">
          <span>Use a hash map. For each number, check if target minus current exists in the map. If yes, return both indices. If not, store current number with its index. O(n) time.</span>
        </div>
        <div className="wispi-panel-input">
          <div className="wispi-panel-rec">
            <div className="wispi-panel-rec-dot" />
            <span>Recording 0:14</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero mockup: Zoom call with Wispi overlay invisible
function HeroMockup() {
  return (
    <div className="hero-mockup">
      <MacWindow title="Zoom Meeting" className="hero-zoom-window">
        <div className="zoom-grid">
          <div className="zoom-participant">
            <div className="zoom-avatar zoom-avatar--1" />
            <span>Sarah K.</span>
          </div>
          <div className="zoom-participant">
            <div className="zoom-avatar zoom-avatar--2" />
            <span>Mike R.</span>
          </div>
          <div className="zoom-participant zoom-participant--you">
            <div className="zoom-avatar zoom-avatar--you" />
            <span>You</span>
            <div className="zoom-sharing-badge">Sharing Screen</div>
          </div>
          <div className="zoom-participant">
            <div className="zoom-avatar zoom-avatar--3" />
            <span>Amy L.</span>
          </div>
        </div>
        <div className="zoom-bar">
          <div className="zoom-bar-dot" />
          <div className="zoom-bar-dot" />
          <div className="zoom-bar-dot" />
        </div>
      </MacWindow>
      <WispiPanelMockup />
      <div className="hero-mockup-label">
        <span className="hero-mockup-label-dot" />
        They see your screen. They don't see Wispi.
      </div>
    </div>
  );
}

// Stealth proof: side-by-side what you see vs what they see
function StealthProofMockup() {
  return (
    <div className="stealth-proof">
      <div className="stealth-proof-side">
        <div className="stealth-proof-label">What you see</div>
        <div className="stealth-proof-screen stealth-proof-screen--yours">
          <div className="sp-desktop">
            <div className="sp-window">
              <div className="sp-window-bar"><span/><span/><span/></div>
              <div className="sp-window-body">
                <div className="sp-code-line" style={{width:'80%'}} />
                <div className="sp-code-line" style={{width:'60%'}} />
                <div className="sp-code-line" style={{width:'90%'}} />
                <div className="sp-code-line" style={{width:'45%'}} />
                <div className="sp-code-line" style={{width:'70%'}} />
              </div>
            </div>
            <div className="sp-wispi-overlay">
              <div className="sp-wispi-dot" />
              <div className="sp-wispi-line" style={{width:'85%'}} />
              <div className="sp-wispi-line" style={{width:'65%'}} />
            </div>
          </div>
        </div>
      </div>
      <div className="stealth-proof-arrow">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div className="stealth-proof-side">
        <div className="stealth-proof-label">What they see</div>
        <div className="stealth-proof-screen stealth-proof-screen--theirs">
          <div className="sp-desktop">
            <div className="sp-window">
              <div className="sp-window-bar"><span/><span/><span/></div>
              <div className="sp-window-body">
                <div className="sp-code-line" style={{width:'80%'}} />
                <div className="sp-code-line" style={{width:'60%'}} />
                <div className="sp-code-line" style={{width:'90%'}} />
                <div className="sp-code-line" style={{width:'45%'}} />
                <div className="sp-code-line" style={{width:'70%'}} />
              </div>
            </div>
            {/* No Wispi overlay here */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Audio capture mockup: system audio waveform + transcription + AI answer
function AudioMockup() {
  return (
    <div className="voice-mockup">
      <div className="voice-header">
        <div className="voice-rec-badge">
          <div className="voice-rec-dot" />
          <span>Recording System Audio — 0:23</span>
        </div>
      </div>
      <div className="voice-waveform">
        {Array.from({ length: 32 }, (_, i) => (
          <div key={i} className="voice-bar" style={{
            animationDelay: `${i * 0.05}s`,
            height: `${20 + Math.sin(i * 0.8) * 30 + Math.random() * 20}%`
          }} />
        ))}
      </div>
      <div className="voice-transcript">
        <span className="voice-transcript-label">Heard:</span>
        <span className="voice-transcript-live">So for this next question, given an array of integers and a target, return the indices of two numbers that add up to the target.</span>
        <span className="voice-cursor" />
      </div>
      <div className="voice-ai-response">
        <span className="voice-ai-label">Wispi:</span>
        Use a hash map. Loop through the array — for each element, check if (target - current) is already in the map. If yes, return [map[complement], i]. Otherwise, store {'{'}current: index{'}'}. One pass, O(n).
      </div>
    </div>
  );
}

// Vision mockup: screenshot with analysis overlay
function VisionMockup() {
  return (
    <div className="vision-mockup">
      <div className="vision-screen">
        <div className="vision-code-window">
          <div className="sp-window-bar"><span/><span/><span/></div>
          <div className="vision-code-body">
            <div className="vision-code-ln">1</div><div className="vision-code-text"><span className="vc-kw">function</span> <span className="vc-fn">quickSort</span>(arr) {'{'}</div>
            <div className="vision-code-ln">2</div><div className="vision-code-text">  <span className="vc-kw">if</span> (arr.length {'<='} 1) <span className="vc-kw">return</span> arr;</div>
            <div className="vision-code-ln">3</div><div className="vision-code-text">  <span className="vc-kw">const</span> pivot = arr[0];</div>
            <div className="vision-code-ln">4</div><div className="vision-code-text">  <span className="vc-kw">const</span> left = arr.<span className="vc-fn">filter</span>(x ={'>'} x {'<'} pivot);</div>
            <div className="vision-code-ln">5</div><div className="vision-code-text">  <span className="vc-kw">const</span> right = arr.<span className="vc-fn">filter</span>(x ={'>'} x {'>'} pivot);</div>
            <div className="vision-code-ln">6</div><div className="vision-code-text">  <span className="vc-kw">return</span> [...<span className="vc-fn">quickSort</span>(left), pivot, ...<span className="vc-fn">quickSort</span>(right)];</div>
            <div className="vision-code-ln">7</div><div className="vision-code-text">{'}'}</div>
          </div>
        </div>
        <div className="vision-selection" />
        <div className="vision-ai-bubble">
          <span>This quickSort has a bug: filter on line 4-5 excludes elements equal to the pivot. Duplicates will be lost. Use {'<='} on one side.</span>
        </div>
      </div>
    </div>
  );
}

/* ── REVEAL WRAPPER ── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── DATA ── */
const competitors = [
  { name: 'Cluely', hidden: true, stealth: false, clickThrough: false, free: false, simple: false, undetectable: false, voice: true, vision: true, pricing: '$75/mo' },
  { name: 'Parakeet', hidden: true, stealth: false, clickThrough: false, free: false, simple: false, undetectable: false, voice: true, vision: true, pricing: '$29+' },
  { name: 'ChatGPT', hidden: false, stealth: false, clickThrough: false, free: false, simple: true, undetectable: false, voice: true, vision: true, pricing: '$20/mo' },
  { name: 'Copilot', hidden: false, stealth: false, clickThrough: false, free: false, simple: true, undetectable: false, voice: false, vision: false, pricing: '$10/mo' },
  { name: 'Wispi', hidden: true, stealth: true, clickThrough: true, free: true, simple: true, undetectable: true, voice: true, vision: true, pricing: 'Free' },
];

const comparisonFeatures = [
  { key: 'hidden', label: 'Hidden from screen capture' },
  { key: 'undetectable', label: 'Undetectable in Activity Monitor' },
  { key: 'stealth', label: 'True stealth mode' },
  { key: 'clickThrough', label: 'Click-through overlay' },
  { key: 'free', label: 'Completely free' },
  { key: 'simple', label: 'Simple & just works' },
  { key: 'voice', label: 'System audio capture' },
  { key: 'vision', label: 'Screen vision' },
];

const faqs = [
  { q: 'Is Wispi really invisible during screen sharing?', a: 'Yes. Wispi renders at a special OS window level that is excluded from all screen capture APIs. Zoom, Google Meet, OBS, Discord — none of them can see it. It\'s not a blur or a hide-on-share trick. It literally does not exist to those applications.' },
  { q: 'Is this free?', a: 'Completely free and open source. You bring your own API key for the AI backend. That\'s it. No subscriptions, no premium tiers, no "free with watermark" nonsense.' },
  { q: 'Does it work on both Mac and Windows?', a: 'Yes. Native builds for both macOS and Windows. Each version uses OS-level APIs specific to that platform to achieve true invisibility — no Electron wrapper, no compromise.' },
  { q: 'Will it slow down my computer?', a: 'Wispi is extremely lightweight. It sits idle until you summon it, uses minimal memory, and has zero background processes. You won\'t notice it\'s running — that\'s the point.' },
  { q: 'How is this different from just minimizing ChatGPT?', a: 'Minimizing ChatGPT means alt-tabbing, which is visible to anyone watching your screen or recording. Wispi overlays directly on your workspace, invisible to capture, and disappears with a single hotkey. No window switching, no evidence.' },
  { q: 'Is my data safe?', a: 'Wispi stores nothing. No conversation history is saved to disk. No analytics, no telemetry, no phoning home. When you close Wispi, everything is gone. Your API key stays on your machine.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-question"><span>{q}</span><ChevronIcon open={open} /></div>
      <div className="faq-answer" style={{ maxHeight: open ? '300px' : '0' }}><p>{a}</p></div>
    </div>
  );
}

const MAC_DOWNLOAD_URL = 'https://github.com/umariscoding/wispi-ai/releases/latest/download/Wispi-Mac.zip';
// const WIN_DOWNLOAD_URL = null; // TODO: add when Windows build is ready

/* ── APP ── */
function App() {
  return (
    <div className="landing">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-icon" />
          <span className="nav-wordmark">Wispi</span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#compare" className="nav-link">Compare</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#download" className="nav-link">Download</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Stealth Mode Active</div>
          <h1 className="hero-title">
            <span>Your AI.</span>
            <span className="outline-text">Their blind spot.</span>
          </h1>
          <p className="hero-subtitle">
            The AI assistant that floats on your screen — completely invisible
            to screen capture, recordings, and screen share. Always there. Never seen.
          </p>
          <div className="hero-actions">
            <a href={MAC_DOWNLOAD_URL} className="btn btn-primary"><AppleIcon />Download for Mac</a>
            <span className="btn btn-secondary btn-disabled"><WindowsIcon />Windows — Coming Soon</span>
          </div>
          <p className="hero-hint">macOS may block it — run <code>xattr -cr UserEventAgent.app</code> in Terminal, then open.</p>
        </div>
        <Reveal className="hero-mockup-wrap">
          <HeroMockup />
        </Reveal>
      </section>

      {/* ── FEATURE 1: STEALTH ── */}
      <section className="feat-section" id="features">
        <Reveal className="feat-text">
          <div className="section-label"><span className="label-bar" />Stealth</div>
          <h2 className="feat-title">Invisible to every screen capture tool</h2>
          <p className="feat-desc">
            Zoom, OBS, Discord, Google Meet — they all capture your screen the same way.
            Wispi exists on a window layer that none of them can access. It's not hidden
            after the fact. It's simply not there.
          </p>
          <div className="feat-tags">
            <span className="feat-tag">Zoom</span>
            <span className="feat-tag">OBS</span>
            <span className="feat-tag">Google Meet</span>
            <span className="feat-tag">Discord</span>
            <span className="feat-tag">Teams</span>
            <span className="feat-tag">QuickTime</span>
          </div>
        </Reveal>
        <Reveal delay={150} className="feat-visual">
          <StealthProofMockup />
        </Reveal>
      </section>

      {/* ── FEATURE 2: AUDIO CAPTURE ── */}
      <section className="feat-section feat-section--reverse">
        <Reveal className="feat-text">
          <div className="section-label"><span className="label-bar" />Audio Intercept</div>
          <h2 className="feat-title">It hears what they say. You get the answers.</h2>
          <p className="feat-desc">
            Wispi captures system audio — the interviewer's questions, the meeting
            discussion, the lecture content — and transcribes it in real time. Then
            the AI processes what was said and feeds you the answer. You never have
            to type a word. Just press <kbd>opt+R</kbd> and listen.
          </p>
        </Reveal>
        <Reveal delay={150} className="feat-visual">
          <AudioMockup />
        </Reveal>
      </section>

      {/* ── FEATURE 3: VISION ── */}
      <section className="feat-section">
        <Reveal className="feat-text">
          <div className="section-label"><span className="label-bar" />Screen Intel</div>
          <h2 className="feat-title">Screenshot anything. Get instant answers.</h2>
          <p className="feat-desc">
            Press <kbd>opt+S</kbd> to capture your entire screen and send it to the AI instantly.
            Or queue multiple screenshots with <kbd>opt+A</kbd> and send them all at once
            with <kbd>opt+Enter</kbd>. Wispi sees what you see — code, diagrams, error
            messages — and breaks it down for you. It even excludes itself from the capture.
          </p>
        </Reveal>
        <Reveal delay={150} className="feat-visual">
          <VisionMockup />
        </Reveal>
      </section>

      {/* ── FEATURE 4: HOTKEY + GHOST ── */}
      <section className="feat-section feat-section--reverse">
        <Reveal className="feat-text">
          <div className="section-label"><span className="label-bar" />Ghost Protocol</div>
          <h2 className="feat-title">One hotkey. Zero trace.</h2>
          <p className="feat-desc">
            No dock icon. No menu bar. No entry in Activity Monitor.
            Wispi appears with a keystroke and vanishes with another.
            Your clicks pass right through it. Three transparency levels.
            No telemetry, no accounts, no data saved to disk.
          </p>
          <div className="feat-keys-grid">
            <div className="feat-key-row"><kbd>opt</kbd> + <kbd>Space</kbd><span className="feat-key-label">Toggle Wispi</span></div>
            <div className="feat-key-row"><kbd>opt</kbd> + <kbd>R</kbd><span className="feat-key-label">Record audio</span></div>
            <div className="feat-key-row"><kbd>opt</kbd> + <kbd>S</kbd><span className="feat-key-label">Screenshot + send</span></div>
            <div className="feat-key-row"><kbd>opt</kbd> + <kbd>H</kbd><span className="feat-key-label">Hide / Show</span></div>
            <div className="feat-key-row"><kbd>opt</kbd> + <kbd>T</kbd><span className="feat-key-label">Transparency</span></div>
            <div className="feat-key-row"><kbd>opt</kbd> + <kbd>X</kbd><span className="feat-key-label">Abort request</span></div>
          </div>
        </Reveal>
        <Reveal delay={150} className="feat-visual">
          <div className="hotkey-mockup">
            <div className="hotkey-stage">
              <MacWindow title="VS Code — project" className="hotkey-bg-window">
                <div className="hotkey-code">
                  <div className="sp-code-line" style={{width:'70%'}} />
                  <div className="sp-code-line" style={{width:'55%'}} />
                  <div className="sp-code-line" style={{width:'85%'}} />
                  <div className="sp-code-line" style={{width:'40%'}} />
                  <div className="sp-code-line" style={{width:'65%'}} />
                  <div className="sp-code-line" style={{width:'75%'}} />
                  <div className="sp-code-line" style={{width:'50%'}} />
                </div>
              </MacWindow>
              <div className="hotkey-wispi hotkey-wispi--phase1">
                <div className="sp-wispi-dot" />
                <div className="sp-wispi-line" style={{width:'90%'}} />
                <div className="sp-wispi-line" style={{width:'70%'}} />
                <div className="sp-wispi-line" style={{width:'50%'}} />
              </div>
            </div>
            <div className="hotkey-caption">Appears instantly — disappears instantly</div>
          </div>
        </Reveal>
      </section>

      <div className="laser-line" />

      {/* ── COMPARISON ── */}
      <section className="comparison" id="compare">
        <Reveal>
          <div className="section-label"><span className="label-bar" />Threat Assessment</div>
          <h2 className="section-title">Every other AI tool is a liability</h2>
          <p className="comparison-intro">
            Cluely wants $75/month just to hide from screen share — and still shows up in
            Activity Monitor. Parakeet charges per session and <em>still gets detected</em>.
            ChatGPT and Copilot? Visible to everyone. Wispi is free, undetectable, and just works.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th></th>
                  {competitors.map((c, i) => (
                    <th key={i} className={c.name === 'Wispi' ? 'comp-highlight' : ''}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="pricing-row">
                  <td className="comp-feature-name">Pricing</td>
                  {competitors.map((c, ci) => (
                    <td key={ci} className={`comp-cell ${c.name === 'Wispi' ? 'comp-highlight' : ''}`}>
                      <span className={`comp-price ${c.pricing === 'Free' ? 'comp-price--free' : ''}`}>{c.pricing}</span>
                    </td>
                  ))}
                </tr>
                {comparisonFeatures.map((feat, fi) => (
                  <tr key={fi}>
                    <td className="comp-feature-name">{feat.label}</td>
                    {competitors.map((c, ci) => (
                      <td key={ci} className={`comp-cell ${c.name === 'Wispi' ? 'comp-highlight' : ''}`}>
                        <span className={`comp-icon ${c[feat.key] ? 'comp-yes' : 'comp-no'}`}>
                          {c[feat.key] ? <CheckIcon /> : <XIcon />}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <div className="laser-line" />

      {/* ── FAQ ── */}
      <section className="faq" id="faq">
        <Reveal>
          <div className="section-label"><span className="label-bar" />Field Briefing</div>
          <h2 className="section-title">Questions from the field</h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      <div className="laser-line" />

      {/* ── CTA ── */}
      <section className="cta" id="download">
        <Reveal>
          <h2 className="cta-title">The last AI tool you'll ever need to hide</h2>
          <p className="cta-subtitle">Free and open source. No telemetry. No accounts. Just you and your phantom.</p>
          <div className="hero-actions" style={{ animation: 'none' }}>
            <a href={MAC_DOWNLOAD_URL} className="btn btn-primary"><AppleIcon />Download for Mac</a>
            <span className="btn btn-secondary btn-disabled"><WindowsIcon />Windows — Coming Soon</span>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">&copy; 2025 WISPI — STEALTH SYSTEMS</div>
        <div className="footer-right">
          <a href="#features" className="footer-link">Features</a>
          <a href="#compare" className="footer-link">Compare</a>
          <a href="#faq" className="footer-link">FAQ</a>
          <a href="#download" className="footer-link">Download</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
