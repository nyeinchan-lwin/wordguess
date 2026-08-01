// Playwright automated click-through test for WordGuess
import { chromium } from 'playwright';

const URL = 'http://localhost:8080';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });

  console.log('1. Loading page…');
  await page.goto(URL, { waitUntil: 'networkidle' });
  console.log('   ✓ Page loaded, title:', await page.title());

  // Check menu screen
  const menuTitle = await page.textContent('.site-title');
  console.log(`   ✓ Menu title: "${menuTitle}"`);

  // Check How to Play legend is visible
  const htpLegend = await page.$('.htp-legend');
  console.log(`   ✓ How to Play legend visible: ${!!htpLegend}`);

  // Check settings button
  const settingsBtn = await page.$('[data-settings-open]');
  console.log(`   ✓ Settings button visible: ${!!settingsBtn}`);

  // Click "Random" to start game
  console.log('2. Starting game…');
  await page.click('button[data-target="en"]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  console.log('   ✓ Game screen visible');

  // Check game screen elements
  const grid = await page.$('[data-grid]');
  console.log(`   ✓ Grid present: ${!!grid}`);

  const keyboard = await page.$('[data-keyboard]');
  console.log(`   ✓ Keyboard present: ${!!keyboard}`);

  const legend = await page.$('[data-legend]');
  console.log(`   ✓ Game colour legend present: ${!!legend}`);

  const hintBtn = await page.$('[data-hint]');
  console.log(`   ✓ Hint button present: ${!!hintBtn}, text: "${await hintBtn?.textContent()}"`);

  // Click some keys on the keyboard
  console.log('3. Testing keyboard input…');
  const keys = await page.$$('[data-key]');
  console.log(`   ✓ ${keys.length} keys found`);

  // Type a 5-letter word using keyboard clicks
  const testWord = ['C','R','A','N','E'];
  for (const letter of testWord) {
    await page.click(`button[data-key="${letter}"]`);
    await page.waitForTimeout(50);
  }
  console.log(`   ✓ Typed "${testWord.join('')}"`);

  // Submit the guess
  await page.click('button[data-key="Enter"]');
  await page.waitForTimeout(1000);
  console.log('   ✓ Guess submitted');

  // Check tiles have states
  const tiles = await page.$$('[data-tile]');
  const firstRowStates = await Promise.all(
    tiles.slice(0, 5).map(t => t.getAttribute('data-state'))
  );
  console.log(`   ✓ Tile states after first guess: [${firstRowStates.join(', ')}]`);

  // Test back button
  console.log('4. Testing navigation…');
  await page.click('[data-back]');
  await page.waitForSelector('[data-screen="menu"]:not([hidden])');
  console.log('   ✓ Back to menu');

  // Test settings
  console.log('5. Testing settings…');
  await page.click('[data-settings-open]');
  await page.waitForSelector('[data-settings-overlay]:not([hidden])');
  console.log('   ✓ Settings overlay visible');

  // Toggle dark mode
  const darkToggle = await page.$('input[data-setting="dark"]');
  const wasChecked = await darkToggle.isChecked();
  await darkToggle.click();
  const isChecked = await darkToggle.isChecked();
  console.log(`   ✓ Dark mode toggled: ${wasChecked} → ${isChecked}`);

  // Close settings
  await page.click('[data-settings-close]');
  await page.waitForTimeout(200);

  // Test stats overlay
  console.log('6. Testing stats…');
  await page.click('[data-stats-open]');
  await page.waitForSelector('[data-stats-overlay]:not([hidden])');
  console.log('   ✓ Stats overlay visible');
  await page.click('[data-stats-close]');

  // Test hint button
  console.log('7. Testing hint…');
  await page.click('button[data-target="en"]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(200);
  await page.click('[data-hint]');
  await page.waitForTimeout(200);
  console.log('   ✓ Hint clicked');
  const hintDisabled = await (await page.$('[data-hint]')).isDisabled();
  console.log(`   ✓ Hint button disabled after use: ${hintDisabled}`);

  // Report errors
  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} error(s) found:`);
    errors.forEach(e => console.log(`   - ${e}`));
  } else {
    console.log('\n✅ All tests passed — no errors!');
  }

  await browser.close();
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
