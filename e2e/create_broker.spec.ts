import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:8000/login");

    const email = "helenerasoavelo@gmail.com";
    const password = "password";

    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("remember-checkbox").check();
    await page.getByTestId("login-button").click();
});

test("Add broker", async ({ page }) => {
    await page.getByTestId("broker-link").click();
    await page.waitForURL("http://127.0.0.1:8000/brokers");

    await page.getByTestId("add-button").click();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fakeData = {
        firstName,
        lastName,
        email: faker.internet.email({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
        }),
        phone: faker.helpers.fromRegExp("[0-9]{3}-[0-9]{4}"),
        password: "password",
        passwordConfirmation: "password",
        role: "broker",
        active: faker.helpers.arrayElement([true, false]),
        firmName: faker.company.name(),
        firmAddress: faker.location.streetAddress(true),
    };

    await page.getByTestId("last_name-input").fill(fakeData.lastName);
    await page.getByTestId("first_name-input").fill(fakeData.firstName);
    await page.getByTestId("email-input").fill(fakeData.email);
    await page.getByTestId("phone-input").fill(fakeData.phone);
    await page.getByTestId("password-input").fill(fakeData.password);
    await page
        .getByTestId("password_confirmation-input")
        .fill(fakeData.passwordConfirmation);
    await page.getByTestId(fakeData.role + "_role-radio").click();
    if (fakeData.active) {
        await page.getByTestId("active-switch").click();
    }
    await page.getByTestId("firm_name-input").fill(fakeData.firmName);
    await page.getByTestId("firm_address-input").fill(fakeData.firmAddress);

    await expect(page.getByTestId("last_name-input")).toHaveValue(
        fakeData.lastName,
    );
    await expect(page.getByTestId("first_name-input")).toHaveValue(
        fakeData.firstName,
    );
    await expect(page.getByTestId("email-input")).toHaveValue(fakeData.email);
    //  await expect(page.getByTestId("phone-input")).toHaveValue(
    //      fakeData.phone,
    //  );
    await expect(page.getByTestId("password-input")).toHaveValue(
        fakeData.password,
    );
    await expect(page.getByTestId("password_confirmation-input")).toHaveValue(
        fakeData.passwordConfirmation,
    );
    await expect(page.getByTestId("firm_name-input")).toHaveValue(
        fakeData.firmName,
    );
    await expect(page.getByTestId("firm_address-input")).toHaveValue(
        fakeData.firmAddress,
    );

    await page.getByTestId("submit-button").click();
});
