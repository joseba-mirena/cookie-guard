/*!
 * Cookie Guard - GDPR/CCPA Compliance Consent Management System.
 *
 * @package    Cookie Guard JS
 * @version    v3.6.0
 * @copyright  2026 JosebaMirena.com
 * @license    MIT
 *             https://www.josebamirena.com/media/assets/cookie-guard/3.6.0/LICENSE
 * @author     Joseba Mirena
 * 
 * MAIN FEATURES:
 * - Legal Compliance: Fully GDPR/CCPA compliant workflow.
 * - Hybrid Modes: Supports both full third-party consent and "no-cookies" informational mode.
 * - Privacy Focus: Optional persistent "Privacy" floating button to re-open settings.
 * - Optional Legal Terms acceptance and Legal URL smart handling.
 * - Smart Execution: Auto-activates Analytics/Marketing scripts with AND logic support (handles type="text/plain").
 * - Zero Dependencies: Pure Vanilla JavaScript; no jQuery or external libraries required.
 * - Encapsulation: Built within an IIFE to ensure no global namespace pollution.
 * - Performance: Ultra-lightweight architecture (~13 kB minified).
 * - Accessibility: Implements ARIA standards for screen readers and keyboard navigation.
 * - Global Reach: Support for 22 languages (LTR & RTL) with automatic browser detection.
 *     Locales: en, es, ca, eu, gl, et, ar, pt, pl, vi, fr, de, it, ru, zh, ja, id, ko, tr, nl, hi, bn.
 * - UI/UX: Dynamic CSS/HTML injection with a fully responsive, mobile-first design.
 * - Customization: Flexible configuration for expiration, link colors, and button border-radius.
 * - Developer API: Public 'toggle', 'open', and 'reset' methods for external control.
 * 
 * DOCUMENTATION:
 * https://www.josebamirena.com/media/assets/cookie-guard/3.6.0/README
 */

const CookieGuard = (function() {
    // Unique identifier for the consent cookie
    const C_N = "cg_cookie";
    // Unique identifier for locale wording cache
    const C_W = "cg_word";

    let CONF = {}; let LOC = {};

    const $=document;

    // Get the script's own URL to determine the base directory
    const gSB = () => {
        // script base
        let sb = '';
        // Locales files folder
        const f = '/locales';
        // Standard scripts
        const cs = $.currentScript;
        if (cs) { 
            sb = cs.src; 
        } else {        
            // Search for any script that includes our filename
            const scrs = $.getElementsByTagName('script');
            for (let s of scrs) {
                if (s.src.includes('cookie-guard')) {
                    sb = s.src;
                    break;
                }
            }
        }
        return sb 
            ? sb.substring(0, sb.lastIndexOf('/')) + f
            : '.' + f;
    };

    // List of available translations in ./locales directory
    const A_L = ['en', 'es', 'ca', 'eu', 'gl', 'et', 'ar', 'pt', 'vi', 'fr', 'de', 'it', 'ru', 'zh', 'ja', 'id', 'ko', 'tr', 'nl', 'hi', 'bn', 'pl'];

    /**
     * Fetches localization from external JSON
     */
    async function load() {
        // Check wording cache
        const cached = localStorage.getItem(C_W);
        if (cached) {
            try {
                const cacheData = JSON.parse(cached);
                LOC = cacheData.locale;
                return;
            } catch (e) {}
        }

        let lang = CONF.locale === 'auto' 
            ? navigator.language.split('-')[0] 
            : CONF.locale;

        // If language is not available defaults to en
        if (!A_L.includes(lang)) {
            lang = 'en';
        }

        try {
            const res = await fetch(`${CONF.path}/${lang}.json`);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            const data = await res.json();
            LOC = { 
                t: data, 
                r: data.dir === 'rtl', 
                lc: lang 
            };
            // Save wording to cache
            localStorage.setItem(C_W, JSON.stringify({
                lang: lang,
                locale: LOC
            }));
        } catch (error) {
            console.error(`[CookieGuard] Failed to load locale "${lang}".`, error);
        }
    }

    /**
     * Returns the Shield Icon SVG with appropriate size and direction.
     */
    const SVG = (s) => `
        <svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="cg-svg">
            <path d="M12 2L4 5V11C4 16.19 7.41 21.05 12 22C16.59 21.05 20 16.19 20 11V5L12 2Z" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 11L11 13L15 9" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;

    /**
     * Shortener
     */
    function gID(id) {
        return $.getElementById(id);
    }

    /**
     * Common CSS
     */
    const gV = () => `:root { --cg-vl: ${CONF.link}; --cg-vh: ${CONF.hover}; --cg-vr: ${CONF.radius}px; }`;
    const gC = () => `
        /* Typography */
        .cg-tt { display: flex; align-items: center; }
        .cg-tt { color:#fff; font-weight:700; }
        .cg-cat { color: #ebebeb; font-weight:700; }
        .cg-des { display: block; color: rgba(255,255,255,0.7); line-height: 1.3; font-size: 0.92rem; margin-bottom: 4px; }
        .cg-l { color: var(--cg-vl); font-size: 0.75rem; font-weight: 600; cursor: pointer; text-decoration: none !important; transition: color 0.2s ease; display: inline-block; }
        .cg-l:hover { color: var(--cg-vh); }
        
        /* Buttons */
        .cg-btn { 
            font-size: 1.2rem;
            width: 100%; border: none; padding: 14px; border-radius: var(--cg-vr); 
            font-weight: 800; cursor: pointer; text-transform: uppercase; color: #fff; margin-bottom: 6px;
            transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, filter 0.3s ease, transform 0.1s ease; 
        }
        .cg-btn:active { transform: scale(0.98); }
        .cg-b-pri { background: #2ecc71; color: #000; }
        .cg-b-con { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); margin-top: 8px; color: rgba(255,255,255,0.8); }
        .cg-b-con:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.9); }
        .cg-b-sec { background: #2eb6e8; color: #000; }
        .cg-b-pri:hover { filter: brightness(1.1); }
        .cg-b-sec:hover { filter: brightness(1.2); }

        /* SVG */
        .cg-svg { margin-inline-end:6px; vertical-align:middle; }
    `;

    /**
     * Single stylish
     */
    function style(id, css) {
        if (gID(id)) return;
        const s = $.createElement('style');
        s.id = id;
        s.innerHTML = css;
        $.head.appendChild(s);
    }

    function cssI() {
        style('cg-csi', `
            ${gV()}
            #cg-inf[data-dir="ltr"] { direction: ltr; }
            #cg-inf[data-dir="rtl"] { direction: rtl; }

            /* Common Styles */
            ${gC()}

            #cg-inf { 
                position: fixed; bottom: 0; inset-inline-start: 0; width: 100%; background: rgba(10, 15, 30, 0.98); 
                border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 20px 45px; z-index: 999999; 
                display: flex; align-items: center; justify-content: space-between; gap: 30px; box-sizing: border-box; 
                box-shadow: 0 -10px 40px rgba(0,0,0,0.4);
            }

            .cg-tt { font-size: 1rem; margin-bottom: 0; }
            .cg-txt { font-size: 0.92rem; line-height: 1.6; color: rgba(255, 255, 255, 0.7); flex: 1; text-align: start; }
            .cg-b-sec { margin-inline-end: 8px; }
            .cg-b-inf { margin-bottom:0; width:auto; padding: 12px 30px; }

            /* --- RESPONSIVE --- */
            @media (max-width: 768px) {
                #cg-inf { flex-direction: column; padding: 25px; text-align: center; }
                .cg-wr { width: 100%; }
            }
            @media (max-width: 480px) {
                .cg-des { font-size: 0.85rem; }
            }
        `);
    }

    function cssUI() {
        style('cg-csui', `
            ${gV()}
            #cg-ov[data-dir="ltr"] { direction: ltr; }
            #cg-ov[data-dir="rtl"] { direction: rtl; }
            #cg-ro[data-dir="ltr"] { direction: ltr; }
            #cg-ro[data-dir="rtl"] { direction: rtl; }

            /* Overlay Base */
            #cg-ov { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(15px); z-index: 999998; display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.4s ease; }
            #cg-ov.cg-visible { opacity: 1; }

            /* Wrapper & sizing */
            #cg-w { z-index: 999999; width: 100%; max-width: 520px; transform: scale(0); transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            #cg-ov.cg-visible #cg-w { transform: scale(1); }

            /* Card Design */
            .cg-cd { text-align: start; background: rgba(10, 15, 30, 0.98); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 32px; padding: 45px; margin: 20px; box-shadow: 0 40px 100px rgba(0,0,0,0.6); max-height: 85vh; overflow-y: auto; scrollbar-width: none; }
            .cg-cd::-webkit-scrollbar { display: none; }
            
            /* Common Styles */
            ${gC()}

            /* Switch & Items */
            .cg-it { padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
            .cg-hd { display: flex; justify-content: space-between; align-items: center; }

            .cg-sw { position: relative; width: 38px; height: 20px; flex-shrink: 0; }
            .cg-sw input { opacity: 0; width: 0; height: 0; }
            .cg-sdr { position: absolute; cursor: pointer; inset: 0; background: rgba(255,255,255,0.08); border-radius: 30px; transition: .3s; }
            .cg-sdr:before { position: absolute; content: ""; height: 14px; width: 14px; bottom: 3px; background: #fff; border-radius: 50%; transition: .3s; }
            input:checked + .cg-sdr { background: #10b981; } 
            [data-dir="ltr"] input:checked + .cg-sdr:before { transform: translateX(18px); }
            [data-dir="rtl"] input:checked + .cg-sdr:before { transform: translateX(-18px); }

            .cg-tt { font-size: 1.8rem; letter-spacing: -0.02em; margin-bottom: 10px; padding-bottom: 2px; border-bottom: 2px solid rgba(255,255,255,0.1); }
            .cg-dis { pointer-events: none; filter: grayscale(1); opacity: 0.5; }
            .cg-ck { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
            .cg-man { appearance: none; width: 14px; height: 14px; border: 2px solid #555; border-radius: 4px; background: #333; cursor: not-allowed; position: relative; flex-shrink: 0; display: inline-block; vertical-align: middle; }
            .cg-man:checked::after { content: "✓"; position: absolute; color: #888; font-size: 10px; top: 50%; left: 50%; transform: translate(-50%, -55%); }
            .cg-ft { text-align:center; margin-top: 12px; display:flex; align-items:center; justify-content:center; gap:12px; }

            .cg-ck span, .cg-sep { color:rgba(255,255,255,0.5); font-size:0.82rem; }
            .cg-ck span a { font-size:0.82rem; }
            .cg-clear { color: #ebebeb; display: block; clear: both; margin-top: 8px; }

            /* Reopen Button */
            #cg-ro { 
                inset-inline-start: 20px;
                position: fixed; bottom: 20px; background: #0f172a; border: 1px solid rgba(255,255,255,0.1); 
                color: rgba(255,255,255,0.8);
                padding: 8px 12px; border-radius: 18px; font-size: 0.75rem; font-weight: 700; 
                cursor: pointer; z-index: 9999; display: none; align-items: center; 
                transition: opacity 0.3s, background 0.3s, border-color 0.3s, color 0.3s; 
            }
            #cg-ro:hover { color:#fff; background: #1e293b; border-color: #333; }
            #cg-ro.cg-show { display: flex; }

            /* --- RESPONSIVE --- */
            @media (max-width: 480px) {
                #cg-ov { transform: translateY(0); align-items: flex-end; }
                #cg-w { 
                    transform: translateY(100%); 
                    opacity: 1; 
                    max-width: 95%; 
                    margin: 0;
                    transform-origin: bottom center;
                    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                }
                #cg-ov.cg-visible #cg-w { transform: translateY(0); }
                .cg-cd { border-radius: 32px 32px 0 0; }
                .cg-tt { font-size: 1.4rem; letter-spacing: 0; }
                #cg-ro { bottom: 15px; padding: 8px 14px; }
            }
        `);
    }

    /**
     * Generates and injects the Modal HTML into the DOM.
     */
    function buildUI() {
        const { t, r } = LOC;
        if (gID('cg-ov')) return;
        const saved = g_CD() || { analytics: false, marketing: false };
        const o = $.createElement('div');
        o.id = 'cg-ov';
        o.dataset.dir = r ? 'rtl' : 'ltr';

        // ARIA attributes
        o.setAttribute('role', 'dialog');
        o.setAttribute('aria-modal', 'true');
        o.setAttribute('aria-labelledby', 'cg-tid');
        
        // Build the legal mandatory checkbox if url is provided
        const l = CONF.url ? `
            <div class="cg-ck">
                <input type="checkbox" checked disabled class="cg-man" aria-label="${LOC.t.legalAcceptancePrefix} ${LOC.t.legalTermsText}">
                <span>${t.legalAcceptancePrefix}<a href="${CONF.url}" class="cg-l">${t.legalTermsText}</a></span>
            </div>` : '';

        // Conditional Footer Legal Link & Separator
        const f = `
            <div class="cg-ft">
                <a class="cg-l" href="/" onclick="CookieGuard.policy(); return false;">${t.policyLinkText}</a>
                ${CONF.url ? `
                    <span class="cg-sep">${CONF.separator}</span>
                    <a class="cg-l" href="${CONF.url}">${t.legalTermsText}</a>
                ` : ''}
            </div>`;

        o.innerHTML = `
            <div id="cg-w">
                <div class="cg-cd">
                    <div id="cg-m-v">
                        <div class="cg-tt" id="cg-tid">${SVG(28)} ${t.title}</div>
                        <p class="cg-des">${t.description}</p>
                        <div id="cg-op" style="display:none;">
                            ${[
                                {id:"essential", t:t.catEssential, d:t.descEssential, r:true}, 
                                {id:"analytics", t:t.catAnalytics, d:t.descAnalytics, r:false}, 
                                {id:"marketing", t:t.catMarketing, d:t.descMarketing, r:false}
                            ].map(cat => `
                                <div class="cg-it">
                                    <div class="cg-hd">
                                        <span class="cg-cat">${cat.t}</span>
                                        <label class="cg-sw ${cat.r ? 'cg-dis' : ''}">
                                            <input type="checkbox" id="cg-${cat.id}" ${cat.r ? 'checked disabled' : (saved[cat.id] !== false ? 'checked' : '')}>
                                            <span class="cg-sdr"></span>
                                        </label>
                                    </div>
                                    <span class="cg-des">${cat.d}</span>
                                </div>
                            `).join('')}
                        </div>
                        ${l}
                        <button class="cg-btn cg-b-pri" onclick="CookieGuard.action('all')">${t.btnAcceptAll}</button>
                        <button class="cg-btn cg-b-sec" onclick="CookieGuard.reject()">${t.btnRejectOpt}</button>
                        <button id="cg-conf" class="cg-btn cg-b-con" onclick="CookieGuard.config()">${t.btnConfigure}</button>
                        ${f}
                    </div>
                    <div id="cg-leg" style="display:none;">
                        <div class="cg-tt">${SVG(28)} ${t.legalTitle}</div>
                        <p class="cg-des">${t.legalContent}</p>
                        <button class="cg-btn cg-b-con" onclick="CookieGuard.show()">${t.btnBack}</button>
                    </div>
                </div>
            </div>
        `;
        $.body.appendChild(o);
        
        // Re-open floating button setup
        if(CONF.reopen) {
            const btn = $.createElement('button');
            btn.id = 'cg-ro';
            btn.dataset.dir = r ? 'rtl' : 'ltr';
            btn.innerHTML = `${SVG(16)} ${t.reopenBtn}`;
            btn.onclick = () => CookieGuard.open();
            $.body.appendChild(btn);
        }
    }

    /**
     * Reads consent data from browser cookies.
     */
    function g_CD() {
        const match = document.cookie.match(new RegExp('(^| )' + C_N + '=([^;]+)'));
        return match ? JSON.parse(match[2]) : null;
    }

    return {
        /**
         * Config injectable script initialization.
         */
        init: async function(uC = {}) {
            // Deep merge user conf into defaults
            CONF = Object.assign({
                locale: 'auto', // auto or 2 letters locale
                consent: true, // third party cookies are used
                url: null, // null or legal page relative url
                reopen: true, // renders privacy button
                radius: 12, // buttons radius in pixels
                delay: 800, // modal delay in miliseconds
                link: "#10b981", // links color
                hover: "#3b82f6", // links hover color
                separator: "•", // modal footer separator
                expiration: 365, // cookie expiration in days
                path: gSB(), // locale JSON files path
            }, uC);

            // Load language before rendering
            await load();

            // Reset Debug Shortcut: Ctrl + Shift + X
            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'X') {
                    this.reset();
                }
            });

            if (CONF.consent !== true) {
                const consent = g_CD() || localStorage.getItem(C_N);
                /* If no local record exists, show the thin banner */
                if (!consent) {
                    /* Render Info modal */
                    this.reI();
                }
            } else {
                /* Render full UI modal */
                this.reUI();
            }
        },
        /**
         * Clears consent data and reloads the page
         */
        reset: function() {
            // Clear the consent cookie
            document.cookie = `${C_N}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            // Clear the localStorage entry
            localStorage.removeItem(C_N);
            // Clear the localStorage wording
            localStorage.removeItem(C_W);
            
            location.reload();
        },
        /**
         * Renders info modal for sites NOT using third-party cookies
         */
        reI: function() {
            const { t, r } = LOC;
            const isLeg = CONF.url && window.location.pathname.includes(CONF.url);

            cssI();

            const l = CONF.url && !isLeg ? `
                <button class="cg-btn cg-b-inf cg-b-sec" onclick="window.location.href='${CONF.url}'">
                    ${t.btnInfo}
                </button>` : '';

            const o = $.createElement('div');
            o.dataset.dir = r ? 'rtl' : 'ltr';
            o.id = 'cg-inf';
            o.innerHTML = `
                <div class="cg-txt">
                    <span class="cg-tt">${SVG(16)} ${t.policyLinkText}</span>
                    ${t.noThirdParty}
                </div>
                <div class="cg-wr">
                    ${l}
                    <button class="cg-btn cg-b-inf cg-b-pri" onclick="CookieGuard.reject()">
                        ${t.btnDismiss}
                    </button>
                </div>
            `;
            $.body.appendChild(o);
            
            // Smooth animation
            o.style.opacity = '0';
            o.style.transform = 'translateY(100%)';
            o.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                o.style.opacity = '1';
                o.style.transform = 'translateY(0)';
            }, 100);
        },
        /**
         * Renders full UI modal for sites using third-party cookies
         */
        reUI: function() {
            cssUI();
            buildUI();

            const isLeg = CONF.url && window.location.pathname.includes(CONF.url);
            const consent = g_CD();

            /* 1. Always show the reopen/privacy button if enabled. */
            if (CONF.reopen) {
                setTimeout(() => {
                    gID('cg-ro')?.classList.add('cg-show');
                }, 400);
            }

            /* 2. Logic for auto-opening the modal */
            if (!consent && !isLeg) {
                /* No consent and not on legal page: open automatically after delay */
                setTimeout(() => this.open(), CONF.delay);
            } else if (consent) {
                /* Consent already exists: just exec the script categories */
                this.exec(consent);
            }
            
            /* If we are on legal page and no consent exists, the modal stays closed. */
        },
        /**
         * API Method: Toggles modal state. Callable from external HTML links.
         */
        toggle: function() {
            const el = gID('cg-ov');
            if (el.style.display === 'flex') { this.close(); } else { this.open(); }
        },
        open: function() {
            const el = gID('cg-ov');
            el.style.display = 'flex';
            this.show(); 
            setTimeout(() => { el.classList.add('cg-visible'); $.body.style.overflow = 'hidden'; }, 10);
        },
        close: function() {
            /* Check if the site uses third-party cookies to determine which UI component to close */
            if (CONF.consent === true) {
                const o = gID('cg-ov');
                if (o) {
                    /* Use cg-visible to match the cssUI definition */
                    o.classList.remove('cg-visible');
                    
                    /* Wait for the opacity transition before hiding the display */
                    setTimeout(() => {
                        o.style.display = 'none';
                        $.body.style.overflow = '';
                    }, 400);
                }
            } else {
                const i = gID('cg-inf');
                if (i) {
                    /* Set a flag in localStorage so it doesn't reappear after dismissal */
                    localStorage.setItem(C_N, JSON.stringify({ dismissed: true, date: new Date().toISOString() }));
                    i.remove();
                }
            }
        },
        policy: function() {
            gID('cg-m-v').style.display = 'none';
            gID('cg-leg').style.display = 'block';
        },
        show: function() {
            gID('cg-leg').style.display = 'none';
            gID('cg-op').style.display = 'none';
            const btn = gID('cg-conf');
            const { t } = LOC;
            btn.innerText = t.btnConfigure;
            gID('cg-m-v').style.display = 'block';
        },
        config: function() {
            const panel = gID('cg-op'), btn = gID('cg-conf');
            if (panel.style.display === 'block') { 
                this.action('save');
            } else {
                panel.style.display = 'block'; 
                btn.innerText = LOC.t.btnSave; 
            }
        },
        action: function(type) {
            this.save({
                analytics: type === 'all' || gID('cg-analytics').checked,
                marketing: type === 'all' || gID('cg-marketing').checked,
                date: new Date().toISOString()
            });
        },
        reject: function() {
            this.save({ 
                analytics: false, 
                marketing: false, 
                date: new Date().toISOString() 
            });
        },
        save: function(data) {
            const exp = new Date();
            // saves expiration in days cookie
            exp.setTime(exp.getTime() + (CONF.expiration * 24 * 60 * 60 * 1000)); 
            document.cookie = `${C_N}=${JSON.stringify(data)};expires=${exp.toUTCString()};path=/;SameSite=Lax`;
            this.close();
            setTimeout(() => location.reload(), 600);
        },
        /**
         * Replaces type="text/plain" scripts with type="text/javascript" to enable them.
         */
        exec: function(consent) {
            const p = (n) => {
                if (n.tagName === 'SCRIPT' && n.type === 'text/plain') {
                    const required = n.getAttribute('data-cg-category');
                    if (!required) return;
                    
                    const cats = required.split(' ');
                    if (!cats.every(c => consent[c])) return;
                    
                    const newScript = $.createElement('script');
                    newScript.async = false;
                    Array.from(n.attributes).forEach(attr => {
                        if (attr.name !== 'type' && attr.name !== 'data-cg-category') {
                            newScript.setAttribute(attr.name, attr.value);
                        }
                    });
                    newScript.type = 'text/javascript';
                    newScript.textContent = n.innerHTML;
                    n.parentNode?.replaceChild(newScript, n);
                }
            };
            
            $.querySelectorAll('script[type="text/plain"]').forEach(p);
            
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(n => {
                        if (n.nodeType === 1) {
                            if (n.tagName === 'SCRIPT') p(n);
                            n.querySelectorAll?.('script').forEach(p);
                        }
                    });
                });
            });
            
            observer.observe($.documentElement, {
                childList: true,
                subtree: true
            });
        }
    };
})();