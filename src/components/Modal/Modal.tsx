
// Importa a modal do react-modal
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ClipLoader from "react-spinners/ClipLoader";

export const ModalFace = () => {

  useEffect(()=>{
console.log("fsdfsdfsdf");

  },[])

  
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    <div className="modal">

        <h1>Reconhecimento</h1>


        <ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />


    </div>

}

