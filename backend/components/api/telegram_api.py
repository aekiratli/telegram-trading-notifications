
import requests
from config import TELEGRAM_SECRET
import matplotlib.pyplot as plt
import io

class TelegramApiController:
    def __init__(self, chat_id: str):
        self.token =TELEGRAM_SECRET
        self.chat_id = chat_id

    def send_message(self, message: str):
        url = f'https://api.telegram.org/bot{TELEGRAM_SECRET}/sendMessage'
        data = {'chat_id': self.chat_id, 'text': message}
        response = requests.post(url, json=data)
        if response.status_code != 200:
            raise ValueError('Failed to send notification')

    def send_telegram_photo(self, image_buffer, caption=None):
        url = f"https://api.telegram.org/bot{TELEGRAM_SECRET}/sendPhoto"
        files = {"photo": ("image.jpg", image_buffer, "image/jpeg")}
        data = {"chat_id": self.chat_id}
        if caption is not None:
            data["caption"] = caption
        response = requests.post(url, files=files, data=data)
        if response.status_code != 200:
            raise Exception(f"Failed to send photo: {response.content}")
        
    def send_rsi_plot(self, df):

        fig, ax = plt.subplots()
        ax.plot(df['close'])
        ax.set_title('Closing Prices')
        ax.set_xlabel('Time')
        ax.set_ylabel('Price')

        # Save plot to a buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png')

        # Send plot image in a Telegram message
        buf.seek(0)
        self.send_telegram_photo(buf, 'Closing Prices')

        # Close plot
        plt.close()