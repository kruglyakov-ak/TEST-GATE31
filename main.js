let backendUrl =
  "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);

if (params.get("search")) {
  backendUrl += `&title_like=${params.get("search")}`;
}

const fetchData = async () => {
  const data = await fetch(backendUrl);
  return await data.json();
};

const switcherChangeHandler = ({ target }) => {
  const item = target.parentElement.parentElement;
  const label = target.parentElement;
  item.classList.toggle("item--active");
  label.classList.toggle("item__checkbox--checked");
};

const itemTemplate = document
  .querySelector("#item")
  .content.querySelector(".item");

const createItem = (data) => {
  const item = itemTemplate.cloneNode(true);
  const title = item.querySelector(".item__title");
  const body = item.querySelector(".item__body");
  const switcher = item.querySelector(".item__switcher");
  const isActive = switcher.hasAttribute("checked");

  if (data.title) {
    title.textContent = data.title;
    title.setAttribute("title", data.title);
  }

  if (data.body) {
    body.textContent = data.body;
  }

  if (isActive) {
    item.classList.add("item--active");
  }

  switcher.addEventListener("change", switcherChangeHandler);

  return item;
};

fetchData().then((data) => {
  data.map((item) =>
    document.querySelector(".main").appendChild(createItem(item))
  );
});

const searchForm = document.querySelector(".search-form");

if (params.get("search")) {
  searchForm
    .querySelector(".search-form__input")
    .setAttribute("value", params.get("search"));
}

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (evt.target[0].value) {
    location.replace(`${location.pathname}?search=${evt.target[0].value}`);
  } else {
    location.replace(location.pathname);
  }
});
