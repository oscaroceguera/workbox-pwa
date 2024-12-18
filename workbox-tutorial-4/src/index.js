import { Workbox } from "workbox-window";

fetch("https://api.exchangeratesapi.io/latest?access_key=elaccessKEY")
  .then((response) => response.json())
  .then((data) => {
    console.log("🚀 ~ .then ~ data:", data);
    const main = document.querySelector("#main");
    if (!data || !data.rates) {
      main.innerHTML = "There was an error. Please try again.";
      return false;
    }
    let html = "";

    for (const [currency, rate] of Object.entries(data.rates)) {
      html += `<article class="card card-currency">
            <div class="currency">${currency}</div>
            <div class="rate">${rate}</div>
        </article>`;
    }
    main.innerHTML = html;
  });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");

    const updateButton = document.querySelector("#app-update");

    wb.addEventListener("waiting", (event) => {
      updateButton.classList.add("show");
      updateButton.addEventListener("click", () => {
        wb.addEventListener("controlling", (event) => {
          window.location.reload();
        });

        wb.messageSW({ type: "SKIP_WAITING" });
      });
    });

    wb.register();
  });
}
