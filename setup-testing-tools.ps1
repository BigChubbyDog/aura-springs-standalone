Write-Host "=== SETTING UP CONSOLE NINJA & WALLABY ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Installing testing dependencies..." -ForegroundColor Yellow
Write-Host ""

# Install test dependencies
npm install --save-dev `
  @testing-library/react `
  @testing-library/jest-dom `
  @testing-library/user-event `
  jest `
  jest-environment-jsdom `
  ts-jest `
  babel-jest `
  identity-obj-proxy `
  @types/jest

Write-Host ""
Write-Host "✅ Test dependencies installed!" -ForegroundColor Green
Write-Host ""

Write-Host "=== SETUP COMPLETE ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "CONSOLE NINJA:" -ForegroundColor Green
Write-Host "1. Open VS Code" -ForegroundColor White
Write-Host "2. Install Console Ninja extension if not installed" -ForegroundColor White
Write-Host "3. Press Ctrl+Shift+P and run 'Console Ninja: Start'" -ForegroundColor White
Write-Host "4. Your console.logs will appear inline!" -ForegroundColor White
Write-Host ""

Write-Host "WALLABY:" -ForegroundColor Green
Write-Host "1. Open VS Code" -ForegroundColor White
Write-Host "2. Install Wallaby.js extension if not installed" -ForegroundColor White
Write-Host "3. Press Ctrl+Shift+P and run 'Wallaby.js: Start'" -ForegroundColor White
Write-Host "4. Tests will run automatically as you type!" -ForegroundColor White
Write-Host ""

Write-Host "TEST THE SETUP:" -ForegroundColor Yellow
Write-Host "Run: npm test" -ForegroundColor White
Write-Host ""

Write-Host "EXAMPLE DEBUG CODE:" -ForegroundColor Yellow
Write-Host @"
// Add this to any component to see Console Ninja in action:
console.log('Valerie contact:', {
  phone: '(512) 781-0527',
  email: 'valerie@auraspringcleaning.com'
});
"@ -ForegroundColor Cyan

Write-Host ""
Write-Host "Configuration files created:" -ForegroundColor Green
Write-Host "  ✓ .console-ninja.json" -ForegroundColor White
Write-Host "  ✓ wallaby.js" -ForegroundColor White
Write-Host "  ✓ jest.config.js" -ForegroundColor White
Write-Host "  ✓ jest.setup.js" -ForegroundColor White
Write-Host "  ✓ .vscode/settings.json" -ForegroundColor White
Write-Host ""
Write-Host "Happy debugging! 🥷" -ForegroundColor Green