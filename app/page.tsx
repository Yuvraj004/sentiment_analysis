import { ChangeEvent,useState } from "react";

export default function Home() {
  //state variables
  const [rows, setRows] = useState(2);
  const [input, setinput] = useState("");
  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setinput(event.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="lg:text-4xl text-2xl font-mono font-semibold tracking-tight">🖌🎨Paint my mood🎨🖌</h1>
      <div className="border border-black p-4 rounded-lg">
        <textarea 
        rows={rows}
        onChange={handleInputChange}
        placeholder="type how you feel..."
         className="outline-none block w-full text-sm placeholder-slate-600 bg-transparent">

        </textarea>
      </div>
    </main>
  );
}
