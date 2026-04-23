npx playwright test tests/UIBasics.spec.js --headed --reporter="line,allure-playwright"
/* 
command = npm run regression test  // this command trget package.json file and than find regression test to run only
 "scripts": {

    "regression test": "npx playwright test tests/UIBasics.spec.js --headed --reporter=\"line,allure-playwright\" && allure generate ./allure-results --clean && allure open ./allure-report"
     
  },
 */
