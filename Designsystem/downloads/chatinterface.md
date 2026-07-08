# Chat Interface — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Templates (54/54) | **Status:** Stable

---

## Overview

Messaging layout for borrower-lender communication, support tickets, and team chat. Two-panel layout with a scrollable conversation list on the left and a message thread on the right. Features sent/received bubbles, online status indicators, typing animation, date dividers, and an auto-resizing compose area.

---

## Anatomy

| Region            | Element                                                         |
|-------------------|-----------------------------------------------------------------|
| Conversation list | 280px sidebar — avatar, status dot, name, preview, time, badge |
| Thread header     | 56px — avatar, name, online status, phone/video/more actions   |
| Message thread    | Scrollable log — date dividers, recv/sent rows, typing dots     |
| Received bubble   | Panel bg, 1px border, bottom-left tail radius                   |
| Sent bubble       | Blue (#4065C5) bg, white text, bottom-right tail radius         |
| Typing indicator  | 3 bouncing dots with staggered CSS animation                    |
| Compose area      | Auto-resize textarea, attach icon, emoji btn, send btn          |

---

## Measurements

| Property              | Value                                |
|-----------------------|--------------------------------------|
| Conv list width       | 280px                                |
| Thread header height  | 56px                                 |
| Conv item height      | ~62px (auto)                         |
| Bubble padding        | 9px 13px                             |
| Bubble radius         | 14px                                 |
| Bubble tail radius    | 4px (bottom-left / bottom-right)     |
| Max bubble width      | 72% of thread                        |
| Sent bg               | #4065C5                              |
| Recv bg               | var(--bg-panel)                      |
| Active conv bg        | rgba(64,101,197,.07)                 |
| Unread badge bg       | #4065C5                              |
| Online dot            | #3F902B / 9px / 2px white border     |
| Away dot              | #D98F00                              |
| Offline dot           | var(--text-3)                        |
| Typing dot size       | 6px                                  |
| Typing animation      | ciDotBounce 1.2s ease-in-out         |
| Compose min height    | 38px                                 |
| Compose max height    | 120px (then scrolls)                 |
| Compose border        | 1.5px solid var(--border) / 10px r   |
| Send btn size         | 38×38px / 10px radius                |

---

## HTML

```html
<div class="ci-shell" style="display:flex; height:100vh; overflow:hidden;">

  <!-- Conversation list -->
  <aside class="ci-sidebar" role="complementary" aria-label="Conversations">
    <div class="ci-sidebar-header">
      <span class="ci-sidebar-title">Messages</span>
      <button class="ci-new-btn" aria-label="New conversation">+</button>
    </div>

    <div class="ci-conv-list" role="list">
      <div class="ci-conv-item active" role="listitem" aria-selected="true">
        <div class="ci-conv-avatar" style="background:#4065C5;">PM</div>
        <div class="ci-status-dot online"></div>
        <div class="ci-conv-info">
          <div class="ci-conv-name">Priya Mehta</div>
          <div class="ci-conv-preview">Sure, I'll review the docs today</div>
        </div>
        <div class="ci-conv-meta">
          <span class="ci-conv-time">10:42</span>
          <span class="ci-unread-badge">2</span>
        </div>
      </div>
    </div>
  </aside>

  <!-- Thread -->
  <div class="ci-thread">
    <div class="ci-thread-header">
      <div class="ci-thread-avatar" style="background:#4065C5;">PM</div>
      <div>
        <div class="ci-thread-name">Priya Mehta</div>
        <div class="ci-thread-status">Online</div>
      </div>
      <!-- action buttons -->
    </div>

    <div class="ci-messages" role="log" aria-live="polite">
      <div class="ci-date-divider">Today</div>

      <!-- Received -->
      <div class="ci-msg-row recv">
        <div class="ci-msg-avatar" style="background:#4065C5;">PM</div>
        <div class="ci-bubble">Message text here.</div>
        <span class="ci-msg-time">10:30</span>
      </div>

      <!-- Sent -->
      <div class="ci-msg-row sent">
        <div class="ci-bubble">Your reply here.</div>
        <span class="ci-msg-time">10:32</span>
      </div>

      <!-- Typing indicator -->
      <div class="ci-typing">
        <div class="ci-msg-avatar" style="background:#4065C5;">PM</div>
        <div class="ci-typing-bubble">
          <div class="ci-typing-dot"></div>
          <div class="ci-typing-dot"></div>
          <div class="ci-typing-dot"></div>
        </div>
      </div>
    </div>

    <!-- Compose -->
    <div class="ci-input-area">
      <div class="ci-input-wrap">
        <textarea class="ci-textarea"
                  placeholder="Type a message…"
                  aria-label="Compose message"
                  rows="1"></textarea>
      </div>
      <button class="ci-send-btn" aria-label="Send"><!-- send icon --></button>
    </div>
  </div>

</div>
```

---

## CSS

```css
.ci-shell { display: flex; height: 100vh; overflow: hidden; }

/* Sidebar */
.ci-sidebar {
  width: 280px; flex-shrink: 0;
  display: flex; flex-direction: column;
  background: var(--bg-panel);
  border-right: 1px solid var(--border);
}
.ci-sidebar-header {
  height: 56px; padding: 0 16px;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid var(--border); flex-shrink: 0;
}

/* Conv item */
.ci-conv-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background 120ms; position: relative;
}
.ci-conv-item:hover  { background: var(--bg-inset); }
.ci-conv-item.active { background: rgba(64,101,197,.07); }

/* Status dots */
.ci-status-dot {
  width: 9px; height: 9px; border-radius: 50%;
  border: 2px solid var(--bg-panel);
  position: absolute; bottom: 10px; left: 42px;
}
.ci-status-dot.online  { background: #3F902B; }
.ci-status-dot.away    { background: #D98F00; }
.ci-status-dot.offline { background: var(--text-3); }

/* Unread badge */
.ci-unread-badge {
  min-width: 17px; height: 17px; border-radius: 9px;
  background: #4065C5; color: #fff;
  font-size: 10px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
}

/* Thread */
.ci-thread {
  flex: 1; display: flex; flex-direction: column;
  background: var(--bg-inset); min-width: 0;
}
.ci-thread-header {
  height: 56px; background: var(--bg-panel);
  border-bottom: 1px solid var(--border);
  padding: 0 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;
}

/* Messages */
.ci-messages {
  flex: 1; overflow-y: auto; padding: 16px;
  display: flex; flex-direction: column; gap: 4px;
}
.ci-date-divider {
  display: flex; align-items: center; gap: 10px;
  margin: 10px 0 6px; color: var(--text-3); font-size: 11px; font-weight: 600;
}
.ci-date-divider::before, .ci-date-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}

/* Bubbles */
.ci-msg-row { display: flex; align-items: flex-end; gap: 8px; max-width: 72%; }
.ci-msg-row.sent  { align-self: flex-end; flex-direction: row-reverse; }
.ci-msg-row.recv  { align-self: flex-start; }
.ci-bubble { padding: 9px 13px; border-radius: 14px; font-size: 13px; line-height: 1.55; }
.ci-msg-row.recv .ci-bubble {
  background: var(--bg-panel); border: 1px solid var(--border);
  border-bottom-left-radius: 4px; color: var(--text-1);
}
.ci-msg-row.sent .ci-bubble {
  background: #4065C5; color: #fff; border-bottom-right-radius: 4px;
}

/* Typing */
.ci-typing-bubble { display: flex; gap: 4px; align-items: center;
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: 14px; border-bottom-left-radius: 4px; padding: 10px 14px; }
.ci-typing-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--text-3);
  animation: ciDotBounce 1.2s ease-in-out infinite;
}
.ci-typing-dot:nth-child(2) { animation-delay: .2s; }
.ci-typing-dot:nth-child(3) { animation-delay: .4s; }
@keyframes ciDotBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: .5; }
  30%           { transform: translateY(-5px); opacity: 1; }
}

/* Compose */
.ci-input-area {
  background: var(--bg-panel); border-top: 1px solid var(--border);
  padding: 12px 16px; display: flex; align-items: flex-end; gap: 8px;
}
.ci-textarea {
  width: 100%; box-sizing: border-box;
  min-height: 38px; max-height: 120px;
  padding: 9px 40px 9px 14px;
  background: var(--bg-inset); border: 1.5px solid var(--border);
  border-radius: 10px; font-size: 13px; resize: none; outline: none;
}
.ci-textarea:focus { border-color: #4065C5; }
.ci-send-btn {
  width: 38px; height: 38px; border-radius: 10px; border: none;
  background: #4065C5; color: #fff; cursor: pointer; flex-shrink: 0;
}
.ci-send-btn:hover { background: #3054B0; }
```

---

## JavaScript

```javascript
// Auto-resize textarea
function ciAutoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// Enter to send, Shift+Enter for newline
function ciKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    ciSendMessage();
  }
}

// Append sent bubble + simulate reply
function ciSendMessage() {
  const input = document.getElementById('ciInput');
  const text  = input.value.trim();
  if (!text) return;

  const msgs   = document.getElementById('ciMessages');
  const typing = document.getElementById('ciTyping');
  const now    = new Date();
  const time   = now.getHours().toString().padStart(2,'0') + ':'
               + now.getMinutes().toString().padStart(2,'0');

  const row = document.createElement('div');
  row.className = 'ci-msg-row sent';
  row.innerHTML = `<div class="ci-bubble">${text}</div>
                   <span class="ci-msg-time">${time}</span>`;
  msgs.insertBefore(row, typing);
  input.value = '';
  input.style.height = 'auto';
  msgs.scrollTop = msgs.scrollHeight;

  // Show typing then reply
  ciShowTyping(true);
  setTimeout(() => { ciShowTyping(false); ciAppendReply(); }, 1800);
}

function ciShowTyping(show) {
  const t = document.getElementById('ciTyping');
  t.style.display = show ? 'flex' : 'none';
  if (show) t.parentElement.scrollTop = t.parentElement.scrollHeight;
}

function ciAppendReply() {
  const replies = [
    'Got it! I\'ll get back to you shortly.',
    'Thanks for the update.',
    'Sure, let me check on that.',
    'Understood. I\'ll share the documents soon.'
  ];
  // append recv bubble with random reply
}

// Switch active conversation
function ciSelectConv(el, name, initials, color) {
  document.querySelectorAll('.ci-conv-item').forEach(i => {
    i.classList.remove('active');
    i.setAttribute('aria-selected', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-selected', 'true');
  document.getElementById('ciThreadName').textContent = name;
  document.getElementById('ciThreadAvatar').textContent = initials;
  document.getElementById('ciThreadAvatar').style.background = color;
}
```

---

## Accessibility

- Sidebar `<aside>` with `aria-label="Conversations"`; conv list `role="list"` with items `role="listitem"` and `aria-selected`
- Active conversation: `aria-selected="true"` toggled in JS
- Thread messages: `role="log"` + `aria-live="polite"` on `.ci-messages` — new messages announced to screen readers
- Status dots: visually only; supplement with visually-hidden text (e.g. "Online") adjacent to name
- Compose: `<textarea>` with `aria-label="Compose message"`; send button `aria-label="Send message"`
- Unread badge: provide `aria-label="N unread messages"` on the badge element
- Typing indicator: hide from assistive tech with `aria-hidden="true"` — the `aria-live` log will announce the real reply

---

## Related Components

- **Sidemenu + Navbar** (`sidemenu-with-navbar.html`) — full-page app shell template
- **Avatar** (`avatar.html`) — avatar used for conversation items and message bubbles
- **Badge** (`badge.html`) — unread count badges in conversation list
- **Textarea** (`textarea.html`) — auto-resize textarea for compose area
- **Indicator** (`indicator.html`) — online/away/offline status dots

---

*Yubi Market Design System · Chat Interface v1.0.0 · Internal Use*
