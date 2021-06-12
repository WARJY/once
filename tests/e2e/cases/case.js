
    export default function(){
        
        cy.visit("http://localhost:8080/")
        
        cy.get('html body div#app div.home div.hello h1').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home div.hello h1').eq(0).click({ force: true })
        
        cy.get('html body div#app div.home img').eq(0).invoke('mouseover')
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^(?:\/(?=$))?$/i)
        })
        
        cy.get('html body div#app div.home div.hello h1').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq('Welcome to Your Vue.js App')
        })
        
        cy.get('html body div#app div#nav a').eq(1).invoke('mouseover')
        
        cy.get('html body div#app div#nav a').eq(1).click({ force: true })
        
        cy.get('html body div#app div.about h1').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.about h1').eq(0).click({ force: true })
        
        cy.location().should((location) => {
            expect(location.pathname).to.match(/^\/about(?:\/(?=$))?$/i)
        })
        
        cy.get('html body div#app div.about h1').eq(0).should(($div) => {
            expect($div.get(0).innerText).to.eq('This is an about page')
        })
        
        cy.get('html body div#app div#nav a.router-link-active').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div#nav a.router-link-active').eq(0).click({ force: true })
        
        cy.get('html body div#app div.home div.el-select div.el-input.el-input--suffix input').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-select div.el-input.el-input--suffix input').eq(0).click({ force: true })
        
        cy.get('html body div.el-select-dropdown.el-popper div.el-scrollbar div.el-select-dropdown__wrap.el-scrollbar__wrap ul li.el-select-dropdown__item').eq(0).invoke('mouseover')
        
        cy.get('html body div.el-select-dropdown.el-popper div.el-scrollbar div.el-select-dropdown__wrap.el-scrollbar__wrap ul li.el-select-dropdown__item').eq(0).click({ force: true })
        
        cy.get('html body div#app div.home input').eq(2).invoke('mouseover')
        
        cy.get('html body div#app div.home input').eq(2).click({ force: true })
        
        cy.get('html body div#app div.home input').eq(2).type("1")
        
        cy.get('html body div#app div.home').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home input').eq(2).type("12")
        
        cy.get('html body div#app div.home div.el-checkbox-group label.el-checkbox.is-disabled span.el-checkbox__label').eq(1).invoke('mouseover')
        
        cy.get('html body div#app div.home input').eq(2).type("123")
        
        cy.get('html body div#app div.home div.el-radio-group label.el-radio span.el-radio__label').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-radio-group label.el-radio span.el-radio__label').eq(0).click({ force: true })
        
        cy.get('html body div#app div.home div.el-radio-group label.el-radio span.el-radio__input span').eq(1).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-radio-group label.el-radio span.el-radio__input span').eq(1).click({ force: true })
        
        cy.get('html body div#app div.home div.el-radio-group label.el-radio span.el-radio__label').eq(2).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-radio-group label.el-radio span.el-radio__label').eq(2).click({ force: true })
        
        cy.get('html body div#app div.home div.el-checkbox-group label.el-checkbox span.el-checkbox__label').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-checkbox-group label.el-checkbox span.el-checkbox__label').eq(0).click({ force: true })
        
        cy.get('html body div#app div.home div.el-checkbox-group label.el-checkbox span.el-checkbox__input span').eq(1).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-checkbox-group label.el-checkbox span.el-checkbox__input span').eq(1).click({ force: true })
        
        cy.get('html body div#app div.home div.el-checkbox-group').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-checkbox-group').eq(0).click({ force: true })
        
        cy.get('html body div#app div.home div.el-cascader div.el-input.el-input--suffix input').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-cascader div.el-input.el-input--suffix input').eq(0).click({ force: true })
        
        cy.get('html body div#app div.home div.el-switch.is-checked span').eq(0).invoke('mouseover')
        
        cy.get('html body div#app div.home div.el-switch.is-checked span').eq(0).click({ force: true })
        
        cy.get('html').eq(0).invoke('mouseover')
        
    }
    