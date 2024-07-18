import GeneratorsApi from '../data/remote/generators-app.js';

const home = async () => {
    // state text
    const passwordGenerated = document.getElementById('passwordGenerated');
    const charNumber = document.getElementById('charNumber');
    const strengt = document.getElementById('strength');
    const exposed = document.getElementById('exposed');
    const cracked = document.getElementById('cracked');

    const strengtCheck = document.getElementById('strengthCheck');
    const exposedCheck = document.getElementById('exposedCheck');
    const crackCheck = document.getElementById('crackCheck');

    // buttons
    document
        .getElementById('btnRepeatGenerate')
        .addEventListener('click', () => {
            changeResult();
        });

    // Initialize Clipboard.js
    var clipboard = new ClipboardJS('#btnCopytoClipboard', {
        text: function () {
            return document.getElementById('passwordGenerated').innerText;
        },
    });

    // Event handler for success
    clipboard.on('success', function (e) {
        Swal.fire({
            title: 'Success',
            text: 'Password berhasil di copy ke clipboard!',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    });

    // Event handler for error
    clipboard.on('error', function (e) {
        console.error('Error copying to clipboard:', e.action);
        Swal.fire({
            title: 'Error!',
            text: 'Password gagal di copy',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    });

    // inputs
    const charRange = document.getElementById('char');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');

    const passwordRadioOptions = document.getElementsByName('option');

    // input checker
    const inputChecker = document.getElementById('inputChecker');

    charRange.addEventListener('input', () => {
        charNumber.innerHTML = charRange.value;
    });

    charRange.addEventListener('change', () => {
        charNumber.innerHTML = charRange.value;
        changeResult();
    });

    uppercase.addEventListener('change', () => {
        changeResult();
    });

    lowercase.addEventListener('change', () => {
        changeResult();
    });

    numbers.addEventListener('change', () => {
        changeResult();
    });

    symbols.addEventListener('change', () => {
        changeResult();
    });

    passwordRadioOptions[1].addEventListener('click', () => {
        removeQueryParam('view');
        chooseDisplayMenu();
    });

    passwordRadioOptions[0].addEventListener('click', () => {
        removeQueryParam('view');
        chooseDisplayMenu();
    });

    inputChecker.addEventListener('input', () => {
        displayResultChecker();
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

        displayScore(strengt, resultPassword.score);
        displayExposed(exposed, resultPassword.exposed_time);
        displayCrackedTime(cracked, resultPassword.crack_time);

        passwordGenerated.innerHTML = resultPassword.generated_password;
    };

    const displayResultChecker = async () => {
        const checkPassword = await GeneratorsApi.checkPassword({
            password: inputChecker.value,
        });

        displayScore(strengtCheck, checkPassword.score);
        displayExposed(exposedCheck, checkPassword.exposed_time);
        displayCrackedTime(crackCheck, checkPassword.crack_time);
    };

    const displayScore = (el, score) => {
        if (score === 0) {
            el.style.color = 'red';
            el.innerHTML = 'Sangat Lemah';
        } else if (score === 1) {
            el.style.color = '#ff7300';
            el.innerHTML = 'Lemah';
        } else if (score === 2) {
            el.style.color = '#c9ed67';
            el.innerHTML = 'Kuat';
        } else {
            el.style.color = '#00ff4c';
            el.innerHTML = 'Sangat Kuat';
        }
    };

    const displayExposed = (el, exposedTime) => {
        if (exposedTime === 0) {
            el.style.color = '#00ff4c';
        } else if (exposedTime <= 20) {
            el.style.color = '#c9ed67';
        } else if (exposedTime <= 100) {
            el.style.color = '#ff7300';
        } else {
            el.style.color = 'red';
        }

        el.innerHTML = exposedTime + ' Kali';
    };

    const displayCrackedTime = (el, crackedTime) => {
        if (
            crackedTime.includes('kurang') ||
            crackedTime.includes('detik') ||
            crackedTime.includes('menit')
        ) {
            el.style.color = 'red';
        } else if (
            crackedTime.includes('jam') ||
            crackedTime.includes('hari')
        ) {
            el.style.color = '#ff7300';
        } else {
            el.style.color = '#00ff4c';
        }
        el.innerHTML = crackedTime;
    };

    const chooseDisplayMenu = (param) => {
        if (param === 'passwordgenerator') {
            document.getElementById('passwordChecker').style.display = 'none';
            document.getElementById('passwordGenerator').style.display = '';
            passwordRadioOptions[1].checked = true;
        } else if (param === 'passwordchecker') {
            document.getElementById('passwordGenerator').style.display = 'none';
            document.getElementById('passwordChecker').style.display = '';
            passwordRadioOptions[0].checked = true;
        } else {
            if (passwordRadioOptions[1].checked) {
                document.getElementById('passwordChecker').style.display =
                    'none';
                document.getElementById('passwordGenerator').style.display = '';
            } else {
                document.getElementById('passwordGenerator').style.display =
                    'none';
                document.getElementById('passwordChecker').style.display = '';
            }
        }
    };

    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const removeQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete(param);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        history.pushState(null, '', newUrl);
    };

    chooseDisplayMenu(getQueryParam('view'));
    changeResult();
};

export default home;
