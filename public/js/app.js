console.log("Client side js file loaded.");



fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

// fetch("http://localhost:3000/weather?address=Cavite").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const errorMessage = document.querySelector("#error");
const searchOutput = document.querySelector("#search-output");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("testing!");
  errorMessage.textContent = "Loading....";
  searchOutput.textContent = "";

  fetch(`/weather?address=${searchInput.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          errorMessage.textContent = data.error;
        } else {
          errorMessage.textContent = "";
          
          searchOutput.textContent = `${data.location}. ${data.forecast}`;
          console.log(searchInput.value);
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});
