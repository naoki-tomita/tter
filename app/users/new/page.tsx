import { createUser } from "./actions/createUser";

export default function CreatePage() {
  return (
    <form action={createUser}>
      <h2>Create</h2>
      <input type="text" placeholder="Name" name="name" required />
      <br />
      <input type="text" placeholder="Email" name="email" required />
      <br />
      <input type="password" placeholder="Password" name="password" required />
      <br />
      <input type="password" placeholder="PasswordCheck" name="password2" required />
      <br />
      <button type="submit">Create</button>
    </form>
  );
}
