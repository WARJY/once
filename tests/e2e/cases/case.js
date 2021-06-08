
    export default function(){
        
        cy.visit("http://192.168.31.253:8080/")
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner"]').eq(0).click()
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="el-input"]>INPUT[type="text"],INPUT[autocomplete="off"],INPUT[class="el-input__inner"]').eq(0).type("12345")
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="hello"]>H1').eq(0).click()
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^(?:\/(?=$))?$/i)
        })
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="hello"]>H1').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq('Welcome to Your Vue.js App')
        })
        
        cy.get('DIV[id="app"]>DIV[class="home"]>DIV[class="el-select"]>DIV[class="el-input el-input--suffix is-focus"]>INPUT[type="text"],INPUT[readonly="readonly"],INPUT[autocomplete="off"],INPUT[placeholder="请选择"],INPUT[class="el-input__inner"]').eq(1).click()
        
        cy.get('DIV[class="el-select-dropdown el-popper"],DIV[style="min-width: 217.5px; position: absolute; top: 791px; left: 447px; transform-origin: center top; z-index: 2001;"],DIV[x-placement="bottom-start"]>DIV[class="el-scrollbar"],DIV>DIV[class="el-select-dropdown__wrap el-scrollbar__wrap"],DIV[style="margin-bottom: -17px; margin-right: -17px;"]>UL[class="el-scrollbar__view el-select-dropdown__list"]>LI[class="el-select-dropdown__item hover"]').eq(3).click()
        
    }
    