document.getElementById("bookingForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    service: formData.get("service")
  };

  const response = await fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  if (result.paymentUrl) {
    document.getElementById("confirmation").style.display = "block";
    window.location.href = result.paymentUrl;
  }
});
