const writeFile = function (json) {
    let caseCode = ""
    json.forEach((action, index) => {
        if (action.EVENT === "VISIT") return caseCode += `
        cy.visit("${action.visitUrl}")
        cy.wait(5000)
        `

        query = `cy.get('${action.query.query}').eq(${action.query.nth})`

        // if (action.EVENT === "HOVER") caseCode += `
        // ${query}.invoke('mouseover')
        // `

        if (action.EVENT === "CLICK") caseCode += `
        cy.get("body").click({
            x: ${action.position.x},
            y: ${action.position.y},
        })
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