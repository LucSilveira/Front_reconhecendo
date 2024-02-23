import React, { useEffect, useState } from 'react';
import Webcam from "react-webcam";
import api from '../../utils/api';
import camera from '../../assets/img/camera-fotografica.png'
import recarregar from '../../assets/img/recarregar.png'
import "./style.css"
import Modal from 'react-modal';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 300,
    height: 500,
    facingMode: "user"
};

export const WebcamCapture = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const webcamRef: any = React.useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        setModalIsOpen(true); // Abrir o modal

        // console.log(imageSrc)

        const byteCharacters = atob(imageSrc.replace('data:image/jpeg;base64,', ''));
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });

        // Passo 2: Criar um objeto File a partir do Blob
        const file = new File([blob], 'nome_do_arquivo.jpg', { type: 'application/octet-stream' });

        // Criar um URL temporário para o arquivo
        // const url = URL.createObjectURL(file);

        // Criar um link <a> para iniciar o download
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = file.name;

        // // Adicionar o link ao documento
        // document.body.appendChild(link);

        // // Disparar um clique no link para iniciar o download
        // link.click();

        // // Limpar o URL temporário após o download
        // URL.revokeObjectURL(url);

        // Passo 3: Criar um FormData e anexar o objeto File
        const formData = new FormData();
        formData.append('image', file);

        api.post("/photo", formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        }).then((resposta: any) => {

            localStorage.setItem("id", resposta.data.id)

            if (resposta.status === 200) {
                // Fechar o modal quando receber a resposta da API
                setModalIsOpen(false);

                if( resposta.data.typeUser.tipo != "Funcionário")
                {
                    navigate('/cadastro');
                }else{
                    window.location.href = 'https://www.vw.com.br/pt.html';
                }
            }
        }).catch((error: any) => {
            console.error(error);
            if (error.response.status === 500 || error.response.status === 400) {
                setError('Ocorreu um erro. Por favor, tente novamente.');
                setModalIsOpen(false);

                // Redirecionar para a página de captura de foto novamente
                navigate('/idfacial');
            }
        });

    }, []);

    return (

        <div className="webcam-container">
            <div className="webcam-img">

                {image == '' ? <Webcam className="webcam-container"
                    audio={false}

                    ref={webcamRef}
                    screenshotFormat="image/jpeg"

                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div className='btn-button'>
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        // setImage('')
                    }}
                        className="webcam-btn">
                        <img src={recarregar} alt="" />
                    </button> :

                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">
                        <img src={camera} alt="" />

                    </button>
                }
            </div>
            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0)', // Cor transparente para o fundo
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%', // Tamanho do modal
                        height: '50%',
                        backgroundColor: 'rgba(7, 47, 87, 1)', // Cor de fundo
                        border: 'none',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }}
                contentLabel="Example Modal"
                className="modal"
            >
                <h1 style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>Procurando usuário</h1>
                {error && <p>{error}</p>}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ClipLoader
                        color={'#ffffff'} // Cor do spinner
                        loading={true} // Mostrar o spinner
                        size={50} // Tamanho do spinner
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default WebcamCapture;
