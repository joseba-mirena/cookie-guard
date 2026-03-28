
# Cookie Guard 🛡️

*GDPR/CCPA compliance Cookies Consent Management.*


* **Package:** Cookie Guard JS\
* **Version:** v3.0.0\
* **Copyright:** 2026 [`JosebaMirena.com`](https://www.josebamirena.com)\
* **License:** [`MIT License`](./LICENSE)\
* **Author:** Joseba Mirena ([@joseba-mirena](https://github.com/joseba-mirena))

![Version](https://img.shields.io/badge/version-3.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Size](https://img.shields.io/badge/size-12.8%20kB-lightgrey)
[![Live Demo](https://img.shields.io/badge/Live_Demo-View-ff2c6e)](https://www.josebamirena.com/freebies-tools-resources/cookie-guard-javascript)

A GDPR/CCPA 2026 compliance, simple and customizable Cookies Management system.

---

### MAIN FEATURES

* **Legal Compliance:** Fully GDPR/CCPA compliant workflow (2026 standards).
* **Hybrid Modes:** Supports both full third-party consent and "no-cookies" informational mode.
* **Smart Execution:** Auto-activates Analytics/Marketing scripts (handles `type="text/plain"`).
* **Zero Dependencies:** Pure Vanilla JavaScript; no jQuery or external libraries required.
* **Privacy Focus:** Optional persistent "Privacy" floating button to re-open settings.
* **Legal Terms:** Optional acceptance and Legal URL smart handling.
* **Global Reach:** Support for **22 languages** (LTR & RTL) with automatic browser detection.
    * *Locales:* `en, es, ca, eu, gl, et, ar, pt, pl, vi, fr, de, it, ru, zh, ja, id, ko, tr, nl, hi, bn`.
* **Performance:** Ultra-lightweight architecture (~12.8 kB minified).
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
    src="https://opensource.josebamirena.com/cookie-guard/3.0.0/dist/cookie-guard.min.js" 
    integrity="sha384-4TomZ6aXKNjC0fGi+v+GQTBp9kmS006nQ3SriGo6U0a93lhADVwmw8toL8JQW4vB" 
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
            radius: 8, // buttoms radius
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


## 📝 Changelog from 2.0.0

> * ✅ 2026 GDPR/CCPA compliance workflow.
> * ✅ Added support for sites not using 3rd party cookies.
> * ✅ i18n 22 languages, LTR & RTL, with dynamic JSON loading.
> * ✅ Optimization: Minified size reduced from 38.8 kB to 12.8 kB.
> * ✅ Added reset Cookies public method and Shortcut (CTRL+SHIFT+X).
> * ✅ UX: Improved modal animations and RTL support.
> * ✅ Performance improvements.
> * ✅ Security improvements.
> * ✅ Proprietary to MIT license.
> * ⚠️ Version 2.0.0 deprecated.


## 🎯 Live Demo

Try Cookie Guard live on my website:  
👉 [Cookie Guard Demo](https://www.josebamirena.com/freebies-tools-resources/cookie-guard-javascript)

See how it handles consent, 22 languages, and third-party script blocking in action.
