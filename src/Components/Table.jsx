import React from "react";
import UserRow from "./Userrow";

const Table = ({
  data,
  selectedRows,
  onToggleRowSelection,
  onEditRow,
  onDeleteRow,
}) => (
  <div className="table-responsive">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          isSelected={selectedRows.includes(user.id)}
          onToggleRowSelection={onToggleRowSelection}
          onEditRow={onEditRow}
          onDeleteRow={onDeleteRow}
        />
      ))}
    </tbody>
  </div>
);

export default Table;
