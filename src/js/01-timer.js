import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timerDateInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const refDays = document.querySelector("[data-days]");
const refHours = document.querySelector("[data-hours]");
const refMinutes = document.querySelector("[data-minutes]");
const refSeconds = document.querySelector("[data-seconds]");
let userSelectedDate;
startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.show({
      message: "Please choose a date in the future"
});
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    };
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  startBtn.disabled = true;
  timerDateInput.disabled = true;
  const intervalId = setInterval(() => {
    if (userSelectedDate - Date.now() >= 0) {
      const dataObj = convertMs(userSelectedDate - Date.now());
      refDays.textContent = addLeadingZero(dataObj.days);
      refHours.textContent = addLeadingZero(dataObj.hours);
      refMinutes.textContent = addLeadingZero(dataObj.minutes);
      refSeconds.textContent = addLeadingZero(dataObj.seconds);
    } else {
      clearInterval(intervalId);
      timerDateInput.disabled = false;
    }
  }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return value.toString().padStart(2, "0"); 
}