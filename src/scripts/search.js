document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const suggestionList = document.getElementById("suggestions");

  if (!input || !suggestionList) return;

  let currentSelection = -1;
  let suggestions = [];

  input.addEventListener("input", async () => {
    const query = input.value.trim();
    suggestionList.innerHTML = "";
    currentSelection = -1;

    if (query.length < 1) {
      suggestionList.classList.add("hidden");
      return;
    }

    try {
      const res = await fetch(`/search?q=${encodeURIComponent(query)}`); // parse to urlEncoded
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        suggestionList.classList.add("hidden");
        return;
      }

      suggestions = data;
      suggestionList.classList.remove("hidden");

      data.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.item_name;
        li.className =
          "px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors";

        li.addEventListener("click", () => {
          input.value = item.item_name;
          suggestionList.classList.add("hidden");
          window.location.href = `/components/${item.id}`;
        });

        suggestionList.appendChild(li);
      });
    } catch (error) {
      console.error("Search error:", error);
    }
  });

  // keyboard support
  input.addEventListener("keydown", (e) => {
    const items = suggestionList.querySelectorAll("li");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      currentSelection = (currentSelection + 1) % items.length;
      highlightSelection(items);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      currentSelection = (currentSelection - 1 + items.length) % items.length;
      highlightSelection(items);
      e.preventDefault();
    } else if (e.key === "Enter" && currentSelection >= 0) {
      e.preventDefault();
      const selected = suggestions[currentSelection];
      input.value = selected.item_name;
      suggestionList.classList.add("hidden");
      window.location.href = `/components/${selected.id}`; // redirect
    }
  });

  function highlightSelection(items) {
    items.forEach((el, i) => {
      el.classList.toggle("bg-[#1d4942]", i === currentSelection);
      el.classList.toggle("text-[#fff8da]", i === currentSelection);
    });
  }
});
