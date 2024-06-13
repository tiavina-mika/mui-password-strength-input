// import {describe, expect, test} from '@jest/globals';
import { getPasswordStrengthLabel } from '../PasswordStrengthInput';

describe('check valid url', () => {
  test('tooWeak label', () => {
    expect(getPasswordStrengthLabel('tooWeak')).toBe('Too weak');
  });

  test('weak label', () => {
    expect(getPasswordStrengthLabel('weak')).toBe('Weak');
  });

  test('medium label', () => {
    expect(getPasswordStrengthLabel('medium')).toBe('Okay');
  });

  test('strong label', () => {
    expect(getPasswordStrengthLabel('strong')).toBe('Strong');
  });
});
