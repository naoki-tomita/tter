import { login } from "./actions/login";

export default function LoginPage() {
  return (
    <form action={login}>
      <h2>Login</h2>
      <input type="text" placeholder="Email" name="email" />
      <br />
      <input type="password" placeholder="Password" name="password" />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
