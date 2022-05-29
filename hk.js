const puppeteer = require("puppeteer");
const codeObj = require("./codes");

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "psank2021@gmail.com";
const password = "Arsh@786";


const browserOpen = puppeteer.launch({
    headless : false,

    args : ["--start-maximized"],

    defaultViewport : null
});

let page;
browserOpen.then(function(browserObj){
    let browserOpenpromise = browserObj.newPage();  //open a new tab
    return browserOpenpromise;
}).then(function (newTab){
    page = newTab;
    let openHackerrankPromise = newTab.goto(loginLink);
    return openHackerrankPromise;
}).then(function(){
    let emailIsEntred = page.type("input[id='input-1']", email, {delay : 50});  //by adding delay we can see the process
    return emailIsEntred;
}).then(function(){
    let passswordIsEntred = page.type("input[type='password']", password, {delay : 50});
    return passswordIsEntred;
}).then(function(){
    let loginButtonClicked = page.click("button[type='submit']", {delay : 50});
    return loginButtonClicked;
}).then(function(){
    let clickAlgoButton = waitAndClick("[data-automation='algorithms']", page);
    return clickAlgoButton;
}).then(function(){
    let getToWarmup = waitAndClick("input[value='warmup']", page);
    return getToWarmup;
}).then(function(){
    let waitFor3Sec = page.waitForTimeout(3000);   //3000 microsec = 3sec;
    return waitFor3Sec;
}).then(function(){
    let allChallangePromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay : 50}); // .challenge-submit-btn .ui-content.align-icon-right  ---------------  //it is not jquery , we repsresnet document.querySelector by single $, and $$ = document.querySelector(all) 
    return allChallangePromise; //it return an array in 'then' function
}).then(function(questionArr){
    // console.log(questionArr.length);
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answer[0]);
    return questionWillBeSolved;
})




function waitAndClick(selector, cPage){
    return new Promise(function (resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector);
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function err (){
            reject();
        })
    })
}

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let clickTheQues = question.click();
        clickTheQues.then(function(){
            let editorInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return editorInFocusPromise;
        }).then(function(){
            return waitAndClick("input[type='checkbox']", page);
        }).then(function(){
            return page.type("input[type='checkbox']", answer, {delay : 10});
        }).then(function(){
            let ctrlPressed = page.keyboard.down("Control", {delay : 200});
            return ctrlPressed;
        }).then(function(){
            let Apress = page.keyboard.press("A", {delay : 200});
            return Apress;
        }).then(function(){
            let Xpress = page.keyboard.press("X", {delay : 200});
            return Xpress;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function(){
            let mainEditorInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return mainEditorInFocus;
        }).then(function(){
            let ctrlPressed = page.keyboard.down("Control");
            return ctrlPressed;
        }).then(function(){
            let Apress = page.keyboard.press("A", {delay : 200});
            return Apress;
        }).then(function(){
            let Vpress = page.keyboard.press("V", {delay : 200});
            return Vpress;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function(){
            let runCode = page.click(".hr-monaco__run-code");
            return runCode;
        }).then(function(){
            return page.waitForTimeout(8000);
        }).then(function(){
            return page.click(".hr-monaco-submit");
        })
    })
}