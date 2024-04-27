// Main Contributor: Dmytro HONCHARENKO
document.addEventListener("DOMContentLoaded", function () {
  // Get the current date and time
  const currentDate = new Date()
  const currentHour = currentDate.getHours()
  const currentMinute = currentDate.getMinutes()

  // Format the current time
  const formattedTime = `${currentHour}:${currentMinute}`

  // Create and style the time element
  const timeElement = document.createElement("p")
  timeElement.textContent = `${currentDate.toDateString()} ${formattedTime}`
  timeElement.style.cssText =
    "text-align: center; padding: 24px 0; user-select: none; color: #666;"

  // Append the time element to the footer
  const footer = document.querySelector(".footer")
  footer.appendChild(timeElement)
})
