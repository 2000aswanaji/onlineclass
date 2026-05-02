function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove("hidden");
  } else {
    console.error(`Page not found.`);
  }
}
function register() {
  var inputs = document.querySelectorAll("input");
  var required = true;
  inputs.forEach(function (item) {
    item.style.borderColor = "";
    var error = document.getElementById(item.id + "-Error");
    if (error) error.style.display = "none";
  });

  document.getElementById("valid-Error").className = "valid-message";
  document.getElementById("digit-error").className = "valid-message";
  inputs.forEach(function (item) {
    if (item.value.trim() === "") {
      required = false;
      var error = document.getElementById(item.id + "-Error");
      if (error) {
        error.style.display = "block";
        item.style.borderColor = "red";
      }
    }
  });
  var valid_phone = document.getElementById("phone");
  var phoneValue = valid_phone.value;
  if (phoneValue !== "") {
    if (phoneValue.length !== 10) {
      required = false;
      document.getElementById("valid-Error").className = "fail_valid";
      valid_phone.style.borderColor = "red";
    } else {
      var firstDigit = phoneValue.charAt(0);
      if (!["9", "8", "6"].includes(firstDigit)) {
        required = false;
        document.getElementById("digit-error").className = "first_error";
        valid_phone.style.borderColor = "red";
      }
    }
  }
  const name = document.getElementById("regname").value;
  const email = document.getElementById("regemail").value;
  const pass = document.getElementById("regpasd").value;
  const cnfpass = document.getElementById("cnfpasd").value;
  const phone = document.getElementById("phone").value;
  if (pass.length < 6) {
    const pass2 = document.getElementById("regpasd");
    const min = document.getElementById("min-Error");
    min.style.display = "block";
    pass2.style.borderColor = "red";
  }
  if (pass === cnfpass) {
    if (email && pass) {
      localStorage.setItem("username", name);
      localStorage.setItem("useremail", email);
      localStorage.setItem("userpass", pass);
      localStorage.setItem("userphone", phone);
      showPage("login-page");
    }
  } else {
    const pss_error = document.getElementById("password-Error");
    const error_pass = document.getElementById("cnfpasd");
    pss_error.style.display = "block";
    error_pass.style.borderColor = "red";
  }
}

function login() {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  const savedEmail = localStorage.getItem("useremail");
  const savedPass = localStorage.getItem("userpass");
  const savedname = localStorage.getItem("username");

  if (email === savedEmail && pass === savedPass) {
    document.getElementById("welcome-msg").innerText = "Hello, " + savedname;
    showPage("booking-page");
  } else {
    const inv_error = document.getElementById("invalid-Error");
    inv_error.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  confirmBooking();
});
function confirmBooking() {
  const selectbuttons = document.querySelectorAll(".select-table");
  const bookcnfbtn = document.querySelector(".book-button");

  var table = null;

  selectbuttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (table) {
        table.classList.remove("is-selected");
      }
      table = e.target.parentElement;
      table.classList.add("is-selected");
    });
  });
  bookcnfbtn.addEventListener("click", () => {
    if (table) {
      table.classList.remove("is-selected");
      table.classList.add("is-booked");

      const tablename = table.querySelector("#table-card");
      const btn = table.querySelector("#booked-tag");

      if (btn) {
        btn.innerText = "Is Booked";
        const table_store = tablename.innerText.trim();

        localStorage.setItem("table_no", table_store);
      }

      const smsg = document.getElementById("success");
      smsg.style.color = "green";
      smsg.style.display = "block";

      table = null;
    } else {
      const esmg = document.getElementById("error-prompt");
      esmg.style.color = "red";
      esmg.style.display = "block";
      setTimeout(() => {
        esmg.style.display = "none";
      }, 3000);
    }
  });
}
function display() {
  const showname = localStorage.getItem("username");
  const showtno = localStorage.getItem("table_no");
  document.getElementById("welcome-msg2").innerText =
    "Hi, " + showname + " " + showtno + " is waiting for you";
  showPage("date-page");
}
function finalize() {
  const date = document.getElementById("book-date").value;
  const time = document.getElementById("book-time").value;
  const valid_date = document.getElementById("book-date");
  const valid_time = document.getElementById("book-time");
  const date_error = document.getElementById("date-Error");
  const time_error = document.getElementById("time-Error");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate() - 1;
  const today = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  if (date !== today) {
    if (date && time) {
      const showname = localStorage.getItem("username");
      const showtno = localStorage.getItem("table_no");
      document.getElementById("disp_name").innerText = showname;
      document.getElementById("disp_date").innerText = date;
      document.getElementById("disp_time").innerText = time;
      document.getElementById("disp_table").innerText = showtno;
      showPage("details-page");
    } else if (!date && !time) {
      if (!date) {
        date_error.style.display = "block";
        valid_date.style.borderColor = "red";
      }
      if (!time) {
        time_error.style.display = "block";
        valid_time.style.borderColor = "red";
      }
    } else {
      showPage("date-page");
    }
  } else {
    showPage("errorpage");
  }
}

function logout() {
  showPage("login-page");
}
