"use client";
import { useState } from "react";
import { signUp } from "@/actions/auth"; // signUp fonksiyonu için import

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await signUp(formData);

    if (response.error) {
      setError(response.error);
      setSuccess(false);
    } else {
      setError("");
      setSuccess(true);
      // Kayıt başarılıysa, giriş sayfasına yönlendirebilirsiniz
      window.location.href = "/login"; // Örnek yönlendirme
    }
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-posta:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            Kayıt başarılı! Giriş yapabilirsiniz.
          </p>
        )}

        <button type="submit">Kayıt Ol</button>
      </form>

      <p>
        Zaten bir hesabınız var mı? <a href="/login">Giriş Yap</a>
      </p>
    </div>
  );
}
