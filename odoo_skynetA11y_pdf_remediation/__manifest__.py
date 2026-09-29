# -*- coding: utf-8 -*-
{
    'name': 'SkynetA11y PDF Remediation',
    'summary': 'Upload, scan and AI-remediate PDFs for accessibility (WCAG/PDF-UA) compliance',
    'description': "",
    'version': '1.0.0',
    'category': 'Productivity',
    'author': 'Skynet Technologies USA LLC',
    'website': 'https://www.skynettechnologies.com',
    'support': 'hello@skynettechnologies.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web', 'website'],
    'data': [
        'data/ir_config_parameter_data.xml',
        'website/dashboard_page.xml',
        'views/odoo_skynetA11y_pdf_remediation_menu.xml',
    ],
    'images': ['static/description/banner.jpg'],
    'installable': True,
    'application': True,
    'auto_install': False,
}
