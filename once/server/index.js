const writeFile = function (json) {
    let caseCode = ""
    json.forEach((action, index) => {
        if (action.EVENT === "VISIT") return caseCode += `
        cy.visit("${action.visitUrl}")
        `

        query = `cy.get('${action.query.queryByAttr.query}').eq(${action.query.queryByAttr.nth})`

        if (action.EVENT === "CLICK") caseCode += `
        ${query}.click()
        `

        if (action.EVENT === "INPUT") caseCode += `
        ${query}.type("${action.inputValue}")
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

