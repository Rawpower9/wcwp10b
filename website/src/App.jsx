import { useState, useEffect, useRef } from 'react';
import './App.css';

/* ═══════════════════════════════════════════
   Hooks
   ═══════════════════════════════════════════ */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useTypewriter(text, speed = 55, trigger = false) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!trigger) { setOut(''); return; }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [trigger, text, speed]);
  return out;
}

function useCounter(target, duration = 2000, trigger = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const t0 = performance.now();
    let rafId;
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(target * eased));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, target, duration]);
  return n;
}

/* ═══════════════════════════════════════════
   Section 1: Hero
   ═══════════════════════════════════════════ */
function Hero() {
  const [ref, inView] = useInView(0.3);
  const typed = useTypewriter('FROM DIRECTORY TO DIALOGUE', 65, inView);

  const formatTitle = (text) => {
    const words = text.split(' ');
    return words.map((w, i) => {
      let cls = 'word-dim';
      if (w === 'DIRECTORY') cls = 'word-directory';
      if (w === 'DIALOGUE') cls = 'word-dialogue';
      return <span key={i} className={cls}>{w}{i < words.length - 1 ? ' ' : ''}</span>;
    });
  };

  return (
    <section className="hero" ref={ref} aria-label="Introduction: From Directory to Dialogue">
      <div className="terminal-prompt">
        <span className="prompt-symbol">&gt;</span>
        <span className="prompt-text">{formatTitle(typed)}</span>
        <span className="cursor">_</span>
      </div>
      <p className={`hero-subtitle ${inView ? 'visible' : ''}`}>
        the disappearing foundation of software engineering
      </p>
      <div className={`scroll-indicator ${inView ? 'visible' : ''}`}>
        <span>scroll</span>
        <div className="scroll-arrow">&darr;</div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 2: The Directory (The Old World)
   ═══════════════════════════════════════════ */
function DirectorySection() {
  const [ref, inView] = useInView(0.15);

  const files = [
    { name: 'src', indent: 0, icon: 'folder', open: true },
    { name: 'components', indent: 1, icon: 'folder', open: true },
    { name: 'Auth.jsx', indent: 2, icon: 'jsx', active: true },
    { name: 'Dashboard.jsx', indent: 2, icon: 'jsx' },
    { name: 'UserProfile.jsx', indent: 2, icon: 'jsx' },
    { name: 'utils', indent: 1, icon: 'folder', open: true },
    { name: 'api.js', indent: 2, icon: 'js' },
    { name: 'helpers.js', indent: 2, icon: 'js' },
    { name: 'App.jsx', indent: 1, icon: 'jsx' },
    { name: 'index.js', indent: 1, icon: 'js' },
    { name: 'package.json', indent: 0, icon: 'json' },
    { name: 'README.md', indent: 0, icon: 'md' },
  ];

  const fileIcons = {
    folder: '▾',
    jsx: '⚛',
    js: '◇',
    json: '{ }',
    md: '◻',
  };

  return (
    <section className="directory-section" ref={ref} aria-label="The Directory: the old world of software engineering">
      <div className={`fade-up ${inView ? 'visible' : ''}`}>
        <div className="ide-window" aria-hidden="true">
          <div className="ide-titlebar">
            <div className="dots">
              <div className="dot dot-red" />
              <div className="dot dot-yellow" />
              <div className="dot dot-green" />
            </div>
            <span className="ide-title">VS Code — Auth.jsx</span>
          </div>
          <div className="ide-body">
            <div className="ide-sidebar">
              <div className="sidebar-header">Explorer</div>
              {files.map((f, i) => (
                <div
                  key={i}
                  className={`file-item ${f.active ? 'active' : ''}`}
                  style={{ paddingLeft: `${f.indent * 14 + 16}px` }}
                >
                  <span className={`file-icon ${f.icon}`}>
                    {fileIcons[f.icon]}
                  </span>
                  {f.name}
                </div>
              ))}
            </div>
            <div className="ide-editor">
              <div className="code-line"><span className="line-num">1</span><span className="kw">import</span> React, {'{'} <span className="fn">useState</span> {'}'} <span className="kw">from</span> <span className="str">'react'</span>;</div>
              <div className="code-line"><span className="line-num">2</span><span className="kw">import</span> {'{'} <span className="fn">validateUser</span> {'}'} <span className="kw">from</span> <span className="str">'./utils/api'</span>;</div>
              <div className="code-line"><span className="line-num">3</span></div>
              <div className="code-line"><span className="line-num">4</span><span className="kw">function</span> <span className="fn">Auth</span>({'{'} <span className="var-name">onLogin</span> {'}'}) {'{'}</div>
              <div className="code-line"><span className="line-num">5</span>  <span className="kw">const</span> [<span className="var-name">email</span>, <span className="fn">setEmail</span>] = <span className="fn">useState</span>(<span className="str">''</span>);</div>
              <div className="code-line"><span className="line-num">6</span>  <span className="kw">const</span> [<span className="var-name">password</span>, <span className="fn">setPassword</span>] = <span className="fn">useState</span>(<span className="str">''</span>);</div>
              <div className="code-line"><span className="line-num">7</span></div>
              <div className="code-line"><span className="line-num">8</span>  <span className="kw">const</span> <span className="fn">handleSubmit</span> = <span className="kw">async</span> (<span className="var-name">e</span>) =&gt; {'{'}</div>
              <div className="code-line"><span className="line-num">9</span>    <span className="var-name">e</span>.<span className="fn">preventDefault</span>();</div>
              <div className="code-line"><span className="line-num">10</span>    <span className="kw">const</span> <span className="var-name">user</span> = <span className="kw">await</span> <span className="fn">validateUser</span>(</div>
              <div className="code-line"><span className="line-num">11</span>      <span className="var-name">email</span>, <span className="var-name">password</span></div>
              <div className="code-line"><span className="line-num">12</span>    );</div>
              <div className="code-line"><span className="line-num">13</span>    <span className="kw">if</span> (<span className="var-name">user</span>.authenticated) {'{'}</div>
              <div className="code-line"><span className="line-num">14</span>      <span className="fn">onLogin</span>(<span className="var-name">user</span>);</div>
              <div className="code-line"><span className="line-num">15</span>    {'}'}</div>
              <div className="code-line"><span className="line-num">16</span>  {'}'};</div>
            </div>
            <div className="ide-terminal">
              <div className="terminal-line">
                <span className="t-user">user@dev</span>
                <span className="t-colon">:</span>
                <span className="t-path">~/project</span>
                <span className="t-dollar">$</span>
                <span className="t-cmd">npm start</span>
              </div>
              <div className="terminal-line">
                <span className="t-output">Compiled successfully in 1.2s</span>
              </div>
              <div className="terminal-line">
                <span className="t-output">Local: http://localhost:3000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="section-caption">
          <p>Engineers once navigated through files. They read every line.</p>
          <p>They understood every function, every dependency, every risk.</p>
          <p className="emphasis" style={{ marginTop: '1rem' }}>The directory was their map.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 3: The Shift
   ═══════════════════════════════════════════ */
function ShiftSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="shift-section" ref={ref} aria-label="The Shift: from IDEs to AI chat">
      <div className={`fade-up ${inView ? 'visible' : ''}`}>
        <div className="shift-container">
          {/* BEFORE */}
          <div className="shift-ide">
            <div className="shift-label before">2020</div>
            <div className="ide-window" style={{ width: 'min(400px, 85vw)' }}>
              <div className="ide-titlebar">
                <div className="dots">
                  <div className="dot dot-red" />
                  <div className="dot dot-yellow" />
                  <div className="dot dot-green" />
                </div>
                <span className="ide-title">VS Code</span>
              </div>
              <div className="ide-body shift-ide-body-before">
                <div className="ide-sidebar">
                  <div className="sidebar-header">Explorer</div>
                  {['src/', '  Auth.jsx', '  Dashboard.jsx', '  utils/', '    api.js', '  App.jsx', 'package.json'].map((f, i) => (
                    <div key={i} className={`file-item ${i === 1 ? 'active' : ''}`} style={{ paddingLeft: `${(f.length - f.trimStart().length) * 7 + 16}px`, fontSize: '0.7rem' }}>
                      {f.trim()}
                    </div>
                  ))}
                </div>
                <div className="ide-editor shift-editor">
                  <div className="code-line"><span className="kw">import</span> React <span className="kw">from</span> <span className="str">'react'</span>;</div>
                  <div className="code-line"><span className="kw">import</span> {'{'} <span className="fn">validate</span> {'}'} <span className="kw">from</span></div>
                  <div className="code-line">  <span className="str">'./utils/api'</span>;</div>
                  <div className="code-line"></div>
                  <div className="code-line"><span className="kw">function</span> <span className="fn">Auth</span>() {'{'}</div>
                  <div className="code-line">  <span className="kw">const</span> [<span className="var-name">email</span>, <span className="fn">set</span>]</div>
                  <div className="code-line">    = <span className="fn">useState</span>(<span className="str">''</span>);</div>
                  <div className="code-line">  <span className="cm">// handle form...</span></div>
                  <div className="code-line">{'}'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ARROW */}
          <div className={`shift-arrow ${inView ? 'visible' : ''}`}>&rarr;</div>

          {/* AFTER */}
          <div className="shift-ide">
            <div className="shift-label after">2025</div>
            <div className="ide-window" style={{ width: 'min(400px, 85vw)', borderColor: 'rgba(88, 166, 255, 0.12)' }}>
              <div className="ide-titlebar">
                <div className="dots">
                  <div className="dot dot-red" />
                  <div className="dot dot-yellow" />
                  <div className="dot dot-green" />
                </div>
                <span className="ide-title">Cursor</span>
              </div>
              <div className="ide-body shift-ide-body-after">
                <div className="chat-sidebar">
                  <div className="chat-sidebar-header">Agent Chat</div>
                  <div className="chat-message user">
                    <span className="chat-label">You</span>
                    Create an auth component with email and password
                  </div>
                  <div className="chat-message agent">
                    <span className="chat-label">Agent</span>
                    I'll create Auth.jsx with form validation and API integration...
                  </div>
                  <div className="chat-message user">
                    <span className="chat-label">You</span>
                    Add OAuth support
                  </div>
                </div>
                <div className="ide-editor ai-generated shift-editor">
                  <div className="ai-badge">&#9672; AI Generated</div>
                  <div className="code-line"><span className="kw">import</span> React <span className="kw">from</span> <span className="str">'react'</span>;</div>
                  <div className="code-line"><span className="kw">import</span> {'{'} <span className="fn">validate</span>,</div>
                  <div className="code-line">  <span className="fn">oauthSignIn</span> {'}'} <span className="kw">from</span></div>
                  <div className="code-line">  <span className="str">'./utils/api'</span>;</div>
                  <div className="code-line"></div>
                  <div className="code-line"><span className="kw">function</span> <span className="fn">Auth</span>() {'{'}</div>
                  <div className="code-line">  <span className="kw">const</span> [<span className="var-name">mode</span>, <span className="fn">set</span>]</div>
                  <div className="code-line">    = <span className="fn">useState</span>(<span className="str">'email'</span>);</div>
                  <div className="code-line">  <span className="cm">// ... 47 more lines</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-caption">
          <p>The file directory vanished. In its place: a conversation.</p>
          <p style={{ marginTop: '0.75rem' }}>Engineers stopped navigating files. They started <span className="emphasis">writing prompts</span>.</p>
          <p style={{ marginTop: '0.75rem' }}>The same component. Built in seconds instead of hours.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 4: The Speed
   ═══════════════════════════════════════════ */
function SpeedSection() {
  const [ref, inView] = useInView(0.2);
  const stat1 = useCounter(55, 1800, inView);
  const stat2a = useCounter(2, 1200, inView);
  const stat2b = useCounter(2, 1400, inView);
  const stat3 = useCounter(68, 2000, inView);

  const [rainLines, setRainLines] = useState([]);
  const rainContainerRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const codeSnippets = [
      'const express = require("express");',
      'app.use(cors({ origin: "*" }));',
      'const router = express.Router();',
      'router.get("/api/users", async (req, res) => {',
      '  const users = await db.query("SELECT * FROM users");',
      '  res.json({ data: users, status: "ok" });',
      '});',
      'router.post("/api/auth", async (req, res) => {',
      '  const { email, password } = req.body;',
      '  const token = jwt.sign({ email }, SECRET);',
      '  res.cookie("session", token, { httpOnly: true });',
      '});',
      'app.use("/v1", router);',
      'const PORT = process.env.PORT || 3000;',
      'app.listen(PORT, () => console.log(`Running`));',
      'module.exports = { app, router };',
      'const mongoose = require("mongoose");',
      'const UserSchema = new Schema({ email: String });',
      'const User = mongoose.model("User", UserSchema);',
      'async function findUser(id) { return User.findById(id); }',
      'async function createUser(data) { return User.create(data); }',
      'async function deleteUser(id) { return User.deleteOne({_id: id}); }',
      'const passport = require("passport");',
      'passport.use(new GoogleStrategy({ clientID: CLIENT }));',
      'app.get("/auth/google", passport.authenticate("google"));',
    ];

    let i = 0;
    const iv = setInterval(() => {
      if (i >= codeSnippets.length) { clearInterval(iv); return; }
      setRainLines(prev => [...prev, { text: codeSnippets[i], id: i }]);
      i++;
    }, 120);

    return () => {
      clearInterval(iv);
      setRainLines([]);
    };
  }, [inView]);

  useEffect(() => {
    if (rainContainerRef.current) {
      rainContainerRef.current.scrollTop = rainContainerRef.current.scrollHeight;
    }
  }, [rainLines]);

  return (
    <section className="speed-section" ref={ref} aria-label="The Speed: AI development statistics">
      <div className="stats-grid">
        <div className={`stat-card ${inView ? 'visible' : ''}`}>
          <div className="stat-number">{stat1}%</div>
          <div className="stat-label">faster task completion</div>
        </div>
        <div className={`stat-card ${inView ? 'visible' : ''}`}>
          <div className="stat-number">
            {stat2a} mo <span className="stat-arrow">&rarr;</span> {stat2b} days
          </div>
          <div className="stat-label">complex app, from scratch</div>
        </div>
        <div className={`stat-card ${inView ? 'visible' : ''}`}>
          <div className="stat-number">{stat3}%</div>
          <div className="stat-label">of engineers now use AI</div>
        </div>
      </div>

      <div className="speed-code-rain" ref={rainContainerRef} aria-hidden="true">
        {rainLines.map((line) => (
          <div
            key={line.id}
            className="code-rain-line"
            style={{ animationDelay: `${line.id * 0.02}s` }}
          >
            {line.text}
          </div>
        ))}
      </div>

      <div className={`section-caption fade-up ${inView ? 'visible' : ''}`}>
        <p><span className="emphasis">The speed was undeniable.</span></p>
        <p style={{ marginTop: '0.5rem' }}>Code poured out faster than anyone could read it.</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 5: The Fracture
   ═══════════════════════════════════════════ */
function FractureSection() {
  const [ref, inView] = useInView(0.2);

  return (
    <section className={`fracture-section ${inView ? 'in-view' : ''}`} ref={ref} aria-label="The Fracture: security vulnerabilities in AI-generated code">
      <div className={`fade-up ${inView ? 'visible' : ''}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-heading">But beneath the speed, cracks formed.</div>

        <div className="vuln-window" style={{ marginTop: '2rem' }}>
          <div className="ide-titlebar">
            <div className="dots">
              <div className="dot dot-red" />
              <div className="dot dot-yellow" />
              <div className="dot dot-green" />
            </div>
            <span className="ide-title">server.js — AI Generated</span>
          </div>
          <div className="vuln-editor">
            <div className="vuln-line"><span className="line-num">1</span><span className="kw">const</span> <span className="var-name">express</span> = <span className="fn">require</span>(<span className="str">"express"</span>);</div>
            <div className="vuln-line"><span className="line-num">2</span><span className="kw">const</span> <span className="var-name">app</span> = <span className="fn">express</span>();</div>
            <div className="vuln-line"><span className="line-num">3</span></div>
            <div className="vuln-line"><span className="line-num">4</span><span className="cm">// Get user by ID</span></div>
            <div className="vuln-line dangerous"><span className="line-num">5</span><span className="var-name">app</span>.<span className="fn">get</span>(<span className="str">"/api/user"</span>, (<span className="var-name">req</span>, <span className="var-name">res</span>) =&gt; {'{'}</div>
            <div className="vuln-line dangerous"><span className="line-num">6</span>  <span className="kw">const</span> <span className="var-name">q</span> = <span className="str">`SELECT * FROM users WHERE id = </span><span className="vuln-inject">{'${req.params.id}'}</span><span className="str">`</span>;</div>
            <div className="vuln-annotation">SQL INJECTION — unsanitized user input directly in query</div>
            <div className="vuln-line"><span className="line-num">7</span>  <span className="var-name">db</span>.<span className="fn">execute</span>(<span className="var-name">q</span>).<span className="fn">then</span>(<span className="var-name">r</span> =&gt; <span className="var-name">res</span>.<span className="fn">json</span>(<span className="var-name">r</span>));</div>
            <div className="vuln-line"><span className="line-num">8</span>{'}'});</div>
            <div className="vuln-line"><span className="line-num">9</span></div>
            <div className="vuln-line"><span className="line-num">10</span><span className="cm">// Render user content</span></div>
            <div className="vuln-line dangerous"><span className="line-num">11</span><span className="var-name">app</span>.<span className="fn">post</span>(<span className="str">"/api/render"</span>, (<span className="var-name">req</span>, <span className="var-name">res</span>) =&gt; {'{'}</div>
            <div className="vuln-line dangerous"><span className="line-num">12</span>  <span className="var-name">res</span>.<span className="fn">send</span>(<span className="str">`&lt;div&gt;</span><span className="vuln-inject">{'${req.body.content}'}</span><span className="str">&lt;/div&gt;`</span>);</div>
            <div className="vuln-annotation">CROSS-SITE SCRIPTING — raw user HTML rendered without escaping</div>
            <div className="vuln-line"><span className="line-num">13</span>{'}'});</div>
            <div className="vuln-line"><span className="line-num">14</span></div>
            <div className="vuln-line"><span className="line-num">15</span><span className="cm">// Session management</span></div>
            <div className="vuln-line dangerous"><span className="line-num">16</span><span className="var-name">app</span>.<span className="fn">use</span>(<span className="fn">session</span>({'{'} <span className="var-name">secret</span>: <span className="str">"<span className="vuln-inject">mysecret123</span>"</span> {'}'}));</div>
            <div className="vuln-annotation">HARDCODED SECRET — credentials exposed in source code</div>
            <div className="vuln-line"><span className="line-num">17</span></div>
            <div className="vuln-line"><span className="line-num">18</span><span className="var-name">app</span>.<span className="fn">listen</span>(<span className="num">3000</span>);</div>
          </div>
        </div>

        <div className="section-caption" style={{ marginTop: '3rem' }}>
          <p><span className="emphasis">AI-generated code carries unintended cybersecurity risks.</span></p>
          <p style={{ marginTop: '0.75rem' }}>Code that appears to work perfectly can harbor vulnerabilities</p>
          <p>invisible to anyone who didn't write it line by line.</p>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-dim)' }}>No one was reading it line by line anymore.</p>
        </div>
      </div>

      <div className="glitch-overlay" />
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 6: The Foundation
   ═══════════════════════════════════════════ */
function FoundationSection() {
  const [ref, inView] = useInView(0.2);

  return (
    <section className="foundation-section" ref={ref} aria-label="The Foundation: eroding understanding">
      <div className={`fade-up ${inView ? 'visible' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="foundation-heading">
          What happens when the surface is all that remains?
        </div>

        <div className="foundation-layers" style={{ marginTop: '3rem' }}>
          {/* Layer 1: Prompts — bright */}
          <div className="foundation-layer layer-prompt">
            <span className="layer-label">What engineers write</span>
            <div className="layer-content">
              <div>"Create an authentication system with OAuth,</div>
              <div>session management, and role-based access control."</div>
            </div>
          </div>

          {/* Layer 2: Generated Code — dim */}
          <div className="foundation-layer layer-code">
            <span className="layer-label">What AI generates</span>
            <div className="layer-content" style={{ fontFamily: 'var(--font-mono)' }}>
              <div>{'function authenticate(user, options) {'}</div>
              <div>{'  const token = jwt.sign({ id: user.id },'}</div>
              <div>{'    process.env.SECRET, { expiresIn: "24h" });'}</div>
              <div>{'  return { user, token, session: ... };'}</div>
              <div>{'}'}</div>
            </div>
          </div>

          {/* Layer 3: Understanding — nearly invisible */}
          <div className="foundation-layer layer-understanding">
            <span className="layer-label">What engineers understand</span>
            <div className="layer-content">
              <div style={{ opacity: 0.6 }}>Why was this approach chosen?</div>
              <div style={{ opacity: 0.4 }}>What are the edge cases?</div>
              <div style={{ opacity: 0.25 }}>Where are the failure modes?</div>
              <div style={{ opacity: 0.1 }}>How does this scale under load?</div>
            </div>
          </div>
        </div>

        <div className="foundation-annotation">
          <div className="annotation-end bright">
            <div className="annotation-bar" />
            Visible
          </div>
          <div className="annotation-end faded">
            Eroding
            <div className="annotation-bar" />
          </div>
        </div>

        <div className="section-caption">
          <p>If engineers don't write code, how will they learn</p>
          <p>to guide what they don't understand?</p>
          <p style={{ marginTop: '1.25rem', fontSize: '0.9rem' }}>
            In order to be a good guide, they have to go through the process,
            understand the pitfalls, and be ready to catch others when they
            go down the wrong path.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 7: Closing
   ═══════════════════════════════════════════ */
function ClosingSection() {
  const [ref, inView] = useInView(0.3);

  return (
    <section className="closing-section" ref={ref} aria-label="Closing reflection">
      <div className={`closing-question ${inView ? 'visible' : ''}`}>
        Who will guide the guides?
        <span className="closing-cursor" />
      </div>
      <div className={`closing-text ${inView ? 'visible' : ''}`}>
        What we <span className="closing-highlight">build fast today</span> may{' '}
        <span className="closing-highlight">crumble tomorrow</span>.
      </div>
      <div className={`closing-attribution ${inView ? 'visible' : ''}`}>
        Based on "From Directory to Dialogue" — Ritvik Setty, WCWP 10B
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   App
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <main className="app">
      <Hero />
      <DirectorySection />
      <ShiftSection />
      <SpeedSection />
      <FractureSection />
      <FoundationSection />
      <ClosingSection />
    </main>
  );
}
