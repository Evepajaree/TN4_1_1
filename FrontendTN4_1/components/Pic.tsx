import type { NextPage } from "next";

const Pic: NextPage = () => {
  

  return (
    <div className=" bg-slate-300 max-h-max">
  

            <div className="flex justify-center py-8 " >
                <img
                     className="rounded-lg  shadow-lg shadow-[#A2805D]"
                     src="/1535811946.jpg"
                />

           </div>


           <div className="flex justify-center my-8 ">
                      <img
                       className=" h-96  w-96 px-8 my-8"
                       src="/a1.jpg"
                      />
                     <img
                      className=" h-96  w-96 px-8 my-8"
                      src="/a2.jpg"
                      />
                    <img
                    className=" h-96  w-96 px-8 my-8"
                    src="/a3.jpg"
                    />
           </div>


    </div>
  );
};


export default Pic;
