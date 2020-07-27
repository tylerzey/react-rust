import React from "react";
import "./index.css";

const kickOffRust = async () => {
  // @ts-ignore
  const nativeCode = await import("./tasks/counter/build");
  nativeCode.greet();
};

function App() {
  return (
    <main className="bg-gray-100 min-h-screen ">
      <div className="container mx-auto p-8">
        <h1 className="text-gray-800 text-2xl">Using CRA w/ Rust</h1>
        <section className="text-center">
          <button
            onClick={() => kickOffRust()}
            type="button"
            className="bg-indigo-500 px-4 py-2 text-white rounded border border-indigo-600"
          >
            Start
          </button>
        </section>
      </div>
    </main>
  );
}

export default App;
