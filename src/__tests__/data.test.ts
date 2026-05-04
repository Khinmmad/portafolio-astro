import { describe, it, expect } from 'vitest';
import { skills } from '../data/skills';
import { highlights } from '../data/highlights';

describe('data files', () => {
  it('skills have required fields', () => {
    expect(skills.length).toBeGreaterThan(0);
    skills.forEach((s) => {
      expect(s.name).toBeTruthy();
      expect(s.level).toBeGreaterThan(0);
      expect(s.level).toBeLessThanOrEqual(100);
      expect(s.color).toBeTruthy();
    });
  });

  it('highlights have required fields', () => {
    expect(highlights.length).toBeGreaterThan(0);
    highlights.forEach((h) => {
      expect(h.label).toBeTruthy();
      expect(h.value).toBeTruthy();
      expect(h.icon).toBeDefined();
    });
  });

  it('navigation links are valid', async () => {
    const { navigation } = await import('../data/navigation');
    expect(navigation.length).toBeGreaterThan(0);
    navigation.forEach((l) => {
      expect(l.href).toBeTruthy();
      expect(l.label).toBeTruthy();
    });
  });

  it('roles are non-empty', async () => {
    const { roles } = await import('../data/roles');
    expect(roles.length).toBeGreaterThan(0);
    roles.forEach((r) => expect(r).toBeTruthy());
  });

  it('socials have required fields', async () => {
    const { socials } = await import('../data/socials');
    expect(socials.length).toBeGreaterThan(0);
    socials.forEach((s) => {
      expect(s.href).toMatch(/^https?:\/\//);
      expect(s.label).toBeTruthy();
    });
  });
});
