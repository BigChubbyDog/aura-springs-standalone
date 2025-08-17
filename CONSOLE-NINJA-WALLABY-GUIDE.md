# 🥷 Console Ninja & Wallaby Configuration Guide

## ✅ Configuration Complete!

Both **Console Ninja** and **Wallaby** are now configured for your Aura Spring Cleaning project.

---

## 🥷 Console Ninja - Inline Console Logging

### What It Does
- Shows `console.log` output directly in your code editor
- No need to switch to browser DevTools
- Real-time values appear next to your code
- Performance metrics inline

### How to Use

1. **Start Console Ninja in VS Code:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Console Ninja: Start"
   - Select the command

2. **Add Debug Logs:**
```javascript
// These will appear inline in VS Code
console.log('Booking for Valerie:', bookingData);  // Shows object inline
console.time('API Call');  // Starts timer
// ... your code ...
console.timeEnd('API Call');  // Shows execution time

console.log({
  customer: name,
  phone: '(512) 781-0527',  // Valerie's number
  status: 'pending'
});  // Full object appears inline
```

3. **See Values While Coding:**
   - Hover over variables to see current values
   - Log outputs appear right next to the code
   - Errors show in red, warnings in yellow

### Configuration File
- `.console-ninja.json` - All settings configured
- Auto-starts when you open the project
- Shows timestamps for each log

---

## 🧪 Wallaby - Real-Time Test Runner

### What It Does
- Runs tests as you type
- Shows test results inline
- Coverage indicators in the gutter
- Instant feedback on test failures

### How to Use

1. **Start Wallaby in VS Code:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Wallaby.js: Start"
   - Select your project configuration

2. **See Test Results Inline:**
   - ✅ Green squares = passing tests
   - ❌ Red squares = failing tests
   - 🟡 Yellow = partially covered
   - Gray = not covered by tests

3. **Write Tests:**
```javascript
// Example test file: components/__tests__/contact.test.tsx
describe('Contact Form', () => {
  it('sends notification to Valerie', () => {
    // Wallaby shows pass/fail inline
    expect(emailTo).toBe('valerie@auraspringcleaning.com');
  });
});
```

### Configuration Files
- `wallaby.js` - Main Wallaby configuration
- `jest.config.js` - Jest test framework setup
- `jest.setup.js` - Test environment setup

---

## 📁 Project Structure for Testing

```
aura-springs-standalone/
├── .console-ninja.json     # Console Ninja config
├── wallaby.js              # Wallaby config
├── jest.config.js          # Jest config
├── jest.setup.js           # Test setup
├── .vscode/
│   └── settings.json       # VS Code settings
├── __mocks__/
│   └── fileMock.js        # Mock for images
└── components/
    └── __tests__/
        └── example.test.tsx # Example test file
```

---

## 🚀 Quick Start Commands

### Install Required Packages
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest ts-jest babel-jest identity-obj-proxy
```

### Run Tests Manually
```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage report
```

---

## 💡 Pro Tips

### Console Ninja Tips
1. **Track Customer Flow:**
```javascript
console.log('Customer journey:', {
  page: window.location.pathname,
  action: 'clicked_contact',
  phone: '(512) 781-0527'  // Valerie's number
});
```

2. **Debug API Calls:**
```javascript
console.time('Booking API');
const response = await fetch('/api/booking');
console.timeEnd('Booking API');  // Shows response time
console.log('Response:', await response.json());
```

3. **Track Valerie's Notifications:**
```javascript
console.log('Sending to Valerie:', {
  email: 'valerie@auraspringcleaning.com',
  type: 'new_booking',
  customer: customerName
});
```

### Wallaby Tips
1. **See Coverage:** Look for colored indicators in the gutter
2. **Hover for Details:** Hover over test indicators for info
3. **Auto-Fix:** Some failures show quick fixes
4. **Filter Tests:** Use Wallaby App to filter/focus tests

---

## 🎯 Benefits for Aura Spring Cleaning

### With Console Ninja:
- Debug booking flow without leaving VS Code
- Track when notifications go to Valerie
- Monitor API response times
- See customer data inline while coding

### With Wallaby:
- Ensure contact forms work correctly
- Test that Valerie receives all notifications
- Verify phone number formatting
- Instant feedback on code changes

---

## 📞 Testing Valerie's Contact Flow

Here's a test to ensure leads go to Valerie:

```javascript
// In your test file
test('Contact form sends to Valerie', async () => {
  console.log('Testing Valerie notification...');
  
  const formData = {
    name: 'Test Customer',
    phone: '(512) 555-1234',
    email: 'test@example.com'
  };
  
  console.log('Submitting:', formData);
  
  const response = await submitContactForm(formData);
  
  // Verify it goes to Valerie
  expect(response.notificationSentTo).toBe('valerie@auraspringcleaning.com');
  console.log('✅ Notification sent to Valerie!');
});
```

---

## 🔧 Troubleshooting

### Console Ninja Not Working?
1. Make sure extension is installed in VS Code
2. Start Console Ninja from command palette
3. Check `.console-ninja.json` exists
4. Restart VS Code

### Wallaby Not Running?
1. Ensure Wallaby extension is installed
2. Start Wallaby from command palette
3. Check `wallaby.js` configuration
4. Install test dependencies: `npm install --save-dev @testing-library/react`

---

## 📚 Resources

- **Console Ninja Docs:** https://console-ninja.com/docs
- **Wallaby Docs:** https://wallabyjs.com/docs
- **Jest Docs:** https://jestjs.io/docs
- **Testing Library:** https://testing-library.com/docs

---

*Configuration complete! Your debugging and testing tools are ready to use.*
*All customer contacts configured to go to Valerie at (512) 781-0527*