import { useState } from 'react';
import PropTypes from 'prop-types';

function ModalDataApagarSaida({ data }) {

    const [dataParaApagarSaida, setDataParaApagarSaida] = useState('');

    const dataApagar = () => {
        const dataFiltrada = data.filter((item) => item.data !== dataParaApagarSaida);
        localStorage.setItem('saida', JSON.stringify(dataFiltrada));
        window.location.reload();
    };

    return (
        <div className="bg-white m-0 ">
            <div className=''>
                <input
                    type="date"
                    value={dataParaApagarSaida}
                    onChange={(e) => setDataParaApagarSaida(e.target.value)}
                    className='p-2 text-base border border-gray-300 rounded-md w-full'
                />
                <button
                    type='submit'
                    onClick={dataApagar}
                    className="bg-blue-500 text-white h-10 p-3 rounded shadow mt-2 items-center justify-center w-full"
                >
                    Apagar entradas desta data
                </button>
            </div>
        </div>
    );
}

ModalDataApagarSaida.propTypes = {
    data: PropTypes.array.isRequired,
};

export default ModalDataApagarSaida;