import { state } from './store'
import { emitter } from 'cutil'

const initModal = function () {
    let modal = document.createElement("div")

    modal.className = "once-modal-0808 hide"

    document.addEventListener("keyup", e => {
        e.stopPropagation()
        if (e.keyCode === 113 && modal.className === "once-modal-0808") emitter.emit("modal-confirm")
    })

    emitter.on("modal", flag => {
        if (flag === true) modal.className = "once-modal-0808"
        if (flag === false) modal.className = "once-modal-0808 hide"
    })

    state.modal = modal
    document.body.appendChild(modal)
}

export default initModal