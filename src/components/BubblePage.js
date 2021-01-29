import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const getColorsList = () => {
    axiosWithAuth()
      .get('/colors')
      .then((res) => {
        console.log('COLORS ARE SET', res);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getColorsList();
  }, []);

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get('/colors')
  //     .then((res) => {
  //       console.log('COLORS ARE SET', res);
  //       setColorList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);
  // console.log(colorList);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        getColorsList={getColorsList}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
