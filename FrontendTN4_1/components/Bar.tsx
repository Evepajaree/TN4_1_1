import type { NextPage } from "next";
import Link from "next/link";


const Bar: NextPage = () => {
  
  return (
    <div className=" bg-white">
      
        <div className="bg-white">
        
       <div className="flex justify-center bg-white ">
        <div className="flex justify-start md:justify-between bg-white mt-6">
          <div>
             <img src="/logo.png" className="h-24" />
          </div>
          <div>
             <h1 className="text-5xl mt-6">TN4.Shop</h1>
          </div>
        </div>
       </div>
        
        <div  className="flex justify-start md:justify-between bg-white">

          <div className="m-10">
          <ul>
      <li>
            <Link href="/oderpage">
            <h1 className="mx-40 my-8 cursor-pointer">HOME</h1>
            </Link>
            </li>
            </ul>
            <div className="border-t border-[#000000] "></div>
          </div>

          
          <div className="m-10">
          <ul>
      <li>
            <Link href="/collection">
            <h1 className="mx-12 my-16 cursor-pointer">MyColiection</h1>
            
            </Link>
            </li>
            </ul>
            
          </div>

          <div className="m-10">
          <ul>
      <li>
            <Link href="/contact">
                <h1 className="mx-40 my-8 cursor-pointer">CONTACT</h1>
            </Link>

            </li>
            </ul>
            <div className="border-t border-[#000000] "></div>
          </div>

        </div>

</div>        

     


    </div>
  );
};

export default Bar;
