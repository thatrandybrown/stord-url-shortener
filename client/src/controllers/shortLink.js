const apiCall = (endpoint, config) =>
  fetch(`http://api.${window.location.host}/${endpoint}`, config);

export const getShortLink = (id) =>
  apiCall(`url/${id}`, { redirect: "manual" });
export const postShortLink = (url) =>
  apiCall("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
