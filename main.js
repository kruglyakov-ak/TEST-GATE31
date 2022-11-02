const fetchData = async () => {
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
  );
  return await data.json();
};

const switcherChangeHandler = ({ target }) => {
  const item = target.parentElement;
  item.classList.toggle("item--active");
};

const itemTemplate = document
  .querySelector("#item")
  .content.querySelector(".item");

const createItem = (data) => {
  const item = itemTemplate.cloneNode(true);
  const title = item.querySelector(".title");
  const body = item.querySelector(".body");
  const switcher = item.querySelector(".switcher");
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
