document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("confirmation").style.display = "block";
  window.location.href = "https://twojeplatnosci.pl/pay"; // przykładowy link do płatności
});
