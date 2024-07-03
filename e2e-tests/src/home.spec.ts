import { test, expect } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/config/db";
import User from "../../backend/src/entities/User";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can view users in db", async ({ page }) => {
  // Annonces Récentes
  const admin = new User();
  Object.assign(admin, {
    firstName: "admin",
    lastName: "test",
    email: "admin@app.com",
    password: "Test-password1"
  });
  await admin.save();
 
  await page.goto("/signup");
  await page.getByRole("heading", { name: "Créer un compte" });

  await page.waitForSelector('[data-testid="label-email"]');
  console.log(await page.content());
  const inputElement = page.locator('[data-testid="label-email"]');
  await expect(inputElement).toHaveAttribute('placeholder', 'Adresse mail');

});