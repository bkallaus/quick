from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173/quick/")
        set_ops_link = page.get_by_role("link", name="Set Operations")
        set_ops_link.click()
        expect(page.get_by_role("heading", name="Set Operations", exact=True)).to_be_visible()
        page.screenshot(path="/home/jules/workspace/screenshot_full.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()
