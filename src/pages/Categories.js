import React from 'react';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import CardBox from '../components/CardBox.js';

function Categories() {
    let games = [
        {
          name: "Genshin",
          img: "https://lh3.googleusercontent.com/So91qs_eRRralMxUzt_tkj4aBXvVSYqWiEJrzrk_LBd5071mSMv_gBKslyulIOrPsiQ"
        },
        {
          name: "TFT",
          img: "https://pht.qoo-static.com/eC2NNaMnMfoKtojWbX4xVVOXg4bNuHzmMQyZ5cw139GGWPM7-t1ZfYKp79tckYhBsw=w300"
        }
      ]
  return (
    <div className="Categories">
      <CardBox games={games}/>
    </div>
  );
}

export default Categories;
