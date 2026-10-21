// Drop this file into the Netlify frontend and load it BEFORE your main script:
//   <script>window.API_BASE = "https://YOUR-BACKEND-URL";</script>
//   <script src="api.js"></script>
// Then call CanteenAPI.* instead of reading/writing demo data in localStorage.
(function () {
  const BASE = (window.API_BASE || "http://localhost:8080").replace(/\/$/, "");

  async function call(path, options = {}) {
    const res = await fetch(BASE + "/api" + path, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) {
      let msg = "Request failed (" + res.status + ")";
      try { const d = await res.json(); msg = d.message || d.error || msg; } catch (_) {}
      throw new Error(msg);
    }
    return res.json();
  }

  window.CanteenAPI = {
    // -> [{id, name, category, price, veg, stock, emoji}]
    getMenu: () => call("/menu"),

    // cart: [{id, quantity}]  -> order {token, status, total, pickupSlot, paymentMethod, ...}
    placeOrder: ({ customer, pickupSlot, paymentMethod, cart }) =>
      call("/orders", {
        method: "POST",
        body: JSON.stringify({ customer, pickupSlot, paymentMethod, items: cart }),
      }),

    getOrder: (token) => call("/orders/" + token),          // poll this for live tracking
    getOrders: () => call("/orders"),                        // kitchen / admin screen
    setStatus: (token, status) =>                            // PLACED | PREPARING | READY
      call("/orders/" + token + "/status", { method: "PATCH", body: JSON.stringify({ status }) }),
    addMenuItem: (item) => call("/menu", { method: "POST", body: JSON.stringify(item) }),
  };
})();
