/**
 * TXI HTML Linting Configuration
 * Based on the TXI HTML Style Guide
 *
 * This configuration enforces the HTML coding standards defined in
 * docs/standards/style-guides/HTML_STYLE_GUIDE.md
 */

module.exports = {
  /*
   * ========================================
   * Tag and Attribute Rules
   * ========================================
   */

  /* Tags must be lowercase */
  'tagname-lowercase': true,

  /* Attributes must be lowercase */
  'attr-lowercase': true,

  /* Attribute values must use double quotes */
  'attr-value-double-quotes': true,

  /* Attributes should have values (except boolean attributes) */
  'attr-value-not-empty': false,

  /* No duplicate attributes */
  'attr-no-duplication': true,

  /* No unnecessary whitespace in attributes */
  'attr-no-unnecessary-whitespace': true,

  /* Attributes should not contain unsafe characters */
  'attr-unsafe-chars': true,

  /* Boolean attributes should not have values */
  'bool-attribute-value': true,

  /*
   * ========================================
   * Document Structure
   * ========================================
   */

  /* DOCTYPE must be first */
  'doctype-first': true,

  /* DOCTYPE must be HTML5 */
  'doctype-html5': true,

  /* DOCTYPE must have proper format */
  'doctype-ltgt': true,

  /* Tags must be properly paired */
  'tag-pair': true,

  /* Tags should be self-closed when empty */
  'tag-self-close': false,

  /*
   * ========================================
   * Content Requirements
   * ========================================
   */

  /* Page must have title */
  'title-require': true,

  /* Images must have alt text */
  'alt-require': true,
  'img-alt-require': true,

  /* IDs must be unique */
  'id-unique': true,

  /* src attributes must not be empty */
  'src-not-empty': true,

  /* Special characters must be escaped */
  'spec-char-escape': true,

  /*
   * ========================================
   * Code Style
   * ========================================
   */

  /* ID and class naming style - dash-case */
  'id-class-value': 'dash',

  /* No mixed spaces and tabs (use spaces) */
  'space-tab-mixed-disabled': 'space',

  /*
   * ========================================
   * Best Practices
   * ========================================
   */

  /* Scripts should not be in head (except with defer/async) */
  'head-script-disabled': true,

  /* Inputs should have associated labels */
  'input-requires-label': true,

  /* Check for valid tags */
  'tags-check': true,

  /* Consistent whitespace in attributes */
  'attr-whitespace': true,

  /*
   * ========================================
   * Optional Rules (can be stricter)
   * ========================================
   */

  /* Inline styles are allowed but discouraged */
  'style-disabled': false,
  'inline-style-disabled': false,

  /* Inline scripts are allowed but discouraged */
  'inline-script-disabled': false,

  /* ID/class names should not be ad-related */
  'id-class-ad-disabled': false,

  /* href can be absolute or relative */
  'href-abs-or-rel': false,

  /* Attributes don't need to be sorted */
  'attr-sorted': false,

  /*
   * ========================================
   * Custom Rules for TXI Standards
   * ========================================
   */

  /*
   * Aspirational custom rules (not supported by HTMLHint natively):
   *
   * prefer-semantic-elements:
   *   Use <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>
   *   instead of generic <div> elements with class names.
   *
   * accessibility:
   *   - html element must have lang attribute
   *   - All form inputs must have associated labels
   *   - Headings must be in hierarchical order
   *   - Use ARIA landmark roles appropriately
   *
   * required-meta:
   *   - <meta charset="utf-8"> required
   *   - <meta name="viewport"> required for responsive design
   *   - <meta name="description"> recommended for SEO
   */
};
