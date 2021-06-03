
    export default function(){
        
        cy.visit("http://127.0.0.1:8080/#/")
        
        cy.get('DIV[id="app"]>DIV[id="nav"]>A[href="#/about"],A[class=""]').eq(0).click()
        
        cy.get('DIV[id="app"]>DIV[id="nav"]>A[href="#/"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]').eq(0).click()
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner"]').eq(0).click()
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner"]').eq(0).type("12345")
        
    }
    