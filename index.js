window.onload = function () {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.forEach(addUserToTable);
};

document
  .getElementById("registration-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    if (age < 18 || age > 55) {
      alert("Your age must be between 18 and 55 years.");
      return;
    }

    const user = { name, email, password, dob, acceptTerms };
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    addUserToTable(user);

    document.getElementById("registration-form").reset();
  });

function addUserToTable(user) {
  const tableBody = document.querySelector("#user-table tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.acceptTerms}</td>
      `;
  tableBody.appendChild(row);
}
