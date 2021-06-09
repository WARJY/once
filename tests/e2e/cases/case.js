
    export default function(){
        
        cy.visit("http://192.168.31.253:8080/")
        
        cy.get('DIV[id="app"]>DIV[id="nav"],DIV:nth-of-type(2)>A[href="/about"],A:nth-of-type(3)').eq(0).click()
        
        cy.get('DIV[id="app"]>DIV[id="nav"],DIV:nth-of-type(2)>A[href="/"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]:nth-of-type(2)').eq(1).click()
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="hello"]>H1').eq(0).click()
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^(?:\/(?=$))?$/i)
        })
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="hello"]>H1').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq('Welcome to Your Vue.js App')
        })
        
        cy.get('DIV[id="app"]>DIV[id="nav"],DIV:nth-of-type(2)>A[href="/about"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]:nth-of-type(2)').eq(1).click()
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[class="about"]:nth-of-type(2)>H1:nth-of-type(2)').eq(0).click()
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^\/about(?:\/(?=$))?$/i)
        })
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[class="about"]:nth-of-type(2)>H1:nth-of-type(2)').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq('This is an about page')
        })
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[id="nav"],DIV:nth-of-type(2)>A[href="/"],A[class="router-link-exact-active router-link-active"],A[aria-current="page"]:nth-of-type(3)').eq(2).click()
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[class="home"]:nth-of-type(2)>DIV[class="hello"]:nth-of-type(2)>H1').eq(0).click()
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^(?:\/(?=$))?$/i)
        })
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[class="home"]>DIV[class="hello"]>H1').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq('Welcome to Your Vue.js App')
        })
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[class="home"]:nth-of-type(2)>INPUT:nth-of-type(2)').eq(0).click()
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[class="home"]>INPUT').eq(0).type("123")
        
        cy.get('DIV[id="app"],DIV:nth-of-type(1)>DIV[class="home"]:nth-of-type(2)>DIV[class="el-select"]:nth-of-type(2)>DIV[class="el-input el-input--suffix is-focus"]>INPUT[type="text"],INPUT[readonly="readonly"],INPUT[autocomplete="off"],INPUT[placeholder="请选择"],INPUT[class="el-input__inner"]:nth-of-type(3)').eq(2).click()
        
        cy.get('DIV[class="el-select-dropdown el-popper"],DIV[style="min-width: 217.5px; position: absolute; top: 791px; left: 447px; transform-origin: center top; z-index: 2001;"],DIV[x-placement="bottom-start"]>DIV[class="el-scrollbar"],DIV:nth-of-type(9)>DIV[class="el-select-dropdown__wrap el-scrollbar__wrap"],DIV[style="margin-bottom: -17px; margin-right: -17px;"]:nth-of-type(3)>UL[class="el-scrollbar__view el-select-dropdown__list"]:nth-of-type(1)>LI[class="el-select-dropdown__item hover"]:nth-of-type(1)').eq(0).click()
        
    }
    