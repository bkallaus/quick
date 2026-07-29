import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to the app (considering the homepage config in package.json)
    page.goto("http://localhost:3000/quick/")
    page.wait_for_timeout(2000)

    # Scroll to the temperature converter component
    page.evaluate("document.getElementById('temperature-converter').scrollIntoView()")
    page.wait_for_timeout(1000)

    # Take initial screenshot
    page.screenshot(path="/home/jules/verification/screenshots/temperature-converter-initial.png")

    # Interact with Celsius input
    celsius_input = page.get_by_label("Celsius (°C)")
    celsius_input.fill("100")
    page.wait_for_timeout(1000)

    # Take screenshot after interacting
    page.screenshot(path="/home/jules/verification/screenshots/temperature-converter.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
