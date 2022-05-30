const tagsElement = document.getElementById("tags");
const textarea = document.getElementById("text");

textarea.focus();

function createTags(input) {
  const newTags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  tagsElement.innerHTML = "";

  newTags.forEach((tag) => {
    const newTagElement = document.createElement("span");
    newTagElement.classList.add("tag");
    newTagElement.innerText = tag;
    tagsElement.appendChild(newTagElement);
  });
}

function randomSelect() {
  const highlightTimes = 30; //number of times it highlights the newTagElements before it stops.

  //highlight the tags
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);

    setTimeout(() => {
      removeHighlightTag(randomTag);
    }, 100);
  }, 100);

  //stop the highlight and pick a random tag
  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, 100);
  }, highlightTimes * 100);
}

function pickRandomTag() {
  const selectAllTags = document.querySelectorAll(".tag");
  return selectAllTags[Math.floor(Math.random() * selectAllTags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function removeHighlightTag(tag) {
  tag.classList.remove("highlight");
}

textarea.addEventListener("keyup", (e) => {
    createTags(e.target.value);
  
    if (e.key === "Enter") {
      setTimeout(() => {
        e.target.value = "";
      }, 30);
  
      randomSelect();
    }
  });