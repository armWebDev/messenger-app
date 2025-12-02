import React from "react";
import { useParams } from "react-router-dom";
import { messages } from "../data/message";

export default function MessagePage(){
  const { id } = useParams();
  const msg = messages.find(m => m.id === id);
  if(!msg) return <div style={{color:"#fff"}}>Message not found</div>;
  return (
    <div style={{color:"#fff"}}>
      <h2>{msg.title}</h2>
      <div style={{marginTop:10}}>{msg.content}</div>
      <div style={{marginTop:20, color:"#9aa4b2"}}>{msg.from} — {msg.date}</div>
    </div>
  );
}
