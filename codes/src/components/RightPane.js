import React from 'react';

const RightPane = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div className="p-4">Select a file or folder to view its content</div>;
  }

  if (selectedItem.type === 'folder') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">{selectedItem.name}</h2>
        <ul>
          {selectedItem.children.map((child, index) => (
            <li key={index} className="ml-4">
              {child.name} ({child.type})
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">File: {selectedItem.name}</h2>
      <p>Content of the file goes here...</p>
    </div>
  );
};

export default RightPane;
