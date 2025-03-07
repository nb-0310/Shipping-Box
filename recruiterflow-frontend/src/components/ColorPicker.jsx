import React from "react";

const ColorPicker = ({ setColor, color }) => {
  return (
    <div className="flex flex-col items-center">
      <label className="mb-2">Pick a Box Color:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
      />
    </div>
  );
};

export default ColorPicker;
