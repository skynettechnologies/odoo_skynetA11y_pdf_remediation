/** @odoo-module **/
/*
 * Client action that hosts the SkynetA11y PDF Remediation dashboard.
 *
 * Why an iframe fed through `srcdoc`: Odoo serves files of imported (zip)
 * modules as attachments, and every attachment response carries
 * `Content-Security-Policy: default-src 'none'`, so a static HTML page opened
 * on its own cannot load its own CSS, scripts or images. A document created
 * from `srcdoc` takes the CSP of this (Odoo) page instead, so the dashboard
 * loads normally, and the iframe also keeps its CSS/JS fully separate from
 * the Odoo backend.
 */
import { Component, onMounted, useProps, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

const MODULE = "odoo_skyneta11y_pdf_remediation";
const SERVER_ACTION = `${MODULE}.action_pdf_remediation_dashboard`;
const PAGE_URL = `/${MODULE}/static/dashboard.html?v=20.0.1.0.1`;

/** Makes a value safe to place inside an inline <script> block. */
function scriptSafeJson(value) {
    return JSON.stringify(value)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}

class PdfRemediationDashboard extends Component {
    static template = xml`
        <div class="o_action o_skyneta11y_pdf_remediation h-100">
            <iframe class="o_skyneta11y_frame w-100 h-100 border-0" title="SkynetA11y PDF Remediation"/>
        </div>`;

    // Owl 3: no static `props`. Calling useProps() without a schema accepts
    // whatever the action service passes (action, className, ...).
    props = useProps();

    setup() {
        this.actionService = useService("action");
        onMounted(() => this.load());
    }

    async load() {
        const params = (this.props.action && this.props.action.params) || {};
        if (!params.config) {
            // Opened without the settings (page reload, bookmarked URL, back button):
            // run the menu's server action again, which supplies them together with
            // the logged-in user's name and email.
            return this.actionService.doAction(SERVER_ACTION, { clearBreadcrumbs: true });
        }
        // The iframe's own location is about:srcdoc, so give it the Odoo site's host.
        const config = { ...params.config, hostDomain: window.location.hostname };
        const response = await fetch(PAGE_URL, { credentials: "same-origin" });
        if (!response.ok) {
            throw new Error(`Could not load the SkynetA11y PDF Remediation page (HTTP ${response.status}).`);
        }
        let html = await response.text();
        // Hand the settings over before config.js runs.
        const inject = `<script>window.SKYNETA11Y_CONFIG = ${scriptSafeJson(config)};</script>`;
        html = html.replace("</head>", `${inject}</head>`);
        // Owl 3 dropped useRef/t-ref in this form; one dashboard is open at a time,
        // so a unique class is enough to find the iframe.
        const frame = document.querySelector("iframe.o_skyneta11y_frame");
        if (frame) {
            frame.srcdoc = html;
        }
    }
}

registry.category("actions").add("skyneta11y_pdf_remediation_dashboard", PdfRemediationDashboard);
