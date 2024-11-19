// Import jest-dom matchers
import "@testing-library/jest-dom";

// Optional: Add custom Jest matchers (if needed in future tests)
// Example: jest.spyOn(console, 'error').mockImplementation(() => {});

// Optional: Mock certain global objects (like localStorage/sessionStorage)
global.localStorage = window.localStorage;
global.sessionStorage = window.sessionStorage;
