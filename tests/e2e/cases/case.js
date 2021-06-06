
    export default function(){
        
        cy.visit("http://192.168.31.253:8080/")
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="hello"]>H1').eq(0).click()
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^(?:\/(?=$))?$/i)
        })
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="hello"]>H1').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq('Welcome to Your Vue.js App')
        })
        
        cy.get('DIV[id="app"]>DIV[id="nav"],DIV>A[href="/about"],A').eq(2).click()
        
        cy.get('DIV[id="app"],DIV>DIV[class="about"]>H1').eq(1).click()
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^\/about(?:\/(?=$))?$/i)
        })
        
        cy.get('DIV[id="app"],DIV>DIV[class="about"]>H1').eq(1).should(($div) => {
            expect($div.get(0).innerText).to.eq('This is an about page')
        })
        
        cy.get('DIV[id="app"],DIV>DIV[id="nav"],DIV>A[href="/"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]').eq(2).click()
        
        cy.get('DIV[id="app"],DIV>DIV[class="home"]>DIV[class="hello"]>H1').eq(1).click()
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^(?:\/(?=$))?$/i)
        })
        
        cy.get('DIV[id="app"],DIV>DIV[class="home"]>DIV[class="hello"]>H1').eq(1).should(($div) => {
            expect($div.get(0).innerText).to.eq('Welcome to Your Vue.js App')
        })
        
        cy.get('DIV[id="app"],DIV>DIV[class="home"]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner"]').eq(1).click()
        
        cy.get('DIV[id="app"],DIV>DIV[class="home"]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner"]').eq(1).type("1234")
        
    }
    