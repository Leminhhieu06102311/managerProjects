function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    let currentNumber = startNumber
    const interval = window.setInterval(updateNumber, 17)
    function updateNumber() {
      if (currentNumber >= finalNumber) {
        clearInterval(interval)
      } else {
        let inc = Math.ceil(finalNumber / (duration / 17))
        if (currentNumber + inc > finalNumber) {
          currentNumber = finalNumber
          clearInterval(interval)
        } else {
          currentNumber += inc
        }
        callback(currentNumber)
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    animateNumber(70000, 2000, 0, function (number) {
      const formattedNumber = number.toLocaleString()
      document.querySelectorAll('.overview__total')[0].firstElementChild.innerText = formattedNumber + ' đ'
    })
    
    animateNumber(30, 2000, 0, function (number) {
      const formattedNumber = number.toLocaleString()
      document.querySelectorAll('.overview__total')[1].firstElementChild.innerText = formattedNumber + ' %'

    })
    
    animateNumber(1500, 2000, 0, function (number) {
      const formattedNumber = number.toLocaleString()
      document.querySelectorAll('.overview__total')[2].firstElementChild.innerText = formattedNumber + ' đ'

    })
    animateNumber(30000, 2000, 0, function (number) {
        const formattedNumber = number.toLocaleString()
        document.querySelectorAll('.overview__total')[3].firstElementChild.innerText = formattedNumber + ' đ'
  
      })
  })