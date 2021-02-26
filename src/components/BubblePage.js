import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';

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
