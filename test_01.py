from flask import Flask, render_template
import requests

app = Flask(__name__)

# Clave de API de CoinMarketCap
API_KEY = "cc703f73-c56d-4f21-927a-c8405a5fb304"

# URL base de la API de CoinMarketCap
BASE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"


# Función para obtener los datos de la informacion de las criptomonedas en coinmarketcap
def get_top_10_cryptos():
    headers = {
        "Accepts": "application/json",
        "X-CMC_PRO_API_KEY": API_KEY,
    }

    params = {"limit": "800"}

    response = requests.get(BASE_URL, headers=headers, params=params)
    data = response.json()
    data = data["data"]

    return data


@app.route("/")
def index():
    cryptos = get_top_10_cryptos()
    return render_template("./index.html", cryptos=cryptos)


if __name__ == "__main__":
    app.run(debug=True)
