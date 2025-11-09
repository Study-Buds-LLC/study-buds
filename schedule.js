const form = document.getElementById("addForm");
const tableBody = document.getElementById("scheduleBody");
const clearBtn = document.getElementById("clearBtn");

let schedule = JSON.parse(localStorage.getItem("studyTimetable")) || [];

// Render timetable
function renderTable() {
  tableBody.innerHTML = "";

  // Collect unique times
  const times = [...new Set(schedule.map(item => item.time))].sort();

  times.forEach(time => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    timeCell.textContent = time;
    row.appendChild(timeCell);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    days.forEach(day => {
      const cell = document.createElement("td");
      const found = schedule.find(item => item.time === time && item.day === day);
      if (found) {
        cell.innerHTML = `<div class="subject">${found.subject}</div>`;
      }
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const time = document.getElementById("time").value;
  const day = document.getElementById("day").value;
  const subject = document.getElementById("subject").value.trim();

  if (!time || !day || !subject) return;

  schedule.push({ time, day, subject });
  localStorage.setItem("studyTimetable", JSON.stringify(schedule));
  renderTable();
  form.reset();
});

clearBtn.addEventListener("click", () => {
  if (confirm("Clear all schedule data?")) {
    schedule = [];
    localStorage.removeItem("studyTimetable");
    renderTable();
  }
});

renderTable();
