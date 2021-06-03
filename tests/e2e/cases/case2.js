
    export default function(){
        
        cy.visit("http://192.168.31.253:8080/#/")
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="hello  "]>H1[class=" mouseover"]').eq(0).click()
        
        cy.get('DIV[id="app"]>DIV[id="nav"],DIV[class="  "]>A[href="#/about"],A[class="  mouseover"]').eq(1).click()
        
        cy.get('DIV[id="app"]>DIV[id="nav"],DIV[class="    "]>A[href="#/"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]').eq(1).click()
        
        cy.get('DIV[id="app"]>DIV[class="home  "]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner mouseover"]').eq(0).click()
        
        cy.get('DIV[id="app"]>DIV[class="home  "]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner mouseover"]').eq(0).type("12345677")
        
        cy.get('DIV[id="app"]>DIV[id="nav"],DIV[class="      "]>A[href="#/about"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]').eq(1).click()
        
        cy.get('DIV[id="app"],DIV[class=" "]>DIV[class="about"]>H1[class=" mouseover"]').eq(1).click()
        
        cy.get('DIV[id="app"],DIV[class="  "]>DIV[id="nav"],DIV[class="          "]>A[href="#/"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]').eq(2).click()
        
        cy.get('DIV[id="app"],DIV[class="  "]>DIV[class="home "]>DIV[class="hello "]>H1[class="  mouseover"]').eq(1).click()
        
        cy.get('DIV[id="app"],DIV[class="  "]>DIV[class="home  "]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner      mouseover"]').eq(1).click()
        
        cy.get('DIV[id="app"],DIV[class="  "]>DIV[class="home  "]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner           mouseover"]').eq(1).type("123456")
        
    }
    