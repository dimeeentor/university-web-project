const films = document.querySelector(".film")
const closeModals = document.querySelectorAll(".close-modal")
const dialogs = document.querySelectorAll("dialog")
const showBtns = document.querySelectorAll(".show-details")

showBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    dialogs[index].showModal()
    document.body.style.overflow = "hidden"
  })
})

dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close()
      document.body.style.overflow = "auto"
    }
  })
})

dialogs.forEach((dialog) => {
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dialog.close()
      document.body.style.overflow = "auto"
    }
  })
})

closeModals.forEach((closeModal) => {
  closeModal.addEventListener("click", () => {
    closeModal.parentElement.close()
    document.body.style.overflow = "auto"
  })
})
