const API_URL = "http://localhost:5000";

async function fetchCoffees() {

  const response = await fetch(`${API_URL}/coffees`);

  const coffees = await response.json();

  const coffeeList = document.getElementById("coffeeList");

  coffeeList.innerHTML = "";

  coffees.forEach(coffee => {

    coffeeList.innerHTML += `
      <div class="coffee-card">
        <h2>${coffee.name}</h2>

        <p>Votes: ${coffee.votes}</p>

        <button onclick="voteCoffee('${coffee._id}')">
          Vote 👍
        </button>
      </div>
    `;
  });
}

async function voteCoffee(id) {

  await fetch(`${API_URL}/vote/${id}`, {
    method: "POST"
  });

  fetchCoffees();
}

fetchCoffees();
