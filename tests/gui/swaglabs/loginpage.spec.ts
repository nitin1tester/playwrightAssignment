// import {test,expect} from '@playwright/test';
import { test, expect } from '../../../src/gui/fixtures/baseFixtures';
import {LoginPage} from '../../../src/gui/pages/LoginPage';
import { InventoryPage } from '../../../src/gui/pages/InventoryPage';

// Data provider for login users(here we have 3 invalid creds as well for that test cases will fail)
const userCredData = [
    {username: 'standard_user', password:'secret_sauce'},
    // {username: 'locked_out_user', password:'secret_sauce'}, //Invalid creds
    {username: 'problem_user', password:'secret_sauce'},
    // {username: 'performance_glitch_user', password:'secret_sauce'},  //Invalid creds
    // {username: 'error_user', password:'secret_sauce'}, //Invalid creds
    {username: 'visual_user', password:'secret_sauce'}
];

for(const login of userCredData){

    test(`Positive: Successful login with valid credentials ${login.username}`,{tag:['@production', '@smoke','@sanity','@regression']}, async({page,baseURL})=>{
    console.table(login);
    const loginPage:LoginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    const invertoryPage:InventoryPage =  await loginPage.doLogin(login.username,login.password);
    await invertoryPage.clickOnHanburgerBtn();
    const isLogoutVisibleFlag:boolean = await invertoryPage.isLogoutBtnVisible();
    expect(isLogoutVisibleFlag).toBeTruthy;
   
});
}


test('Negative: Login failure with invalid credentials',{tag:['@regression']} , async({page,baseURL})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLogin('wrongData','secret_sauce');
    const errorMsg : string|null =  await loginPage.getInvalidLoginMessage();
    expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');
    
});

/**
 * I am adding Allure integration for it in begining only cmd for config
 * >> npm install --save-dev allure-playwright allure-commandline
 * >> npx allure generate allure-result --clean -o allure-report
 * >> npx allure serve allure-results  
 * 
 */

