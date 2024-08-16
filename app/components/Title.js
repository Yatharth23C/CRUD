
import  Link  from "next/link"
export default function Title(){
    return(<>
    <div className ="main ml-auto mr-auto min-w-[700px] max-w-fit bg-white text-black flex flex-col p-3" >
      <div className = "title flex flex-row justify-between">Tournamex assignment <button className ='hover:cursor-pointer bg-black text-white rounded-md p-2 '><Link href='/addtopics'>Add topics</Link></button></div>

      
      </div></>)
}
