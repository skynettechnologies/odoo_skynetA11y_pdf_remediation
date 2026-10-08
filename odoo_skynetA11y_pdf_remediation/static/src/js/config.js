/** @odoo-module ignore */
/*
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  SkynetA11y PDF Remediation — configuration                        │
 * │                                                                          │
 * │  Defaults only. In Odoo these are overridden at render time from        │
 * │  Settings > SkynetA11y PDF Remediation (see controllers/main.py).        │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * An empty string means "derive it" — the comment on each field says from what.
 * Nothing here has to be filled in for the module to work.
 *
 * A host application (a CMS plugin, a PHP or Node template) can also inject
 * these values instead of editing this file: set `window.SKYNETA11Y_CONFIG` to an
 * object with any of the same keys, before OR after this script loads, and the
 * values are merged over the defaults below on boot.
 */
(function (global) {
  'use strict';

  var defaults = {
    /** Origin of the SkynetA11y PDF Remediation backend. */
    apiBaseUrl: 'https://livepdfapi.skynettechnologies.us',

    /* ---- The account -------------------------------------------------
     *
     * By default the module asks. Somebody opens it, fills in a name, email and
     * domain at the moment of the first upload or website scan, and that is what
     * the remediation account is registered under — nothing is sent to the
     * service before they submit.
     *
     * Setting BOTH `accountEmail` and `website` below pins the account for the
     * whole install: the dialog is skipped and the page connects on load.
     * Setting only one leaves the dialog in place with that field pre-filled.
     * ------------------------------------------------------------------ */

    /** Name the account is registered under. Pre-fills the dialog. */
    accountName: '',

    /** Address the account is provisioned under. Pre-fills the dialog. */
    accountEmail: '',

    /** Site the account is registered against. Pre-fills the dialog. */
    website: '',

    /**
     * Suggestions for the dialog only (the signed-in Odoo user's own details).
     * Unlike accountName / accountEmail these never pin the account.
     */
    prefillName: '',
    prefillEmail: '',

    /**
     * Host of the Odoo site the user is on (injected by the dashboard action).
     * Suggested as the dialog's website domain; it never pins the account.
     */
    hostDomain: '',

    /**
     * Domain the Website Scan tab crawls.
     *
     * Empty (the default) uses the connected account's domain, falling back to
     * the account's first registered domain when the service does not recognise
     * it.
     */
    activeDomain: '',

    /** Dashboard the coverage modal's upgrade button links to. */
    dashboardUrl: 'https://ada.skynettechnologies.us',

    /** Autologin link for that button. Empty derives it from the website. */
    upgradeUrl: '',

    /**
     * Odoo endpoint that provisions the session server-side. The provisioning
     * API key lives in ir.config_parameter and is used only by that controller
     * - it is never sent to the browser. Injected by the dashboard template.
     */
    sessionUrl: '',

    /** Odoo CSRF token sent with the POST above (only used when sessionUrl is set). */
    csrfToken: '',

    /**
     * Data-only build (no Odoo controller): the browser calls the service's
     * provisioning endpoint itself with this key. It comes from System
     * Parameters and is handed over by the menu's server action.
     */
    provisionApiKey: '',

    /** Same-origin path the "Back to Odoo" button opens (set by the dashboard action). */
    backUrl: '',

    /** Plan new accounts are provisioned on. */
    planId: 'free',

    /** Two-letter country code recorded on the account. */
    country: 'US',

    /**
     * Fingerprint of the account this page signs in as. Empty derives it from
     * the website and account email, which is what scopes the cached session
     * token to the account it belongs to.
     */
    accountKey: '',

    /**
     * Tab to open on load: 'upload', 'scan' or 'remediated'.
     *
     * Empty (the default) opens Upload, and lets `?tab=` in the URL pick one, so
     * a link straight to a tab keeps working. Setting it pins the tab and
     * ignores the query string.
     */
    initialTab: '',

    /** localStorage key the session token lives under. */
    tokenKey: 'skyneta11y_token'
  };

  var CONFIG = {};

  Object.keys(defaults).forEach(function (key) {
    CONFIG[key] = defaults[key];
  });

  /**
   * Merges host-supplied settings over the defaults. Anything not supplied keeps
   * its default.
   *
   * Called both at load and again from app.js on boot, because a host may put
   * these files in <head> while its own inline `SKYNETA11Y_CONFIG` script sits in
   * the body — so at load time there may be nothing to read yet.
   */
  function configure(next) {
    if (!next) return CONFIG;

    Object.keys(next).forEach(function (key) {
      if (next[key] !== undefined && next[key] !== null) CONFIG[key] = next[key];
    });

    return CONFIG;
  }

  /**
   * Settings handed over by the Odoo menu's server action.
   *
   * The server action opens this page with the (non-session) settings base64url
   * encoded in the URL fragment as `key=value` lines. They are moved to
   * sessionStorage and the fragment is cleared, so a reload keeps working but the
   * address bar and history do not keep them.
   */
  var HANDOVER_KEY = 'skyneta11y_odoo_handover';
  var KEY_MAP = {
    api_base_url: 'apiBaseUrl',
    provision_api_key: 'provisionApiKey',
    account_name: 'accountName',
    account_email: 'accountEmail',
    website: 'website',
    plan_id: 'planId',
    country: 'country',
    dashboard_url: 'dashboardUrl',
    upgrade_url: 'upgradeUrl',
    active_domain: 'activeDomain',
    initial_tab: 'initialTab',
    token_key: 'tokenKey',
    prefill_name: 'prefillName',
    prefill_email: 'prefillEmail',
    account_key: 'accountKey'
  };

  function decodeHandover(raw) {
    var b64 = String(raw || '').replace(/^#/, '').replace(/-/g, '+').replace(/_/g, '/');

    while (b64.length % 4) b64 += '=';

    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);

    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);

    return new TextDecoder('utf-8').decode(bytes);
  }

  function readHandover() {
    var text = '';

    try {
      if (global.location.hash.length > 1) {
        text = decodeHandover(global.location.hash);
        sessionStorage.setItem(HANDOVER_KEY, text);
        global.history.replaceState(null, '', global.location.pathname + global.location.search);
      } else {
        text = sessionStorage.getItem(HANDOVER_KEY) || '';
      }
    } catch (e) {
      /* malformed fragment or storage unavailable: fall back to defaults */
    }

    var out = {};

    text.split('\n').forEach(function (line) {
      var at = line.indexOf('=');
      var name = at > 0 ? KEY_MAP[line.slice(0, at)] : null;
      var value = at > 0 ? line.slice(at + 1) : '';

      /* A blank setting means "use the default", so it is not applied. */
      if (name && value) out[name] = value;
    });

    return out;
  }

  configure(readHandover());
  configure(global.SKYNETA11Y_CONFIG);

  global.PdfConfig = {
    get: function () {
      return CONFIG;
    },
    configure: configure
  };
})(window);
