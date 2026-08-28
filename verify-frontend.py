from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Start server in background first for this script or use an existing one
        # Assuming the dev server is running, we go to the subpath
        page.goto("http://localhost:5173/quick/")

        # Navigate to the Set Operations tool using the sidebar
        set_ops_link = page.get_by_role("link", name="Set Operations")
        set_ops_link.click()

        # Verify we are on the tool
        expect(page.get_by_role("heading", name="Set Operations", exact=True)).to_be_visible()

        # Type in list A
        list_a = page.get_by_label("List A")
        list_a.fill("apple\nbanana\ncherry\norange")

        # Type in list B
        list_b = page.get_by_label("List B")
        list_b.fill("banana\nkiwi\norange\ngrape")

        # Change operation to Intersection
        operation_trigger = page.get_by_label("Operation")
        operation_trigger.click()
        page.get_by_role("option", name="Intersection (A ∩ B)").click()

        # Wait a moment for rendering
        page.wait_for_timeout(500)

        # Take screenshot of the tool
        # Ensure it's scrolled into view since it might be at the bottom
        page.evaluate("document.getElementById('set-operations-output').scrollIntoView()")

        page.screenshot(path="/home/jules/workspace/screenshot.png")
        browser.close()

if __name__ == "__main__":
    run()
