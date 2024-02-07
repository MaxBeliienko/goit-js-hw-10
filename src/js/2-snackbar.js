import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayValue = document.querySelector("[name='delay']");
const inpFulfilled = document.querySelector("[value='fulfilled']");
const inpRejected = document.querySelector("[value='rejected']");
const btnSubmit = document.querySelector("button");


btnSubmit.addEventListener("click", onCreatePromise);

function onCreatePromise(e) {
    e.preventDefault();
    const delay = delayValue.value;
    if (delayValue.value > 0 && (inpFulfilled.checked || inpRejected.checked)) {
        const newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (inpFulfilled.checked) {
                    resolve(iziToast.show({
                    message: `✅ Fulfilled promise in ${delay}ms`
                    }))
                } else {
                    reject(iziToast.show({
                    message: `❌ Rejected promise in ${delay}ms`
                }))
                }
            }, delay)
        })
    };
}
