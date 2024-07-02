// INPUTS
const birthDay = document.getElementById("birth-day");
const monthOfBirth = document.getElementById("birth-month");
const yearOfBirth = document.getElementById("birth-year");
const submitButton = document.getElementById("btn");
// OUTPUTS
const yearText = document.getElementById("years");
const monthText = document.getElementById("months");
const dayText = document.getElementById("days");
const now = new Date();
let d3, m3, y3;

submitButton.onclick = startCalculations;

function startCalculations() {
  isDataValid();
  if (!isDataValid()) return;
  calculateAge();
  update();
}

function isDataValid() {
  if (
    !birthDay.value.length ||
    !monthOfBirth.value.length ||
    !yearOfBirth.value.length ||
    isNaN(birthDay.value) ||
    isNaN(monthOfBirth.value) ||
    isNaN(yearOfBirth.value) ||
    parseInt(birthDay.value) >
      getDaysInMonth(yearOfBirth.value, monthOfBirth.value) ||
    parseInt(monthOfBirth.value) > 12 ||
    parseInt(yearOfBirth.value) > now.getFullYear()
  ) {
    document.getElementById("error").innerHTML = "* Enter a valid date";
    return false;
  }
  document.getElementById("error").innerHTML = "";
  return true;
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate(); // how many days in that month ?
}

function calculateAge() {
  const birthDate = new Date(
    `${monthOfBirth.value}/${birthDay.value}/${yearOfBirth.value}`
  );

  const d1 = birthDate.getDate();
  const m1 = birthDate.getMonth() + 1;
  const y1 = birthDate.getFullYear();

  let today = new Date();
  let currentDay = today.getDate();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  // year calculations
  y3 = currentYear - y1;
  if (currentMonth >= m1) {
    m3 = currentMonth - m1;
  } else {
    y3--;
    m3 = 12 + (currentMonth - m1);
  }

  // day & month calculations
  if (currentDay >= d1) {
    d3 = currentDay - d1;
  } else {
    m3--;
    d3 = getDaysInMonth(y1, m1) + currentDay - d1;
  }
}

function update() {
  yearText.innerHTML = y3;
  monthText.innerHTML = m3.toString().padStart(2,0);
  dayText.innerHTML = d3.toString().padStart(2,0);
}
