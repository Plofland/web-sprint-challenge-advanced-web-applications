import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import EditMenu from './EditMenu';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
    // console.log(colorToEdit);
  };

  // useEffect(() => {
  //   updateColors();
  // }, []);

  const saveEdit = (e) => {
    e.preventDefault();
    // console.log(colorToEdit);
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        // console.log(res.data);
        console.log('EDIT WORKING');
        updateColors(
          colors.map((color) => {
            if (color.id === res.id) {
              return res.data;
            } else {
              return color;
            }
          })
        );
        setEditing(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteColor = (color) => {
    console.log(color);
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        updateColors(colors.filter((color) => color.id !== res.data));
        console.log(colors);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <EditMenu
          colorToEdit={colorToEdit}
          saveEdit={saveEdit}
          setColorToEdit={setColorToEdit}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.
