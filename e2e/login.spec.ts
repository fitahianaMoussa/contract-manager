import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:8000/login");
});

test("No credential", async ({ page }) => {
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("email-error")).toContainText(
        "The email field is required.",
    );
    await expect(page.getByTestId("password-error")).toContainText(
        "The password field is",
    );
});

test("Valid credential", async ({ page }) => {
    const email = "helenerasoavelo@gmail.com";
    const password = "password";

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("remember-checkbox").check();

    await expect(page.getByTestId("email-input")).toHaveValue(email);
    await expect(page.getByTestId("password-input")).toHaveValue(password);
    await expect(page.getByTestId("remember-checkbox")).toBeChecked();

    await page.getByTestId("login-button").click();

    await page.waitForURL("http://127.0.0.1:8000/");

    await expect(page).toHaveURL("http://127.0.0.1:8000/");
});
