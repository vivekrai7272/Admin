// UserRow.js
import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./style.css"
const UserRow = ({ user, isSelected, onToggleRowSelection, onEditRow, onDeleteRow }) => (
  <tr className={isSelected ? 'selected' : ''}>
    <td><input type="checkbox" onChange={() => onToggleRowSelection(user.id)} /></td>
   
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>
      <button onClick={() => onEditRow(user.id)} style={{backgroundColor:"black"}}><FaRegEdit /></button>
      <button onClick={() => onDeleteRow(user.id)} style={{backgroundColor:"red"}}><MdDelete /></button>
    </td>
  </tr>
);

export default UserRow;
