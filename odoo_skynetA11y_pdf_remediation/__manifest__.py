# Part of Skynet Technologies. See LICENSE file for full copyright and licensing details.
{
    'name': 'SkynetA11y PDF Remediation',
    'summary': 'Upload, scan and AI-remediate PDFs for accessibility (WCAG/PDF-UA) compliance',
    'description': """
SkynetA11y PDF Remediation
==========================
PDF accessibility checker and AI remediation tool inside Odoo: upload PDFs or
crawl your website for them, remediate in bulk, review every check and download
conformant files. Supports WCAG 2.x, PDF/UA, ADA, Section 508, AODA and
EN 301 549.

Data-only module: installs from Apps > Import Module (zip) or from a folder in
addons_path.
    """,
    'version': '1.0.0',
    'category': 'Productivity',
    'author': 'Skynet Technologies USA LLC',
    'website': 'https://www.skynettechnologies.com',
    'support': 'hello@skynettechnologies.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'security/security.xml',
        'data/ir_config_parameter_data.xml',
        'views/pdf_remediation_menus.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'odoo_skyneta11y_pdf_remediation/static/src/client/dashboard_action.js',
        ],
    },
    'images': ['static/description/banner.jpg'],
    'installable': True,
    'application': True,
    'auto_install': False,
}
