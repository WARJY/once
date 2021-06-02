const fs = require('fs');
const moment = require('moment');

const writeFile = async function (json) {
    let dateTime = moment().format("YYYY-MM-DD-HH-mm-ss")
    let fileName = `${__dirname}/../../tests/e2e/cases/${dateTime}.js`

    let caseCode = ``
    json.forEach((action, index) => {
        if (action.EVENT === "VISIT") caseCode += `
        cy.visit("${action.visitUrl}")
        `

        let elPath = action.el.elPath
        let query = []
        while (elPath.length > 0) {
            let currentEl = elPath.pop()
            let elClass = currentEl.elClass ? `.${currentEl.elClass}` : ""
            let elId = currentEl.elId ? `#${currentEl.elId}` : ""
            query.push(`${currentEl.tagName}${elClass}${elId}`)
        }
        query = `cy.get("${query.join(">")}")`

        if (action.EVENT === "CLICK") caseCode += `
        ${query}.click()
        `

        if (action.EVENT === "INPUT") caseCode += `
        ${query}.type("${action.inputValue}")
        `
    })

    fs.writeFileSync(fileName, `
    export default function(){
        ${caseCode}
    }
    `)

    console.log("用例生成成功！")

    return Promise.resolve(true)
}

module.exports = {
    writeFile
}

