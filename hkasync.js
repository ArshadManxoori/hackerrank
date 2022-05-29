const puppeteer = require("puppeteer");
const codeObj = require("./codes");

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "psank2021@gmail.com";
const password = "Arsh@786";

let page;

//always use a semicolon on before last vriable from ifee function
(async function(){
    
    try {
        const browserOpen = await puppeteer.launch({
            headless : false,
            args : ["--start-maximized"],
            defaultViewport : null,
        });
        
        let newTab = await browserOpen.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']", email, {delay : 50});
        await newTab.type("input[id='input-2']", password, {delay : 50});
        await newTab.click("button[type='submit']", {delay : 50});
        await waitAndClick("[data-automation='algorithms']", newTab); 
        await waitAndClick("input[value='warmup']", newTab);
        await newTab.waitForTimeout(2500);
        let questArr = await newTab.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay : 50});
        // console.log(questArr.length);
        quesSolver(newTab, questArr[0], codeObj.answer[0]);

    } catch (error) {
        console.log(error);       
    }

})(); 

async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector);
    return cPage.click(selector);
}

async function quesSolver(page, question, answer){
    await question.click();
    await waitAndClick(".monaco-editor.no-user-select.vs", page);
    await waitAndClick("input[type='checkbox']", page);
    await page.type("input[type='checkbox']", answer, {delay : 10});
    await page.keyboard.down("Control", {delay : 200});
    await page.keyboard.press("A", {delay : 200});
    await page.keyboard.press("X", {delay : 200});
    await page.keyboard.up("Control");
    await page.click(".monaco-editor.no-user-select.vs", page);
    await page.keyboard.down("Control");
    await page.keyboard.press("A", {delay : 200});
    await page.keyboard.press("V", {delay : 200});
    await page.keyboard.up("Control");
    await page.click(".hr-monaco__run-code");
    await page.waitForTimeout(7000);
    await page.click(".hr-monaco-submit");

}