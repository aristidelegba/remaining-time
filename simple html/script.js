const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const titleEl = document.getElementById('title')
const inputEl = document.getElementById('date-input')
const digitsEl = document.getElementById('digits')


let future = localStorage.getItem('future') || "1 Jan 2051"
titleEl.innerText = title(future)
inputEl.value = future
inputEl.addEventListener('change', (e) => {
    rotate(digitsEl)
    future = e.target.value
    titleEl.innerText = title(e.target.value)
    localStorage.setItem('future', future)
})


function countDown() {
    const futureDate = new Date(future)
    const nowDate = new Date()
    const totalSeconds = (futureDate - nowDate) / 1000
    const days = Math.round(totalSeconds / 3600 / 24)
    const hours = Math.floor(totalSeconds / 3600) % 24
    const minutes = Math.floor(totalSeconds / 60) % 60
    const seconds = Math.floor(totalSeconds) % 60

    daysEl.innerHTML = days
    hoursEl.innerHTML = hours
    minutesEl.innerHTML = minutes
    secondsEl.innerHTML = seconds
}

function title(future) {
    if (new Date(future) > new Date()) {
        return "Remaining time before " + future

    } else {
        return "Passed time since " + future
    }
}
function rotate(el) {
    el.classList.add("rotate")
    setTimeout(() => {
        el.classList.remove("rotate")
    }, 1000)

}


setInterval(() => {
    countDown()
}, 1000)