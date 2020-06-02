renderTable();
function removeContact(id) {
  let contactList = JSON.parse(localStorage.getItem("contactList"));
  contactList = contactList.filter((item) => item.id != id);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  renderTable();
}

function renderTable() {
  // Get the data from localstorage
  const contactList = JSON.parse(localStorage.getItem("contactList"));

  // If program runs for the first time or the table is not exist
  if (!contactList) {
    localStorage.setItem("contactList", JSON.stringify([]));
    return;
  }

  // Get the existed table-body from html
  //   const tbody2 = $("tbody");

  // Remove the existed table-body form html
  if ($("tbody").length > 0) {
    $("tbody")[0].remove();
  }

  // Get the table from html
  //   const table = document.getElementById("contact_table");

  // Create new table-body
  const tbody = $("<tbody></tbody>");

  // Inject contactList into td, tr tags and apped every one into our tbody
  contactList.map((contact) => {
    const tr = $("<tr></tr>").append(
      `<td>${contact.id}</td>
        <td>${contact.name}</td>
        <td>${contact.lastName}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td>${contact.address}</td>
        <td>${contact.birthday}</td>
        <td>${contact.details}</td>
        <td>
          <button onclick="deleteContact(${contact.id})" class="btn back-red text-moon"> <i class='fa fa-trash'></i></button>
          <button onclick="updateStart(${contact.id})" class="btn back-green text-moon"> <i class='fa fa-edit'></i></button>
        </td>`
    );
    tbody.append(tr);
  });

  // Append our table-body into the table in html
  $("#contact_table").append(tbody);
}

// When click on Add button
function showForm() {
  $("#form").addClass("show");
}

// When form submit
function hideForm() {
  $("#form").removeClass("show");
}

// Form submit listener
$("#contact_form").on("submit", (event) => {
  event.preventDefault();
  // Get contactList from localstorge
  const contactList = JSON.parse(localStorage.getItem("contactList"));
  // Create new contact data obj. from form by FormData constructor function
  const newContact = new FormData(event.target);
  // Create real contact object
  const new_contact = new Object();
  for (item of newContact.entries()) {
    new_contact[item[0]] = item[1];
  }
  // Check if the id existed
  if (contactList.find((item) => item.id == new_contact.id)) {
    Swal.fire({
      title: "Id Existed",
      text: "Your chosen id is already existed choose another id!",
      icon: "warning",
      confirmButtonColor: "#14C2A3",
      confirmButtonText: "Ok",
    });
  } else {
    // Push it into cotact list and updated list into localstorage
    contactList.push(new_contact);
    localStorage.setItem("contactList", JSON.stringify(contactList));
    // Update view of html
    hideForm();
    renderTable();
  }
});

function deleteContact(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#14C2A3",
    cancelButtonColor: "#E82D62",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      removeContact(id);
      Swal.fire({
        title: "Deleted!",
        text: "Your contact had been deleted.",
        icon: "success",
        confirmButtonColor: "#14C2A3",
        confirmButtonText: "Ok",
      });
    }
  });
}

function updateStart(id) {
  console.log(id);
}
