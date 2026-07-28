"use client";
import { useToast } from "../../libs/components/Toast";

export default function TestPage() {
  const { showToast } = useToast();
  return (
    <div>
      <button onClick={() => { showToast("Test message", "Test title"); }}>Click Me!</button>
    </div>
  );
}
