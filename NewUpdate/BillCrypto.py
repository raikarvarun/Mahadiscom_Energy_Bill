from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64


class BillCryptos:
    """
    AES-128-CBC encryption/decryption
    Compatible with the obfuscated CryptoJS code
    """

    def __init__(self):
        function_key = "WjTfQcM@H)E&B$y9"

        # Reverse string exactly like JS
        self._secret = function_key[::-1].encode("utf-8")

        self.key = self._secret      # 16 bytes
        self.iv = self._secret       # key == iv (as in JS)

    def encrypt(self, plain_text: str) -> str:
        """
        Encrypts a string and returns Base64 output
        """
        cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
        encrypted_bytes = cipher.encrypt(
            pad(plain_text.encode("utf-8"), AES.block_size)
        )
        return base64.b64encode(encrypted_bytes).decode("utf-8")

    def decrypt(self, encrypted_text: str) -> str:
        """
        Decrypts a Base64 AES string back to plain text
        """
        cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
        decoded_bytes = base64.b64decode(encrypted_text)
        decrypted_bytes = unpad(
            cipher.decrypt(decoded_bytes),
            AES.block_size
        )
        return decrypted_bytes.decode("utf-8")