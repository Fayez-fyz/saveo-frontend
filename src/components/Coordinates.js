import React from "react";

const Coordinates = ({ lat, long, loc,todo,setTodo, }) => {
  let table = ''

  return (
    <div className="container my-4">
     
        <h5>ALL CO-ORDINATES;</h5>
       


       {todo.length > 0 ? ( <ol  >
        {todo.map((todos)=>(
             <li className="">{todos.loc} <span className="float-end fw-bolder">{todos.lat} &nbsp; &nbsp; &nbsp; &nbsp; {todos.long}</span>    </li>
            //  <li className="text-center">{todos.lat}</li>
            //  <li className="text-center">{todos.long}</li>
             ))} 
             </ol>) : (<><table className="table table-borderless">
          <tbody>
           
             <tr>
             <td className="w-100">1) .... </td>
             <td className="text-center">....</td>
             <td className="text-center">....</td>
           </tr>
          

            <tr>
              <td className="w-100">2) ....</td>
              <td className="text-center">....</td>
              <td className="text-center">....</td>
            </tr>
            <tr>
              <td className="w-100">3) ....</td>
              <td className="text-center">....</td>
              <td className="text-center">....</td>
            </tr>
            <tr>
              <td className="w-100">4) ....</td>
              <td className="text-center">....</td>
              <td className="text-center">....</td>
            </tr>
            <tr>
              <td className="w-100">5) ....</td>
              <td className="text-center">....</td>
              <td className="text-center">....</td>
            </tr>
          </tbody>
        </table></>)}
      <div className=" wrapper ">
          <a
          className=" btn item3 btn-primary rounded-pill col-12 py-1 "
          style={{ backgroundColor: "#074770" }}
        >
          Show Route
        </a>
      </div>
      
        
      
    </div>
  );
};

export default Coordinates;
