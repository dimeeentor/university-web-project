// Main Contributor: Dmytro HONCHARENKO
document.addEventListener("DOMContentLoaded", function () {
  const closeModals = document.querySelectorAll(".close-modal")
  const dialogs = document.querySelectorAll("dialog")
  const showBtns = document.querySelectorAll(".show-details")

  showBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      showDialog(index)
    })
  })

  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeDialog(dialog)
      }
    })

    dialog.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        closeDialog(dialog)
      }
    })
  })

  closeModals.forEach((closeModal) => {
    closeModal.addEventListener("click", () => {
      closeModal.parentElement.close()
      document.body.style.overflow = "auto"
    })
  })

  function showDialog(index) {
    dialogs[index].showModal()
  }

  function closeDialog(dialog) {
    dialog.close()
  }
})
