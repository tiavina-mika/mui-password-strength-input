// import {describe, expect, test} from '@jest/globals';
import { getPasswordStrengthResult } from '../PasswordStrengthInput';

// ------------ default options ------------ //
describe('check default labels', () => {
  test('tooWeak label', () => {
    expect(getPasswordStrengthResult('tooWeak').label).toBe('Too weak');
  });

  test('weak label', () => {
    expect(getPasswordStrengthResult('weak').label).toBe('Weak');
  });

  test('medium label', () => {
    expect(getPasswordStrengthResult('medium').label).toBe('Okay');
  });

  test('strong label', () => {
    expect(getPasswordStrengthResult('strong').label).toBe('Strong');
  });
});

// ------------ custom options ------------ //
describe('check override labels', () => {
  test('custom label', () => {
    const option = getPasswordStrengthResult('tooWeak', { tooWeak: { label: 'Too weak 2' } });
    expect(option.label).toBe('Too weak 2');
  });

  test('custom color', () => {
    const option = getPasswordStrengthResult('medium', { medium: { color: 'red' } });
    expect(option.color).toBe('red');
  });

  test('custom color and label', () => {
    const option = getPasswordStrengthResult('strong', { strong: { color: 'red', label: 'Strong 2' } });
    expect(option.label).toBe('Strong 2');
    expect(option.color).toBe('red');
  });
});
