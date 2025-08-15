const events = [
  { name: "Tech Talk", date: "2025-09-10", venue: "Auditorium", slots: 3 },
  { name: "Career Fair", date: "2025-09-15", venue: "Library", slots: 2 },
  { name: "Cultural Day", date: "2025-09-20", venue: "Field", slots: 1 },
  { name: "Startup Pitch", date: "2025-09-25", venue: "Lecture Hall", slots: 0 },
  { name: "Alumni Meet", date: "2025-10-01", venue: "Cafeteria", slots: 5 },
];

// Load from localStorage if exists
let storedEvents = JSON.parse(localStorage.getItem("events")) || events;

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(storedEvents));
}

function populateTable() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  const select = document.getElementById("eventSelect");
  select.innerHTML = "";

  storedEvents.forEach((event, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${event.name}</td>
      <td>${event.date}</td>
      <td>${event.venue}</td>
      <td id="slots-${index}">${event.slots}</td>
      <td>
        <button onclick="registerEvent(${index})" ${event.slots === 0 ? 'disabled' : ''}>
          ${event.slots === 0 ? "Fully Booked" : "Register"}
        </button>
      </td>
    `;

    tbody.appendChild(row);

    // Add to dropdown if slots available
    if (event.slots > 0) {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = event.name;
      select.appendChild(option);
    }
  });
}

function registerEvent(index) {
  if (storedEvents[index].slots > 0) {
    storedEvents[index].slots -= 1;
    alert("Successfully registered!");
    saveEvents();
    populateTable();
  }
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const eventIndex = document.getElementById("eventSelect").value;

  if (!name || !studentId || !/^[A-Z]{2}\d{4}$/.test(studentId)) {
    alert("Please fill all fields correctly.");
    return;
  }

  storedEvents[eventIndex].slots -= 1;
  saveEvents();
  populateTable();

  document.getElementById("formMessage").innerHTML =
    `<p><strong>Registered:</strong> ${name} (${studentId}) for ${storedEvents[eventIndex].name}</p>`;
  document.getElementById("bookingForm").reset();
});

window.onload = populateTable;
