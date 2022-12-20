import React, { useEffect, useState } from "react";


function Requests() {
  const [data, setData] = useState([]);
  const [enteredVal, setEnteredVal] = useState("");

  const inputChangeHandle = (event) => {
    setEnteredVal(event.target.value);
  };

  const postItem = async () => {
    await fetch(
      "https://fake-api-backend.herokuapp.com/users",
      {
        method: "POST",
        body: JSON.stringify({ "name": enteredVal }),
        headers: { "Content-Type": "application/json" },
      }
    );
    getItem();
  };

  const getItem = async () => {
    const response = await fetch(
      "https://fake-api-backend.herokuapp.com/users"
    );
    const server = await response.json();
   const updatedData =  server.filter((item) => {
      return  {"id":item.id, "name":item.name}
    })
  
    
    
      console.log(updatedData);
    setData(updatedData);
  };
  const submitHandle = (e) => {
    e.preventDefault();

    postItem();
    setEnteredVal("");
  };

  const removeChangeHandle = async (id) => {
    await fetch(
      `https://fake-api-backend.herokuapp.com/users/${id}`,
      {
        method: "DELETE",
      
        
      }
    );
    getItem();
  };

  useEffect(() => {
    getItem();
  }, []);
  const [value, setValue] = useState("");
  const [edditId, setEddit] = useState(null);

  const ongetIdModal = (id, title) => {
    setEddit(id);
    setValue(title);
  };

  const putRequest = async (id) => {
    await fetch(
      `https://fake-api-backend.herokuapp.com/users/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ "name": value }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getItem();
  };
  const sendingData = (id) => {
    data.map((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    setEddit(null);
    putRequest(id);
  };

  return (
    <div>
      <form className="form-control" onSubmit={submitHandle}>
        <input value={enteredVal} onChange={inputChangeHandle} type="text" />
        <button>add todo</button>
      </form>
      {data.map((item) => {
        return (
          <>
            {item.id === edditId ? (
              <div>
                <input
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                <button onClick={() => sendingData(item.id)}>save</button>
              </div>
            ) : (
              <div className="list-style" key={item.id}>{item.name}</div>
            )}
           
            <button onClick={() => ongetIdModal(item.id, item.name)}>
              edit
            </button>
            <button onClick={() => removeChangeHandle(item.id)}>delete</button>
          </>
        );
      })}
    </div>
  );
}

export default Requests;
