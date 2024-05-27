document.addEventListener("DOMContentLoaded", () => {
  const min = 85;

  const max = 134;

  const delay1 = 4300;

  const delay2 = 3000;

  const delay3 = 2000;

  const delay4 = 3000;

  const tonToUsd = 6.71;

  const formBtn = document.querySelector(".form__btn"),
    form = document.querySelector(".form"),
    check = document.querySelector(".check"),
    result = document.querySelector(".result"),
    inputBlock = document.querySelector(".form__input"),
    input = document.querySelector(".form__input input"),
    label = document.querySelector(".form__input label"),
    tonCount = document.querySelector(".result__count span"),
    spin = document.querySelector(".spin"),
    loading = document.querySelector(".loading"),
    usdPrice = document.getElementById("usd_price"),
    loadingText = document.querySelector(".loading__text");

  const username = window.localStorage.getItem("username");
  const toncount = window.localStorage.getItem("toncount");

  form.classList.remove("hide");

  if (username && toncount) {
    form.classList.add("hide");
    result.classList.add("active");
    input.value = username;
    tonCount.innerHTML = toncount;
  }

  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value === "") {
      inputBlock.classList.add("error");
      label.textContent = "Telegram username or phone number";
      input.focus();
    } else if (input.value.length < 3) {
      inputBlock.classList.add("error");
      label.textContent = "Telegram username or phone number";
      input.focus();
    } else {
      form.classList.add("hide");
      loading.classList.add("active");
      spin.play();
      loadingText.innerHTML = "Database query...";
      setTimeout(() => {
        loadingText.innerHTML = "User verification...";
        setTimeout(() => {
          loadingText.innerHTML =
            "Checking the possibility of accruing tokens...";
          setTimeout(() => {
            loading.classList.remove("active");
            check.classList.add("active");
            check.play();
            setTimeout(() => {
              check.classList.remove("active");
              result.classList.add("active");
              //->>> save toncount to variable
              const toncount = getRandomArbitrary(min, max);
              //->>> set ton count value
              tonCount.innerHTML = toncount;
              //->>> set usd Price
              // usdPrice.innerHTML = toncount * tonToUsd;
              //->>> save user name to local storage
              window.localStorage.setItem("username", input.value);
              //->>> save ton count value to local storage
              window.localStorage.setItem("toncount", tonCount.innerHTML);
            }, delay4);
          }, delay3);
        }, delay2);
      }, delay1);
    }
  });

  const burger = document.querySelector(".header__burger"),
    headerMenu = document.querySelector(".header__nav");

  burger.addEventListener("click", (e) => {
    e.preventDefault();
    headerMenu.classList.toggle("active");
    burger.classList.toggle("active");
  });

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
});
