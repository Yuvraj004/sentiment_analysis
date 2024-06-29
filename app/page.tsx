'use client';
import axios from "axios";
import { ChangeEvent,useEffect,useState } from "react";

export default function Home() {
  //state variables
  const [rows, setRows] = useState(2);
  const [input, setinput] = useState("");
  const [output, setOutput] = useState<{ label:string ; score:number}[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const inputTimeout = setTimeout(() =>{
      runPredictions();
    },1000);
  
    return () => clearTimeout(inputTimeout);
  }, [input])//whenever input changes use effect will run
  
  async function runPredictions() {
    
    if(input){
      setLoading(true);
      //api call
      const res= await axios.post('api/emotion',{
        input:input
      })
      setOutput(res.data.filteredRes)
      setLoading(false);
    }
  }
  

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setinput(event.target.value);
    //increase the number of rows if required
    const newRows = Math.max(1, Math.ceil(event.target.scrollHeight / 20))
    setRows(newRows);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="lg:text-4xl text-2xl font-mono font-semibold tracking-tight">🖌🎨Paint my mood🎨🖌</h1>
      <div className="border border-black p-4 rounded-lg">
        <textarea 
        rows={rows}
        onChange={handleInputChange}
        placeholder="type how you feel..."
         className="resize-none outline-none block w-full text-sm placeholder-slate-600 bg-transparent">

        </textarea>
        
      </div>
      <p>{'> '+ input}</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {output?.map(({label,score}) =>{
          
          return  <span key={label} className="cursor-pointer bg-indigo-100 text-indigo-800 text-lg px-4 py-1 rounded-full border border-indigo-400">{label}</span>
        })}
      </div>
    </main>
  );
}

