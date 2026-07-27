import { testAction } from "./actions/test";

export default function TestPage() {
  return (
    <div>
      <button onClick={testAction}>Click Me!</button>
    </div>
  );
}
