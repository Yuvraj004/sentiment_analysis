import { HfInference, TextClassificationOutput } from '@huggingface/inference'

let hf:HfInference; 
export async function POST(req:Request,res:Response){

    const {input} = await req.json();//extracting body
    const infRes =await runInference(input);
    
    const filteredRes = filterResponses([...infRes]);

    return new Response(JSON.stringify({
        infRes,filteredRes
    }),{status:200});
}

async function runInference(input:string) {
   if(!hf){
    hf = new HfInference(process.env.HF_TOKEN);
   }
   const modelName = 'SamLowe/roberta-base-go_emotions';
   const Res = await hf.textClassification({
    model:modelName,
    inputs:input
   });
   return Res;
}
function filterResponses(emotions: TextClassificationOutput) {
    const filtered = [];
    const emotion0 = emotions.shift();//removes the first element and returns it
    filtered.push(emotion0);
    let score = emotion0?.score;
    while(emotions.length > 0){
        const emotioni = emotions.shift();
        if(emotioni?.score! > score!*0.5){//exclamation to check if undefined
            filtered.push(emotioni);
            score = emotioni?.score;
        }else{
            break;
        }
    }
    return filtered;
}

