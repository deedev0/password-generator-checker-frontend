import GeneratorsApi from "../data/remote/generators-app.js";

const home = async () => {
  const resultPassword = await GeneratorsApi.generatePassword({
    password_length: 10,
  });
  const checkPassword = await GeneratorsApi.checkPassword({
    password: "admin",
  });
  console.log(resultPassword);
  console.log(checkPassword);

  // state text
  const charNumber = document.getElementById("charNumber");

  // inputs
  const charRange = document.getElementById("char");
  const uppercase = document.getElementById("uppercase");
  const lowercase = document.getElementById("lowercase");
  const numbers = document.getElementById("numbers");
  const symbols = document.getElementById("symbols");

  charRange.addEventListener("input", () => {
    charNumber.innerHTML = charRange.value;
    console.log(charRange.value);
    console.log(uppercaseValue.value);
  });

  const getAllValues = () => {
    const charRangeValue = charRange.value;
  };
};

export default home;
