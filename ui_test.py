import json
import base64
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000/quick")
    page.wait_for_timeout(1000)

    # Click the JWT Decoder link in the side nav
    page.get_by_role("link", name="JWT Decoder").click()
    page.wait_for_timeout(500)

    # Create a valid token to paste
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {"sub": "1234567890", "name": "John Doe", "iat": 1516239022, "exp": 1516239022}

    # Base64 encode
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
    token = f"{header_b64}.{payload_b64}.signature"

    # Fill the textarea
    page.get_by_placeholder("Paste your JWT here").fill(token)
    page.wait_for_timeout(1000)

    # scroll down
    page.evaluate("window.scrollBy(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/preview_scroll.png")
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
