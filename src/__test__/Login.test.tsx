import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import { render } from '../utils/test_utils';
import '@testing-library/jest-dom';

// mocking server
describe('Login test', () => {
  test('should render login page', () => {
    render(<Login />, '/login');
    expect(screen.getAllByText('Login')).toBeDefined();
    expect(screen.getAllByText('Email')).toBeDefined();
    expect(screen.getAllByText('Password')).toBeDefined();
    expect(screen.getAllByText('Register')).toBeDefined();
  });
  test('should render icon', () => {
    render(<Login />, '/login');
    const emailIcon = screen.getAllByTestId('EmailOutlinedIcon');
    expect(emailIcon).toBeDefined();
    const lockIcon = screen.getByTestId('LockOutlinedIcon');
    expect(lockIcon).toBeDefined();
  });
  test('should render input', () => {
    render(<Login />, '/login');
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeDefined();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeDefined();
  });
});
