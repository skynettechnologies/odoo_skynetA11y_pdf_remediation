# SkynetA11y PDF Remediation

The **SkynetA11y PDF Remediation Application** brings **PDF Accessibility Remediation for WCAG & PDF/UA Compliance** directly into your own Odoo instance. It is both a **PDF Accessibility Checker** and an **AI Remediation Tool**: upload documents or crawl your website for them, let AI repair the accessibility barriers automatically, review every check that was applied, and download conformant files — without leaving your own Odoo backend.

It fixes the barriers that make PDFs unusable with assistive technology: missing tags, incorrect reading order, inaccessible forms and tables, images without alternate text, and absent document structure, language and metadata.

It supports compliance with **WCAG 2.0, 2.1, 2.2, PDF/UA, ADA, Section 508, AODA, and EN 301 549 (EAA)**. With plain-language explanations and before/after examples for every check, even non-technical users can understand what was fixed and why it mattered.

This is a standard **Odoo 20.0 module** (`odoo_skyneta11y_pdf_remediation`, v20.0.1.0.0) with no extra bundler or build step, so it drops into any Odoo 20 instance alongside your other apps.

This application is designed for:

- Businesses of all sizes
- Enterprises
- Government and public sector entities
- Website owners
- E-commerce platforms
- Development and maintenance agencies

[**Start with a free AI remediation trial — up to 5 pages!**](https://www.skynettechnologies.com/pdf-accessibility-remediation)

---

## Why SkynetA11y PDF Remediation?

PDFs are where accessibility compliance quietly fails. A site can pass every page-level audit and still publish hundreds of untagged documents — reports, forms, invoices, policies — that screen readers cannot navigate at all.

Remediating them by hand is slow and expensive. This application makes it a routine part of publishing: documents are discovered, repaired and re-checked inside the tools your team already uses, so accessible PDFs become the default rather than a project.

## Key Features

- **AI PDF Remediation** – Automated repair of tags, reading order, alt text, headings, tables and metadata.
- **PDF Accessibility Checker** – Every check reported individually, expandable to a plain-language explanation and a before/after example.
- **Upload or Crawl** – Add files by drag and drop, or sweep your website for every PDF it links to.
- **Free Trial** – The free plan covers your first 5 pages; paid plans scale from 50 to 10,000 pages.
- **Bulk Remediation** – Select any number of documents and process them in one run, with live progress.
- **Deep Tag Scan** – Post-remediation verification against the document's tag tree, not just its declared metadata.
- **Authenticated Downloads** – Remediated files are delivered over an authenticated session, never a public link.
- **No Settings Screen Required** – Nothing to paste and nothing to wire up out of the box. One short dialog asks for a name, email and domain the first time it is needed, and never again — or an admin can pin these in **AI PDF Remediation Settings** ahead of time.
- **Integration with All in One Accessibility® Dashboard** – Plans, usage and billing stay in one place.

## Compliance Standards Supported

- WCAG 2.0, 2.1, 2.2
- PDF/UA (ISO 14289)
- ADA
- Section 508
- AODA
- EN 301 549 (EU / European Accessibility Act)

## Installation

1. Copy the `odoo_skyneta11y_pdf_remediation` folder into a directory listed in `addons_path` (in `odoo.conf`).
2. Restart Odoo.
3. Enable **Developer Mode**, open **Apps**, choose **Update Apps List**, search for **SkynetA11y PDF Remediation** and click **Install**.

Open the **SkynetA11y PDF Remediation** app from the main menu, or go to **the **Dashboard** menu**. No further setup is required.

Requires Odoo 20.0 and the Python `requests` package. The earlier "Import Module" zip-upload route is no longer needed.

## Configuration

**SkynetA11y PDF Remediation → Configuration** (Settings/Administration users) edits the module's system parameters: service URL, provisioning API key, pinned account (name / email / website), plan, country, dashboard and upgrade URLs, scan domain, opening tab and token storage key. Leave the account fields blank to let the dashboard ask on first use; fill in **both** email and website to pin the account and skip the dialog.

## Security

- The dashboard requires login and membership of the **SkynetA11y PDF Remediation / User** group (implied by Settings/Administration).
- The **provisioning API key never reaches the browser.** The page posts the account details (with a CSRF token) to `/pdf-remediation/session`; the Odoo server adds the key, calls the remediation service and returns only the session token.
- Remediation requests (uploads, jobs, downloads) go from the browser to the remediation service with that token, which is why the CORS settings below still apply.

## Module Structure

```
odoo_skyneta11y_pdf_remediation/
├── __manifest__.py
├── controllers/main.py        # dashboard page + server-side session endpoint
├── models/res_config_settings.py
├── security/security.xml      # group + privilege
├── data/ir_config_parameter_data.xml
├── views/                     # dashboard template, settings view, menus
├── static/src/{css,js,img}    # standalone workspace (own asset bundle)
├── static/description/        # icon, banner, Apps page
├── i18n/*.pot
└── tests/
```

## How It Works

1. **Add Your PDFs** – Upload files, or crawl your website for every PDF it links to.
2. **Run AI Remediation** – Select documents and process them in bulk; progress is reported live.
3. **Review & Download** – Inspect each accessibility check with its explanation and before/after example, then download the conformant file.

## Who Can Benefit?

- Website Owners & Businesses
- Developers & Web Agencies
- Government & Public Sector Organizations
- Education, Healthcare & Financial Institutions
- Legal & Compliance Teams
- Publishers & Content Teams
- E-commerce & SaaS Platforms

---

## CORS Policy Configuration

To avoid CORS policy issues, ensure the following URLs are allowed in your website. These URLs should be added to your CORS configuration or trusted domains list.

| **Domain** | **Description** | **Usage** |
|---|---|---|
| `https://livepdfapi.skynettechnologies.us` | AI PDF Remediation API | Documents, remediation jobs, downloads |
| `https://ada.skynettechnologies.us` | All in One Accessibility® Dashboard | Plan upgrades via autologin |

### Instructions

1. Update your server's CORS configuration to include these URLs.
2. Ensure wildcard subdomains (`*`) are supported where necessary.
3. Verify the application functionality by testing requests to these domains.
4. If issues persist, consult the documentation for CORS configuration guidance.

If your site sends a `Content-Security-Policy`, both origins also need to be in
its `connect-src`, or the browser will block the requests before they are made.

---

## Screenshots

![AI_PDF_Accessibility_Remediation_Image_1](https://www.skynettechnologies.com/sites/default/files/AiPdfAccessibilityRemediation/AI_PDF_Accessibility_Remediation_Image_1.png)
![AI_PDF_Accessibility_Remediation_Image_2](https://www.skynettechnologies.com/sites/default/files/AiPdfAccessibilityRemediation/AI_PDF_Accessibility_Remediation_Image_2.png)
![AI_PDF_Accessibility_Remediation_Image_3](https://www.skynettechnologies.com/sites/default/files/AiPdfAccessibilityRemediation/AI_PDF_Accessibility_Remediation_Image_3.png)

---

## Submit a Support Request

Please visit our **[support page](https://www.skynettechnologies.com/report-accessibility-problem)**
and fill out the form. Our team will get back to you as soon as possible.

## Send Us an Email

Alternatively, you can send an email to our support team:
**[hello@skynettechnologies.com](mailto:hello@skynettechnologies.com)**

## Accessibility Partnership Opportunities

### **[Accessibility Agency Partnership](https://www.skynettechnologies.com/agency-partners)**

Partner with us as an agency to provide comprehensive accessibility solutions to your existing clients. Get access to exclusive resources, training, and support to help you implement and manage accessibility features effectively.

### **[Accessibility Affiliate Partnership](https://www.skynettechnologies.com/affiliate-partner)**

Join our affiliate program and earn hefty commissions by promoting SkynetA11y PDF Remediation. Share our accessibility solution within your network and help businesses improve their document accessibility while generating additional revenue.

For more details, please visit **[Accessibility Partnership Opportunities Page](https://www.skynettechnologies.com/partner-program)**.

---

## Credits

This **SkynetA11y PDF Remediation Application** (Odoo module v20.0.1.0.0, for Odoo 20.0) is developed and maintained by **[Skynet Technologies USA LLC](https://www.skynettechnologies.com)**.

## Install options (data-only module)

This module contains no Python code, so both of these work:

- **Apps > Import Module**: upload the zip (developer mode, administrator).
- **Extract**: put the `odoo_skyneta11y_pdf_remediation` folder in `addons_path`, restart, Update Apps List, Install.

The dashboard opens inside Odoo from the **SkynetA11y PDF Remediation > Dashboard** menu (a client action that hosts the page in an iframe, because Odoo serves files of imported modules with a CSP that blocks a standalone static page). Settings are the module's
system parameters under **SkynetA11y PDF Remediation > Configuration**. In this build the browser calls the
provisioning endpoint itself, so the provisioning API key is passed to the page (it is not hidden
from users who can open the dashboard).
