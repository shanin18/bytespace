import { test, expect } from '@playwright/test';

test('home, search, filters, and accessible mobile navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Get access');
  await expect(
    page.getByRole('button', {
      name: /(?:Pause|Play) partner animation|(?:Pause|Resume) testimonials/,
    }),
  ).toHaveCount(0);
  await page.getByRole('textbox', { name: 'Search courses' }).fill('Figma');
  await page.getByRole('button', { name: 'Find a course', exact: true }).click();
  await expect(page).toHaveURL(/q=Figma/);
  await expect(page.locator('.course-card')).toHaveCount(1);
  await expect(page.locator('.course-title')).toHaveText('UI Design Fundamentals in Figma');
  await page.getByRole('button', { name: 'Clear search' }).click();
  await page.getByRole('tab', { name: 'Development', exact: true }).click();
  await expect(page.locator('.course-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'Filters', exact: true }).click();
  await page.getByRole('combobox', { name: 'Experience level' }).click();
  await page.getByRole('option', { name: 'Beginner', exact: true }).click();
  await expect(page.locator('.course-card')).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Explore courses' })
    .click();
  await expect(page).toHaveURL('/courses');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test('register, enroll, save progress, post a review, download a resource, and sign out', async ({
  page,
}) => {
  const email = `learner-${Date.now()}@example.test`;
  await page.goto('/register');
  await page.getByLabel('Full name').fill('Taylor Learner');
  await page.locator('.auth-card').getByLabel('Email address').fill(email);
  await page.getByLabel('Password', { exact: true }).fill('CuriousMind!2026');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Create your account' }).click();
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByRole('heading', { name: 'Hello, Taylor.' })).toBeVisible();
  await page.goto('/courses/digital-asset');
  await page.getByRole('button', { name: 'Start learning', exact: true }).click();
  await expect(page).toHaveURL('/courses/digital-asset/learn');
  await page.getByRole('button', { name: 'Mark as complete' }).click();
  await expect(page.getByRole('button', { name: 'Lesson completed' })).toBeDisabled();
  await page.reload();
  await expect(page.getByText('1 of 10 lessons completed')).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download your practice worksheet' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('bytespace-digital-asset-worksheet.txt');
  await page.goto('/courses/digital-asset?tab=reviews');
  await page
    .getByLabel('Your review')
    .fill('The practical exercises helped me turn a creative idea into a clear project.');
  await page.getByRole('button', { name: 'Publish review' }).click();
  await expect(page.getByText('Thank you! Your review has been published.')).toBeVisible();
  await page.reload();
  await expect(page.locator('.written-review').first()).toContainText('Taylor Learner');
  await page.goto('/dashboard');
  await expect(page.locator('.course-progress')).toContainText('10%');
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL('/');
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
  await page.locator('.auth-card').getByLabel('Email address').fill(email);
  await page.getByLabel('Password', { exact: true }).fill('CuriousMind!2026');
  await page.getByRole('button', { name: 'Let’s get learning' }).click();
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('.course-progress')).toContainText('10%');
});

test('course tabs, newsletter, missing page, and carousel wrap', async ({ page }) => {
  await page.goto('/courses/digital-asset');
  await page.getByRole('tab', { name: 'Lessons', exact: true }).click();
  await expect(page.getByText('Your learning journey')).toBeVisible();
  await page.getByRole('button', { name: '02 Building a strong foundation' }).click();
  await expect(page.getByRole('button', { name: /Understanding the fundamentals/ })).toBeVisible();
  await page.getByRole('button', { name: 'Play course preview' }).click();
  await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
  await page.goto('/');
  await page
    .getByLabel('Email address', { exact: true })
    .fill(`curious-${Date.now()}@example.test`);
  await page.getByRole('button', { name: 'Stay curious' }).click();
  await expect(page.getByRole('status')).toContainText('You’re on the list!');
  await page.getByRole('button', { name: 'Show testimonial 5' }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'Next testimonial', exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: 'Show testimonial 1' })).toHaveAttribute(
    'aria-current',
    'true',
  );
  await page.goto('/a-missing-page');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('doesn’t exist');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('/');
});

test('shadcn selects support keyboard navigation and update sorting', async ({ page }) => {
  await page.goto('/courses');
  const sort = page.getByRole('combobox', { name: 'Sort by' });
  await expect(sort).toHaveAttribute('data-slot', 'select-trigger');
  await sort.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(sort).toBeFocused();
  await sort.click();
  await page.getByRole('option', { name: 'Price: low to high', exact: true }).click();
  await expect(page.locator('.course-card').first()).toContainText('Your First Website');
  await expect(sort).toContainText('Price: low to high');
});

test('responsive pages fit the viewport', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/courses', '/courses/digital-asset', '/register', '/creator']) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route} at ${width}px`,
      ).toBeTruthy();
    }
  }
});
