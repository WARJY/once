
    export default function(){
        
        cy.visit("http://127.0.0.1:8080/#/")
        
        cy.get("DIV#app>DIV.home>DIV.hello>H1").click()
        
        cy.get("DIV#app>DIV.home>DIV.hello>H1").click()
        
        let a = cy.get("DIV#app>DIV#nav>A")
        console.log(a)

        // cy.get("DIV#app>DIV#nav>A").click()
        
        cy.get("DIV#app>DIV#nav>A.router-link-exact-active router-link-active").click()
        
        cy.get("DIV#app>DIV.home>DIV.el-input>INPUT.el-input__inner").click()
        
        cy.get("DIV#app>DIV.home>DIV.el-input>INPUT.el-input__inner").type("123456")
        
    }
    