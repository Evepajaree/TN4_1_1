import type { NextPage } from "next";
import React ,{useEffect,useState}from "react";

import axios from "axios";
const apiEndpoint = 'http://localhost:8000'


const Collect: NextPage = (props) => {
  
//  console.log(props);
 
 const [Datas,setDatas] = useState([])


 async function fetchCollection(){

 let tmp = await axios.get(apiEndpoint)
//  console.log('tmp',tmp.data);
 try {
  let FilterData = tmp.data.filter(result => result.favorite === true)  
  console.log('FilterData',FilterData);
    
  setDatas(FilterData)
 } catch (error) {
  console.log('error to set filterdata');
  
 }

 
 

}
async function putDatas(id:any){

  // console.log(id);
  // { favorite: true }
  await axios.put(`${apiEndpoint}/${id}`)

  await fetchCollection()
  
 }


 useEffect(()=>{
  
  fetchCollection()

},[])

  return (
    <div className=" bg-slate-300 max-h-max">
  
        {/* Card Section From Datas[] */}
        <div className="flex flex-row justify-center" >
          {Datas.map((_contex,idx)=>(
            <div key={idx} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <div>
                <img src={_contex.image}/>
              </div>
              <div>Obj Id: {_contex.id}</div>
              <div>{_contex.favorite.toString()}</div>
              <div>Price: {_contex.price}</div>
              <button onClick={(e)=>putDatas(_contex.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
            {/* End Card from Datas[] */}

    </div>
  );
};

export default Collect;
