const fetchData = async () => {
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
  );
  return await data.json();
};

const itemTemplate = document
  .querySelector("#item")
  .content.querySelector(".item");

const createItem = (data) => {
  const item = itemTemplate.cloneNode(true);

  if (data.title) {
    item.querySelector(".title").textContent = data.title;
  }

  if (data.body) {
    item.querySelector(".body").textContent = data.body;
  }

  return item;
};

fetchData().then((data) => {
  data.map((item) => document.querySelector('.main').appendChild(createItem(item)));
});
