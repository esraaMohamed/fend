/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = document.getElementsByTagName("section");
const headers = document.getElementsByTagName("h2");
const sectionNames = Array.from(headers).map((header) => header.textContent);
const navigationList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const isScrolledIntoView = (element) => {
  const { top, bottom, left, right } = element.getBoundingClientRect();
  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const checkSectionInView = () => {
  const anchors = document.querySelectorAll("a");
  Array.from(sections).map((section) => {
    const header = section.querySelector("h2");
    const anchor = Array.from(anchors).filter(
      (a) => a.textContent === section.getAttribute("data-nav")
    );
    isScrolledIntoView(header)
      ? console.log(section.id, "In the viewport!")
      : console.log(section.id, "Not in the viewport... whomp whomp");
    if (isScrolledIntoView(header)) {
      section.classList.toggle("your-active-class");
      anchor[0].classList.add("highlighted");
    } else {
      section.classList.remove("your-active-class");
      anchor[0].classList.remove("highlighted");
    }
  });
};

const throttle = (func, wait = 100) => {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// Build menu

const navigationFragment = document.createDocumentFragment();

for (let i = 0; i < sectionNames.length; i++) {
  const sectionLink = sectionNames[i];
  const li = document.createElement("li");
  const anchorElement = document.createElement("a");
  li.classList.add("navbar__menu");
  anchorElement.classList.add("navbar__menu");
  anchorElement.classList.add("menu__link");

  anchorElement.setAttribute("href", `#${sectionLink}`);
  anchorElement.setAttribute("id", sectionLink);
  anchorElement.textContent = sectionLink;
  li.appendChild(anchorElement);
  navigationFragment.appendChild(li);
}

/**
 * End Main Functions
 * Begin Events
 *
 */

document.getElementById("top").addEventListener("click", () => {
  scrollToTop();
});

document.addEventListener(
  "scroll",
  throttle(() => {
    checkSectionInView();
  }, 500)
);

navigationList.appendChild(navigationFragment);

// Scroll to section on link click
// Set sections as active
navigationList.addEventListener("click", (event) => {
  const allSections = document.getElementsByTagName("section");
  Array.from(allSections).map((section) =>
    section.classList.toggle("your-active-class", false)
  );
  const activeSection = document.getElementById(
    event.target.id.split(" ").join("").toLowerCase()
  );
  activeSection.scrollIntoView(true);
  activeSection.classList.toggle("your-active-class", true);
});
