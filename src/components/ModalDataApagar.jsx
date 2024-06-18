import { useState } from 'react';
import PropTypes from 'prop-types';

function ModalDataApagar({ data }) {

    const [dataParaApagar, setDataParaApagar] = useState('');

    function dataApagar(){
        const dataFiltrada = data.filter((item) => item.data !== dataParaApagar);
        localStorage.setItem("entrada", JSON.stringify(dataFiltrada));
        window.location.reload();
    }

  return (
    <div className="bg-white ">
    <div className=''>
      <input
        type="date"
        value={dataParaApagar}
        onChange={(e) => setDataParaApagar(e.target.value)}
        className='p-2 text-base border border-gray-300 rounded-md w-full'
      />
      <button
        type='submit'
        onClick={dataApagar}
        className="bg-blue-500 text-white h-10 p-3 rounded shadow mt-2"
      >
        Apagar entradas desta data
      </button>
    </div>
    </div>
  );
}

ModalDataApagar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ModalDataApagar;