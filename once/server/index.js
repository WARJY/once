const writeFile = function (json) {
    let caseCode = ""
    json.forEach((action, index) => {
        if (action.EVENT === "VISIT") return caseCode += `
        cy.viewport(${action.viewPort.width}, ${action.viewPort.height})
        cy.visit("${action.visitUrl}")
        cy.wait(1000)
        `

        let query = ""
        if(action.query) query = `cy.get('${action.query.query}').eq(${action.query.nth})`

        if (action.EVENT === "HOVER") caseCode += `
        ${query}.invoke('mouseover')
        `

        if (action.EVENT === "CLICK") caseCode += `
        cy.get("body").click(${action.position.x}, ${action.position.y})
        cy.wait(500)
        `

        if (action.EVENT === "SCROLL") caseCode += `
        cy.scrollTo(${parseInt(action.scroll.x)}, ${parseInt(action.scroll.y)})
        cy.wait(500)
        `

        if (action.EVENT === "INPUT") caseCode += `
        ${query}.type("${action.inputValue}")
        `

        if (action.EVENT === "ASSERT" && action.assertUrl) caseCode += `
        cy.location().should((location) => {
            expect(location.pathname).to.match(${action.assertUrl})
        })
        `

        if (action.EVENT === "ASSERT" && action.assertValue) caseCode += `
        ${query}.should(($div) => {
            expect($div.get(0).innerText).to.eq('${action.assertValue}')
        })
        `
    })


    caseCode = `
    export default function(){
        ${caseCode}
    }
    `
    return caseCode
}

module.exports = {
    writeFile
}