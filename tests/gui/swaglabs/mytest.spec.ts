import { test, expect } from '@playwright/test';

test('Invoke Chrome and validate F5 Technical Articles tabs', async ({page}) => {
  await page.goto('https://community.f5.com/');
  const articlesMenu = page.locator('header, nav').getByTestId('NavbarDropdown.Toggle').last();
  await articlesMenu.waitFor({ state: 'visible' });
  await articlesMenu.hover();

const technicalArticlesOption = page.getByRole('link', { name: 'Technical Articles', exact: true }).first();
await technicalArticlesOption.waitFor({ state: 'visible' });
const pagePromise = page.context().waitForEvent('page');
await technicalArticlesOption.click();
const newPage = await pagePromise;
await newPage.waitForLoadState();
  const expectedTabs = [
    'Newest Topics',
    'Most Likes',
    'Most Viewed',
    'Most Replies',
    'No Replies Yet'
  ];

  console.log('Verifying Technical Articles filter tabs...');
  for (const tabName of expectedTabs) {
    const tabLocator = newPage.getByText(tabName, { exact: true });
    await expect(tabLocator).toBeVisible({ timeout: 5000 });
    console.log(`✅ Validated tab: "${tabName}" exists on the page.`);
  }
});
