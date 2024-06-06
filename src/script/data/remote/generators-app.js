const BASE_URL = 'http://localhost:9000';

class GeneratorsApi {
    static async generatePassword(payload) {
        try {
            const response = await fetch(`${BASE_URL}/generates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async checkPassword(password) {
        try {
            const response = await fetch(`${BASE_URL}/checkers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(password),
            });
            const responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default GeneratorsApi;