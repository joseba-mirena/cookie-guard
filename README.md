
# Cookie Guard 🛡️

*GDPR/CCPA compliance Cookies Consent Management.*


* **Package:** Cookie Guard JS
* **Version:** v3.6.0
* **Copyright:** 2026 [`JosebaMirena.com`](https://www.josebamirena.com)
* **License:** [`MIT License`](./LICENSE)
* **Author:** Joseba Mirena ([@joseba-mirena](https://github.com/joseba-mirena))

![Version](https://img.shields.io/badge/version-3.6.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Size](https://img.shields.io/badge/size-12%90kB-lightgrey)
[![Live Demo](https://img.shields.io/badge/Live_Demo-View-ff2c6e)](https://www.josebamirena.com/freebies-tools-resources/cookie-guard-javascript)

A GDPR/CCPA 2026 compliance, simple and customizable Cookies Management system.


## 💡 The Truth About Cookie Consent

**Cookie consent compliance is NOT as complicated as some companies want you to believe.**

Many "compliance solutions" charge hundreds or thousands of euros per year, claiming you need:
- ❌ Complex backend databases to store consent
- ❌ IP tracking and user accounts
- ❌ Expensive legal teams
- ❌ Monthly subscription fees

**They are lying and fear-mongering to scare you into paying.**


### The Reality (Backed by GDPR/CCPA):

| What you DON'T need | What you ACTUALLY need |
|--------------------|----------------------|
| Backend database | Cookie stored in user's browser ✅ |
| IP address logging | Timestamp in the cookie ✅ |
| User accounts | Consent/Reject buttons ✅ |
| Monthly subscription | **Free tools like Cookie Guard** ✅ |
| Legal team on retainer | Clear privacy policy + contact info ✅ |


### Cookie Guard Does Everything Required:

- ✅ Blocks third-party scripts until consent
- ✅ Stores consent preferences (with timestamp)
- ✅ Provides granular controls (Analytics/Marketing)
- ✅ Offers easy opt-out (Reject All button)
- ✅ Works across 22 languages
- ✅ **Completely FREE and open source**


### Don't Be Scared. Be Informed.

Cookie consent compliance is about **respecting user privacy** - not about complex systems or expensive subscriptions.

**See the compliance table below for exactly what GDPR/CCPA requires.** 

---

> ⚠️ **Warning**: While cookie consent is manageable, **non-compliance CAN result in fines** (up to €20 million or 4% of global revenue). However, a proper implementation like Cookie Guard + a simple privacy policy is **perfectly sufficient** to be compliant.

**Don't let fear-mongering companies trick you. You've got this.** 💪

---

### MAIN FEATURES

* **Legal Compliance:** Fully GDPR/CCPA compliant workflow (2026 standards).
* **Hybrid Modes:** Supports both full third-party consent and "no-cookies" informational mode.
* **Smart Execution:** Auto-activates Analytics/Marketing scripts with AND logic support (handles `type="text/plain"`).
* **Zero Dependencies:** Pure Vanilla JavaScript; no jQuery or external libraries required.
* **Privacy Focus:** Optional persistent "Privacy" floating button to re-open settings.
* **Legal Terms:** Optional acceptance and Legal URL smart handling.
* **Global Reach:** Support for **22 languages** (LTR & RTL) with automatic browser detection.
    * *Locales:* `en, es, ca, eu, gl, et, ar, pt, pl, vi, fr, de, it, ru, zh, ja, id, ko, tr, nl, hi, bn`.
* **Performance:** Ultra-lightweight architecture (~13 kB minified).
* **Accessibility:** Implements ARIA standards for screen readers.
* **Encapsulation:** Built within an IIFE to ensure no global namespace pollution.
* **UI/UX:** Dynamic CSS/HTML injection with a fully responsive, mobile-first design.
* **Customization:** Flexible configuration for expiration, link colors, and button border-radius.
* **Developer API:** Public `toggle`, `open`, and `reset` methods for external control.

---


## 📦 Installation

Add the minified version before the closing `</body>` tag:

```html
<script 
    src="https://opensource.josebamirena.com/cookie-guard/3.6.0/dist/cookie-guard.min.js" 
    integrity="sha384-mr7+u4NyMYkt9msgfHVlkf0wNbBYGiLF4kpiPSQXL9DjbCSbrkIA0iOdcxm7606Z" 
    crossorigin="anonymous">
</script>
```


## ⚙️ Configuration

### Cookie Guard default Initialization

```html
<script>
    document.addEventListener('DOMContentLoaded', () => CookieGuard.init());
</script>
```

### Initialization default variables and values

| Property   | Type	      | Default	  | Description
| :--------- | :--------: | :-------: | :-----------
| locale	 | string	  | auto	  | 'auto' or 2-letter language ISO code.
| consent	 | boolean	  | true	  | true for 3rd party scripts, false for info-only banner.
| url      	 | string	  | null	  | Relative URL to your legal/cookies policy page.
| reopen	 | boolean	  | true	  | Renders the floating privacy button.
| radius	 | integer	  | 12	      | Buttons border-radius in pixels.
| delay	     | integer	  | 800	      | Modal entrance delay in milliseconds.
| link	     | string	  | #3b82f6 | Primary link color.
| hover	     | string	  | #10b981 | Link hover color.
| separator  | string     | •         | Modal footer links separator
| expiration | integer	  | 365	      | Consent cookie expiration in days.


```html
<script>
    const defaults = {
        locale: 'auto', // @string 'auto' or 2-letter ISO code.
        consent: true, // @bool true for 3rd party scripts, false for info-only banner.
        url: null, // @null|string Relative URL to your legal/cookies policy page.
        reopen: true, // @bool Renders the floating privacy button.
        radius: 12, // @int Buttons border-radius in pixels.
        delay: 800, // @int Modal entrance delay in milliseconds.
        link: "#3b82f6", // @string Primary link color.
        hover: "#10b981", // @string Link hover color.
        separator: "•", // @string Modal footer links separator
        expiration: 365, // @int Consent cookie expiration in days.
    };
</script>
```

### Cookie Guard Customized Example

```html
<script>
    document.addEventListener('DOMContentLoaded', () => 
        CookieGuard.init({
            locale: 'en', // fixed language
            url: "/legal", // legal relative url
            link: "#ff0000", // red links
            radius: 8, // buttons radius
        })
    );
</script>
```

### Cookie Guard non third party cookies mode

```html
<script>
    document.addEventListener('DOMContentLoaded', () => 
        CookieGuard.init({
            locale: 'auto', // auto detect language
            consent: false, // no third party cookies mode
        })
    );
</script>
```


## 🛠️ Script Implementation

To let Cookie Guard manage your scripts, add the type attribute text/plain and add the data-cg-category attribute (analytics|marketing):

### Test script example

```html
<script 
    type="text/plain" 
    data-cg-category="analytics">
    console.log('Analytics script executed');
</script>
```

### Analytics script example

```html
<script 
    type="text/plain" 
    data-cg-category="analytics" 
    src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y">
</script>
```

### Marketing script example

```html
<script type="text/plain" data-cg-category="marketing">
    console.log("Facebook pixel is legally enabled.");
    fbq('init', '123456789');
    fbq('track', 'PageView');
</script>
```


## 🕹️ Developer API

### Toggle Modal

```html
<a href="javascript:void(0)" onclick="CookieGuard.toggle()">Privacy</a>
```

### Force Open

```html
<a href="javascript:void(0)" onclick="CookieGuard.open()">Open Privacy</a>
```

### Hard Reset:

*Debug Shortcut*: CTRL + SHIFT + X to reset state instantly.

```html
<a href="javascript:void(0)" onclick="CookieGuard.reset()">Reset Privacy</a>
```


## 📋 Legal Compliance

Cookie Guard is fully compliant with both GDPR (EU) and CCPA/CPRA (California) requirements.

| Requirement | GDPR | CCPA | Cookie Guard |
|-------------|:----:|:----:|--------------|
| **Consent Model** | ✅ Opt-in | ✅ Opt-out | Reject All button + Privacy button |
| **Default State** | ✅ Blocked | ✅ No selling | Analytics/Marketing default to `false` |
| **Pre-ticked Boxes** | ✅ Forbidden | ✅ N/A* | All non-essential toggles start unchecked |
| **Essential Cookies** | ✅ No consent needed | ✅ No consent needed | Essential category locked & pre-checked |
| **Accept All Button** | ✅ Required | ✅ Recommended | One-click accept all categories |
| **Reject All Button** | ✅ Required | ✅ Recommended | One-click reject non-essential |
| **Granular Controls** | ✅ Required | ✅ Recommended | Separate toggles for Analytics & Marketing |
| **Persistent Access** | ✅ Required | ✅ Required | Floating privacy button for settings |
| **Consent Records** | ✅ Required | ✅ Recommended | Cookie stores preferences + timestamp |
| **Easy Withdrawal** | ✅ Required | ✅ Required | Reset method + reconfigure anytime |
| **Cookie Information** | ✅ Required | ✅ Recommended | Built-in modal explains each category |


### 🔒 Compliance Summary

- **GDPR**: Full opt-in consent for all non-essential cookies
- **CCPA/CPRA**: Easy opt-out mechanism + no data selling
- **Global**: Respects user privacy across 22 languages
- **Audit Ready**: Consent records stored with timestamps


### 📖 Required Website Documentation

For complete legal compliance, website owners must provide:

1. **Privacy Policy** - How you collect, use, and protect personal data
2. **Contact Information** - Clear way for users to exercise their rights

> 📌 **Note**: Cookie Guard includes built-in Cookie Policy with category descriptions. Only a separate Privacy Policy page (with contact information) is needed for personal data handling.

---

### ⚠️ Important Disclaimer for Website Owners

**Cookie Guard is a free, open-source tool that provides the technical framework for cookie consent management. It does NOT constitute legal advice.**

As a website owner using Cookie Guard, you are responsible for:

1. **Maintaining your own Privacy Policy** that accurately reflects your data handling practices
2. **Providing a contact method** (email, contact form, or page) for users to exercise their GDPR/CCPA rights
3. **Ensuring your legal terms** accurately describe your specific data collection and processing activities
4. **Complying with all applicable laws** in your jurisdiction

**Cookie Guard helps you implement consent management, but you must:**
- ✅ Inform users about YOUR specific data practices
- ✅ Provide YOUR contact information for privacy requests
- ✅ Maintain YOUR own privacy policy and legal terms

*This tool is provided "as is" without warranty of any kind. Consult a legal professional for advice on your specific compliance requirements.*

---

### 🚀 Ready to Use

Cookie Guard gives you the technical foundation. Add your privacy policy and contact information, and you're fully compliant!


### 🌍 Supported Languages (22)

| Code | Language | Direction |
|:----:|----------|:---------:|
| ar | 🇸🇦 Arabic | **RTL** |
| bn | 🇧🇩 Bengali | LTR |
| ca | 🏴󠁥󠁳󠁣󠁴󠁿 Catalan | LTR |
| de | 🇩🇪 German | LTR |
| en | 🇬🇧 English | LTR |
| es | 🇪🇸 Spanish | LTR |
| et | 🇪🇪 Estonian | LTR |
| eu | 🏴󠁥󠁳󠁰󠁶󠁿 Basque | LTR |
| fr | 🇫🇷 French | LTR |
| gl | 🏴󠁥󠁳󠁧󠁡󠁿 Galician | LTR |
| hi | 🇮🇳 Hindi | LTR |
| id | 🇮🇩 Indonesian | LTR |
| it | 🇮🇹 Italian | LTR |
| ja | 🇯🇵 Japanese | LTR |
| ko | 🇰🇷 Korean | LTR |
| nl | 🇳🇱 Dutch | LTR |
| pl | 🇵🇱 Polish | LTR |
| pt | 🇵🇹 Portuguese | LTR |
| ru | 🇷🇺 Russian | LTR |
| tr | 🇹🇷 Turkish | LTR |
| vi | 🇻🇳 Vietnamese | LTR |
| zh | 🇨🇳 Chinese | LTR |


## 📝 Changelog from 3.0.0

### v3.6.0 - AND Release

🕊️ Minified size 12.9 kB.

#### Added
- Added AND logic (handles multiple cookie categories)


### v3.4.0 - Performance Release

- Minified size 13 kB.

#### Added
- Added wording localStorage cache (eliminates redundant network requests)

#### Updated
- Wording files optimized
- Code weight optimization
- Updated main buttons accessibility
- Updated default consent to false
- Updated main documentation


### Previous Changes (v3.2.0)

#### Added
- Added `aria-label` to legal acceptance checkbox for better screen reader support

#### Fixed
- Fixed missing `aria-labelledby` attribute in minified version (modal dialog now properly labeled)
- Fixed "uncrawlable link" for policy link

---

### Previous Changes (v3.0.0)

- ✅ 2026 GDPR/CCPA compliance workflow.
- ✅ Added support for sites not using 3rd party cookies.
- ✅ i18n 22 languages, LTR & RTL, with dynamic JSON loading.
- ✅ Optimization: Minified size reduced from 38.8 kB to 12.8 kB.
- ✅ Added reset Cookies public method and Shortcut (CTRL+SHIFT+X).
- ✅ UX: Improved modal animations and RTL support.
- ✅ Performance improvements.
- ✅ Security improvements.
- ✅ Proprietary to MIT license.
- ⚠️ Version 2.0.0 deprecated.


## 🎯 Live Demo

Try Cookie Guard live on my website:  
👉 [Cookie Guard Demo](https://www.josebamirena.com/freebies-tools-resources/cookie-guard-javascript)

See how it handles consent, 22 languages, and third-party script blocking in action.
