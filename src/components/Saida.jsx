import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import SaidaForm from './SaidaForm';
import ModalDataApagarSaida from './ModalDataApagarSaida';

function SaidaTabela() {
  const data = JSON.parse(localStorage.getItem('saida') || '[]');

  function formatarDinheiro(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(valor);
  }

  const total = data.reduce((acc, item) => acc + item.valor, 0);

  const [open, setOpen] = useState(false);
  const [saida, setSaida] = useState([]);
  const [openModalApagar, setOpenModalApagar] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModalApagar = () => {
    setOpenModalApagar(true);
  };

  const handleCloseModalApagar = () => {
    setOpenModalApagar(false);
  };

  function apagar() {
    localStorage.removeItem('entrada');
    window.location.reload();
  }

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen w-[94.5%] px-4 py-8">
        {/* Título da página */}
        <header className="bg-gray-800 p-4 rounded shadow flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Saídas e Pagamentos</h1>
          <h2 className="text-2xl font-bold">Total {formatarDinheiro(total)}</h2>
        </header>
        <div className="flex flex-col lg:flex-row lg:justify-between mb-4 min-h-[calc(100vh-8rem)]">
          {/* Menu de interações */}
          <div className="flex flex-col bg-gray-800 p-4 rounded shadow w-full lg:w-[18.75rem] lg:mr-5 mb-4 lg:mb-0">
            <h1 className="text-xl font-bold text-gray-400">Menu de interações</h1>
            <button onClick={handleOpenModal} className="bg-gray-500 text-white h-10 mt-4 p-3 rounded shadow">
              Inserir nova Saída
            </button>
            <button onClick={apagar} className="bg-gray-500 text-white h-10 mt-4 p-3 rounded shadow">
              Apagar tudo
            </button>
            <button onClick={handleOpenModalApagar} className="bg-gray-500 text-white h-10 mt-4 p-3 rounded shadow">
              Apagar por data
            </button>
          </div>
          {/* Tabela de Saídas */}
          <div className="flex flex-col bg-gray-800 p-4 rounded shadow overflow-auto w-full lg:w-[calc(100%-19.75rem)]">
            <h1 className="text-2xl font-bold text-gray-400">Valores de Saídas</h1>
            <div className="my-5 rounded shadow overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead className="text-xs uppercase bg-gray-500">
                  <tr>
                    <th className="px-4 lg:px-3 py-3 border border-gray-500">Data</th>
                    <th className="px-4 lg:px-3 py-3 border border-gray-500">Descrição</th>
                    <th className="px-4 lg:px-3 py-3 border border-gray-500">Valor</th>
                    <th className="px-4 lg:px-3 py-3 border border-gray-500">Categoria</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "dark:bg-gray-400"}>
                      <td className="px-4 lg:px-3 py-3 border border-gray-500">{row.data}</td>
                      <td className="px-4 lg:px-3 py-3 border border-gray-500">{row.descricao}</td>
                      <td className="px-4 lg:px-3 py-3 border border-gray-500">{formatarDinheiro(row.valor)}</td>
                      <td className="px-4 lg:px-3 py-3 border border-gray-500">{row.categoria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modais */}
      <Modal open={open} onClose={handleCloseModal} center classNames={{ modal: 'w-full sm:w-[80%] md:w-[60%] lg:w-[40%]', overlay: 'fixed inset-0 bg-black opacity-50' }}>
        <SaidaForm saida={saida} setSaida={setSaida} />
      </Modal>
      <Modal open={openModalApagar} onClose={handleCloseModalApagar} center classNames={{ modal: 'w-full sm:w-[80%] md:w-[60%] lg:w-[40%]', overlay: 'fixed inset-0 bg-black opacity-50' }}>
        <ModalDataApagarSaida data={data} />
      </Modal>
    </>
  );
}

export default SaidaTabela;
