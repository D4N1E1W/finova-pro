const BACK_TO_TOP_BUTTON = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  window.scrollY > 300
    ? BACK_TO_TOP_BUTTON.classList.remove("hidden")
    : BACK_TO_TOP_BUTTON.classList.add("hidden");
});

BACK_TO_TOP_BUTTON.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const SHOW_NAV = document.querySelector("#show-nav"),
  HIDE_NAV = document.querySelector("#navHide"),
  NAV_BAR = document.querySelector("#navbar"),
  NAV_OVERLAY = document.querySelector("#overlay");

function HANDLE_HIDE_NAV() {
  NAV_BAR.classList.remove("!right-0");
  NAV_OVERLAY.classList.add("hidden");
  SHOW_NAV.classList.remove("opacity-0");
  document.documentElement.classList.remove("overflow-hidden");
}

function HANDLE_NAV_OPEN() {
  NAV_BAR.classList.toggle("!right-0");
  NAV_OVERLAY.classList.toggle("hidden");
  SHOW_NAV.classList.toggle("opacity-0");
  document.documentElement.classList.toggle("overflow-hidden");
}

function HANDLE_START_COUNT() {
  const getNextThursday = () => {
    const now = new Date();
    const nextThursday = new Date(now);
    nextThursday.setDate(now.getDate() + ((4 + 7 - now.getDay()) % 7));
    nextThursday.setHours(12, 0, 0, 0);
    if (now > nextThursday) {
      nextThursday.setDate(nextThursday.getDate() + 7);
    }
    return nextThursday;
  };

  let targetDate = getNextThursday();

  const updateCountdown = () => {
    let now = new Date().getTime();
    let timeLeft = targetDate - now;

    if (timeLeft >= 0) {
      let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      document.querySelectorAll(".timer-container").forEach((e) => {
        e.querySelector(".Days").textContent = days.toString().padStart(2, "0");
        e.querySelector(".Hours").textContent = hours.toString().padStart(2, "0");
        e.querySelector(".Minutes").textContent = minutes.toString().padStart(2, "0");
        e.querySelector(".Seconds").textContent = seconds.toString().padStart(2, "0");
      });
    } else {
      targetDate = getNextThursday(); // Reset to next Thursday
    }
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

HANDLE_START_COUNT();

let date = new Date().getFullYear();
document.querySelector("#footer_year").innerHTML = date;

const FAQ_LIST = [
  {
    title: "What is FINOVA?",
    content: "FINOVA is a crypto research group offering trade signals and courses to help you achieve financial freedom.",
  },
  {
    title: "How do I join?",
    content: "To join FINOVA, you can visit our website and sign up for our membership plans.",
  },
  {
    title: "What if I'm new to crypto trading?",
    content: "If you're new to crypto trading, FINOVA provides educational resources and beginner-friendly guidance.",
  },
  {
    title: "Is there a guarantee?",
    content: "While FINOVA strives to provide valuable insights, please note that all trading involves risk.",
  },
];

const createAccordionItem = (item, index) => `
  <div class="accordion-item w-full">
      <div class="border-box relative">
          <button class="accordion-header w-full pt-4 pb-4 pr-5 pl-5 rounded-2xl bg-accordion-button border-[#292725] border flex justify-between items-center transition-all duration-300 ease-linear after:absolute after:inset-0 relative after:bg-orange-gradient after:opacity-0 after:duration-300 after:ease-linear after:rounded-2xl after:z-0 ${index === 0 ? "after:!opacity-100" : ""}">
              <p class="text-lg font-bold text-start text-white relative z-10">${item.title}</p>
              <span class="transform transition-transform relative z-10">
                  <svg class="arrow transform transition-transform duration-300 ${index === 0 ? "rotate-180" : ""}" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="arrow-path" d="M13 0.988281L7 6.98828L1 0.988281" stroke="${index === 0 ? "#FFFFFF" : "#AA832F"}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </span>
          </button>
      </div>
      <div class="accordion-body ${index === 0 ? "max-h-[132px] open" : "max-h-0"} overflow-hidden transition-max-height">
          <p class="sm:text-lg text-base font-normal text-white pt-4 pb-4 pl-5 pr-5 max-sm:pr-12">${item.content}</p>
      </div>
  </div>
`;

const FAQ_CONTAINER = document.getElementById("accordion");
if (FAQ_CONTAINER) {
  FAQ_CONTAINER.innerHTML = FAQ_LIST.map(createAccordionItem).join("");
  const headers = FAQ_CONTAINER.querySelectorAll(".accordion-header");
  const bodies = FAQ_CONTAINER.querySelectorAll(".accordion-body");
  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      const isOpen = bodies[index].classList.contains("open");
      headers.forEach((otherHeader, otherIndex) => {
        if (otherIndex !== index) {
          otherHeader.classList.remove("after:!opacity-100");
          otherHeader.querySelector(".arrow").classList.remove("rotate-180");
          otherHeader.querySelector(".arrow-path").setAttribute("stroke", "#AA832F");
          bodies[otherIndex].classList.add("max-h-0");
          bodies[otherIndex].classList.remove("max-h-[132px]", "open");
        }
      });
      if (isOpen) {
        header.classList.remove("after:!opacity-100");
        header.querySelector(".arrow").classList.remove("rotate-180");
        header.querySelector(".arrow-path").setAttribute("stroke", "#AA832F");
        bodies[index].classList.add("max-h-0");
        bodies[index].classList.remove("max-h-[132px]", "open");
      } else {
        header.classList.add("after:!opacity-100");
        header.querySelector(".arrow").classList.add("rotate-180");
        header.querySelector(".arrow-path").setAttribute("stroke", "#FFFFFF");
        bodies[index].classList.add("max-h-[132px]", "open");
        bodies[index].classList.remove("max-h-0");
      }
    });
  });
} else {
  console.error("Accordion container not found");
}

document.getElementById("addControlsBtn").addEventListener("click", function () {
  const iframe = document.getElementById("youtube-iframe");
  document.getElementById("addControlsBtn").style.display = "none";
  document.getElementById("thumbnail").style.display = "none";
  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: 'command',
      func: 'playVideo',
      args: []
    }),
    '*'
  );
});

window.addEventListener("message", function (event) {
  const message = event.data;
  if (message.event === "infoDelivery" && message.info && message.info.playerState === 0) {
    document.getElementById("addControlsBtn").style.display = "block";
    document.getElementById("thumbnail").style.display = "block";
  }
});
