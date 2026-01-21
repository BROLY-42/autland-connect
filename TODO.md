# TODO: Codebase Review and Improvements

## Security Fixes

- [x] Fix security vulnerabilities in dependencies (npm audit fix)
- [x] Implement proper password hashing using Web Crypto API (PBKDF2) in crypto.ts
- [x] Remove hardcoded default password from auth.ts
- [x] Improve authentication security (add expiration, use sessionStorage)
- [x] Update Admin.tsx to handle async auth functions
- [x] Run linting and fix issues

## Code Quality

- [x] Run linting and fix issues
- [x] Optimize React components for performance (memoization, avoid re-renders)

## Testing

- [x] Add basic security tests for auth and hashing functions

## Followup

- [x] Test application functionality
- [x] Verify build works
- [x] Document security practices
