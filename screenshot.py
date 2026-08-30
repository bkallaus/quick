import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        await page.goto('http://localhost:5173/quick/')

        # Click on the CSS Box Shadow Generator nav link
        await page.get_by_role('link', name='CSS Box Shadow Generator').click()

        # Wait for the component to render
        await page.wait_for_selector('#css-box-shadow-generator')

        # Scroll it into view
        await page.evaluate("document.querySelectorAll('#css-box-shadow-generator')[1].scrollIntoView()")

        # Wait a moment for any animations/styles to settle
        await page.wait_for_timeout(1000)

        # Take screenshot of the component (use nth(1) due to duplicate ids from parent/child rendering or nav anchors)
        component = page.locator('#css-box-shadow-generator').nth(1)
        await component.screenshot(path='/home/jules/verification/screenshots/verification.png')

        await browser.close()

asyncio.run(main())
