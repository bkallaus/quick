from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:5173/quick/")
    page.wait_for_timeout(1000)

    # Navigate to Random Number Generator
    page.get_by_role("link", name="Random Number Generator").click()
    page.wait_for_timeout(1000)

    # Scope to the random number generator container
    container = page.locator("#random-number-generator")

    # Enter min and max
    min_input = container.get_by_label("Min")
    min_input.fill("10")
    page.wait_for_timeout(500)

    max_input = container.get_by_label("Max")
    max_input.fill("50")
    page.wait_for_timeout(500)

    # Generate
    container.get_by_role("button", name="Generate").click()
    page.wait_for_timeout(1000)

    # Test error case
    min_input.fill("100")
    page.wait_for_timeout(500)
    max_input.fill("50")
    page.wait_for_timeout(500)
    container.get_by_role("button", name="Generate").click()
    page.wait_for_timeout(1000)

    # Back to valid case to take final screenshot
    min_input.fill("1")
    page.wait_for_timeout(500)
    max_input.fill("100")
    page.wait_for_timeout(500)
    container.get_by_role("button", name="Generate").click()
    page.wait_for_timeout(1000)

    # Copy
    container.get_by_title("Copy to clipboard").click()
    page.wait_for_timeout(1000)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/random-number-generator.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
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
