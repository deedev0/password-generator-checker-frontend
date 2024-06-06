import GeneratorsApi from '../data/remote/generators-app.js'

const home = async () => {
    const resultPassword = await GeneratorsApi.generatePassword({ password_length: 10});
    const checkPassword = await GeneratorsApi.checkPassword({ password: "admin" });
    console.log(resultPassword);
    console.log(checkPassword);
};

export default home;