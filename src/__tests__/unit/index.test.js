import { describe, it, expect } from 'vitest';
import styleGuide from '../../index.js';

describe('Main Style Guide Exports', () => {
  describe('getConfig functionality', () => {
    it('should return typescript config for typescript', () => {
      const config = styleGuide.getConfig('typescript');
      expect(config).toBe(styleGuide.typescript);
    });

    it('should return typescript config for ts alias', () => {
      const config = styleGuide.getConfig('ts');
      expect(config).toBe(styleGuide.typescript);
    });

    it('should return javascript config for javascript', () => {
      const config = styleGuide.getConfig('javascript');
      expect(config).toBe(styleGuide.javascript);
    });

    it('should return javascript config for js alias', () => {
      const config = styleGuide.getConfig('js');
      expect(config).toBe(styleGuide.javascript);
    });

    it('should return css config for css', () => {
      const config = styleGuide.getConfig('css');
      expect(config).toBe(styleGuide.css);
    });

    it('should return css config for scss', () => {
      const config = styleGuide.getConfig('scss');
      expect(config).toBe(styleGuide.css);
    });

    it('should return css config for sass', () => {
      const config = styleGuide.getConfig('sass');
      expect(config).toBe(styleGuide.css);
    });

    it('should return react config for react', () => {
      const config = styleGuide.getConfig('react');
      expect(config).toBe(styleGuide.react);
    });

    it('should return react config for jsx', () => {
      const config = styleGuide.getConfig('jsx');
      expect(config).toBe(styleGuide.react);
    });

    it('should return react config for tsx', () => {
      const config = styleGuide.getConfig('tsx');
      expect(config).toBe(styleGuide.react);
    });

    it('should return angular config for angular', () => {
      const config = styleGuide.getConfig('angular');
      expect(config).toBe(styleGuide.angular);
    });

    it('should return markdown config for markdown', () => {
      const config = styleGuide.getConfig('markdown');
      expect(config).toBe(styleGuide.markdown);
    });

    it('should return markdown config for md alias', () => {
      const config = styleGuide.getConfig('md');
      expect(config).toBe(styleGuide.markdown);
    });

    it('should return json config for json', () => {
      const config = styleGuide.getConfig('json');
      expect(config).toBe(styleGuide.json);
    });

    it('should return json config for jsonc', () => {
      const config = styleGuide.getConfig('jsonc');
      expect(config).toBe(styleGuide.json);
    });

    it('should return json config for json5', () => {
      const config = styleGuide.getConfig('json5');
      expect(config).toBe(styleGuide.json);
    });

    it('should return html config for html', () => {
      const config = styleGuide.getConfig('html');
      expect(config).toBe(styleGuide.html);
    });

    it('should return terraform config for terraform', () => {
      const config = styleGuide.getConfig('terraform');
      expect(config).toBe(styleGuide.terraform);
    });

    it('should return terraform config for tf alias', () => {
      const config = styleGuide.getConfig('tf');
      expect(config).toBe(styleGuide.terraform);
    });

    it('should return terraform config for hcl alias', () => {
      const config = styleGuide.getConfig('hcl');
      expect(config).toBe(styleGuide.terraform);
    });

    it('should throw error for unsupported language', () => {
      expect(() => styleGuide.getConfig('unsupported')).toThrowError(
        /Unsupported language: unsupported/
      );
    });

    it('should throw error for unknown language', () => {
      expect(() => styleGuide.getConfig('python')).toThrowError(/Unsupported language: python/);
    });
  });
});
