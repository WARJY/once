
    export default function(){
        
        cy.viewport(1346, 880)
        cy.visit("http://localhost:8080/")
        cy.wait(1000)
        
        cy.get("body").click(541, 352)
        cy.wait(500)
        
        cy.get("body").click(445, 434)
        cy.wait(500)
        
    }
    