"use client";
import { useState } from "react";
import { signIn } from "@/actions/auth"; // signIn fonksiyonu için import

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signIn(new FormData(e.target as HTMLFormElement));

    if (response.error) {
      setError(response.error);
      setSuccess(false);
    } else {
      setError("");
      setSuccess(true);
      // Giriş başarılıysa, yönlendirme yapılabilir
      window.location.href = "/"; // Örnek yönlendirme
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
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
        {success && <p className="success-message">Giriş başarılı!</p>}

        <button type="submit">Giriş Yap</button>
      </form>

      <p>
        Henüz kaydolmadınız mı? <a href="/signup">Kayıt Ol</a>
      </p>
    </div>
  );
}
