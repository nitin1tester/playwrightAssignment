import { test as base, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

type MyFixture = {
    inventoryPage : InventoryPage;
};
// my custom fixture
export const test =  base.extend<MyFixture>({
    inventoryPage:async ({page,baseURL},use, testInfo)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        const username = testInfo.project.metadata.appUsername;
        const password = testInfo.project.metadata.appPassword;
        const inventoryPage =  await loginPage.doLogin(username,password);
        await inventoryPage.clickOnHanburgerBtn();
        const flag:boolean =  await inventoryPage.isLogoutBtnVisible();
        expect(flag).toBeTruthy;
        await use(inventoryPage);
    }
});

export{expect}