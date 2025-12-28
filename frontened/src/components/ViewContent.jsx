import React from "react";
import { useContentContext } from "../context/Content_context.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Auth_context.jsx";

function ViewContent() {

  const navigate = useNavigate();

  const {me} = useParams();
  const { user } = useAuth();

  const { contents, deleteContent } = useContentContext();

  if (!contents || contents.length === 0) {
    return <div className="text-white text-center mt-10 text-xl">No content available.</div>;
  }

  const handleEdit = (item)=>{
    console.log(item);
    if(me == item.owner){
      navigate(`/edit/${item.id}`);
    }
    else{
      alert("You are not permitted to edit this content");
    }
  }

  const handleDelete = (item) => {
    if(me == item.owner){
      if (window.confirm("Are you sure you want to delete this content?")) {
        deleteContent(item.id);
      }
    }
    else{
      alert("You are not permitted to delete this content");
    }

  };
  

  const handleComment = (id)=>{
    navigate(`/comment/${user.username}/${id}`);
  }

  const handleOldComment = (id)=>{
    const content = contents.find(item => item.id === id) ;
    if (content && content.comments.length) {
      navigate(`/viewComment/${id}`);
    } else {
      alert("No comments found for this post.");    }
  }


  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-6">Welcome {me}</h2>
      <div className="flex flex-col items-center justify-center w-[100vw] gap-10">
        {contents.map((item, index) => (
          <div key={index}>
            <div className="border border-gray-600 p-5 rounded-lg bg-gray-800 shadow-lg w-[500px] h-auto">
            <div className="text-[11px]">{item.date}</div>
            <div className="flex justify-between">
            <h3 className="text-xl font-bold text-yellow-300">{item.owner}</h3>
            {user.username === me && (
              <div className="flex gap-5">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </div>
            )}

            </div>
            <p className="mt-2 text-gray-300">{item.body}</p>
            {item.imgurl && (
              <img
                src={item.imgurl}
                alt={item.title}
                className="mt-3 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex justify-between">
          <button onClick={()=>handleComment(item.id)}>Post Comment</button>
          <button onClick={()=>handleOldComment(item.id)}>View Old Comments</button> 
          </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewContent;
