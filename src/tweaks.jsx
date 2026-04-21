/* global React, window */
const { useState, useEffect } = React;

function Tweaks() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [state, setState] = useState(() => ({ ...(window.__TWEAKS__ || {}) }));

  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") { setActive(true); setOpen(true); }
      if (e.data.type === "__deactivate_edit_mode") { setActive(false); setOpen(false); }
    };
    window.addEventListener("message", onMsg);
    // Announce AFTER listener is registered
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const persist = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    window.__TWEAKS__ = next;
    // Apply live
    document.documentElement.style.setProperty("--accent", next.accent);
    document.documentElement.style.setProperty("--bg", next.bg);
    document.body.classList.toggle("no-custom-cursor", !next.showCursor);
    document.body.classList.toggle("no-grain", !next.grainy);
    // Notify host
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
    // Force hero remount by key bump
    window.dispatchEvent(new CustomEvent("tweaks:changed", { detail: next }));
  };

  // Apply once on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", state.accent);
    document.documentElement.style.setProperty("--bg", state.bg);
    document.body.classList.toggle("no-custom-cursor", !state.showCursor);
    document.body.classList.toggle("no-grain", !state.grainy);
  }, []);

  if (!active) return null;

  const accents = ["#E86C2A", "#B7ADFF", "#64FFDA", "#F6C667", "#FF5E7E"];
  const bgs = ["#1E1A16", "#0E0E0E", "#14161C", "#1C1414"];

  return (
    <div className="tweaks">
      <h5>Tweaks</h5>
      <div className="tweak-row">
        <span>Accent</span>
        <div className="swatches">
          {accents.map(a => (
            <div
              key={a}
              className={`sw ${state.accent===a?"active":""}`}
              style={{ background: a }}
              onClick={() => persist({ accent: a })}
            />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <span>Background</span>
        <div className="swatches">
          {bgs.map(b => (
            <div
              key={b}
              className={`sw ${state.bg===b?"active":""}`}
              style={{ background: b }}
              onClick={() => persist({ bg: b })}
            />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <span>Cursor</span>
        <input type="checkbox" checked={!!state.showCursor} onChange={e => persist({ showCursor: e.target.checked })}/>
      </div>
      <div className="tweak-row">
        <span>Grain</span>
        <input type="checkbox" checked={!!state.grainy} onChange={e => persist({ grainy: e.target.checked })}/>
      </div>
    </div>
  );
}

Object.assign(window, { Tweaks });
