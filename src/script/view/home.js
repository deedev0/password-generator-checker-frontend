import GeneratorsApi from "../data/remote/generators-app.js";

const home = async () => {
  // sample
  // const resultPassword = await GeneratorsApi.generatePassword({
  //   password_length: 10,
  // });
  // const checkPassword = await GeneratorsApi.checkPassword({
  //   password: "admin",
  // });
  // console.log(resultPassword);
  // console.log(checkPassword);

  // state text
  const passwordGenerated = document.getElementById("passwordGenerated");
  const charNumber = document.getElementById("charNumber");
  const strengt = document.getElementById("strength");
  const exposed = document.getElementById("exposed");
  const cracked = document.getElementById("cracked");

  // buttons
  document.getElementById("btnRepeatGenerate").addEventListener("click", () => {
    changeResult();
  });
  document
    .getElementById("btnCopytoClipboard")
    .addEventListener("click", () => {
      console.log(passwordGenerated.innerText);
      navigator.clipboard
        .writeText(passwordGenerated.innerText)
        .then(function () {
          alert("berhasil di copy");
        })
        .catch(function (error) {
          alert("Failed copy text: " + error);
        });
    });

  // inputs
  const charRange = document.getElementById("char");
  const uppercase = document.getElementById("uppercase");
  const lowercase = document.getElementById("lowercase");
  const numbers = document.getElementById("numbers");
  const symbols = document.getElementById("symbols");

  charRange.addEventListener("input", () => {
    charNumber.innerHTML = charRange.value;
  });

  charRange.addEventListener("change", () => {
    charNumber.innerHTML = charRange.value;
    changeResult();
  });

  uppercase.addEventListener("change", () => {
    changeResult();
  });

  lowercase.addEventListener("change", () => {
    changeResult();
  });

  numbers.addEventListener("change", () => {
    changeResult();
  });

  symbols.addEventListener("change", () => {
    changeResult();
  });

  const changeResult = async () => {
    const charRangeValue = Number(charRange.value);
    const uppercaseValue = uppercase.checked;
    const lowercaseValue = lowercase.checked;
    const numbersValue = numbers.checked;
    const symbolsValue = symbols.checked;

    const resultPassword = await GeneratorsApi.generatePassword({
      password_length: charRangeValue,
      uppercase: uppercaseValue,
      lowercase: lowercaseValue,
      numbers: numbersValue,
      symbols: symbolsValue,
    });

    displayScore(resultPassword.score);
    displayExposed(resultPassword.exposed_time);
    displayCrackedTime(resultPassword.crack_time);

    passwordGenerated.innerHTML = resultPassword.generated_password;
  };

  const displayScore = (score) => {
    if (score === 0) {
      strengt.style.color = "red";
      strengt.innerHTML = "Sangat Lemah";
    } else if (score === 1) {
      strengt.style.color = "#ff7300";
      strengt.innerHTML = "Lemah";
    } else if (score === 2) {
      strengt.style.color = "#c9ed67";
      strengt.innerHTML = "Kuat";
    } else {
      strengt.style.color = "#00ff4c";
      strengt.innerHTML = "Sangat Kuat";
    }
  };

  const displayExposed = (exposedTime) => {
    if (exposedTime === 0) {
      exposed.style.color = "#00ff4c";
    } else if (exposedTime <= 20) {
      exposed.style.color = "#c9ed67";
    } else if (exposedTime <= 100) {
      exposed.style.color = "#ff7300";
    } else {
      exposed.style.color = "red";
    }

    exposed.innerHTML = exposedTime + " Kali";
  };

  const displayCrackedTime = (crackedTime) => {
    if (
      crackedTime.includes("kurang") ||
      crackedTime.includes("detik") ||
      crackedTime.includes("menit")
    ) {
      cracked.style.color = "red";
    } else if (crackedTime.includes("jam") || crackedTime.includes("hari")) {
      cracked.style.color = "#ff7300";
    } else {
      cracked.style.color = "#00ff4c";
    }
    cracked.innerHTML = crackedTime;
  };

  changeResult();
};

export default home;
