import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ReceitaForm from './ReceitaForm';
import ModalDataApagar from './ModalDataApagar';

function formatarDinheiro(valor) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formatter.format(parseFloat(valor));
}

export function Receita() {
  const data = JSON.parse(localStorage.getItem('entrada')) || [];
  const total = data.reduce((acc, item) => acc + parseFloat(item.total), 0);

  const [open, setOpen] = useState(false);
  const [entrada, setEntrada] = useState([]);
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
      <div className="bg-gray-900 text-white min-h-screen w-[94.5%] px-4 py-8 ">
        {/* Título da página */}
        <header className="bg-gray-800 p-4 rounded shadow flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">Entradas</h1>
          <h2 className="text-2xl font-bold">Total {formatarDinheiro(total)}</h2>
        </header>
        <div className="flex flex-col lg:flex-row lg:justify-between mb-4 min-h-[calc(100vh-8rem)]">
          {/* Menu de interações */}
          <div className="flex flex-col bg-gray-800 p-4 rounded shadow w-full lg:w-[18.75rem] lg:mr-5 mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold text-gray-400 mb-4">Menu de interações</h1>
            <button onClick={handleOpenModal} className="bg-gray-500 text-white h-10 mt-4 p-3 rounded shadow">Inserir nova entrada</button>
            <button onClick={apagar} className="bg-gray-500 text-white h-10 mt-4 p-3 rounded shadow">Apagar tudo</button>
            <button onClick={handleOpenModalApagar} className="bg-gray-500 text-white h-10 mt-4 p-3 rounded shadow">Apagar por data</button>
          </div>
          {/* Tabela de Entradas */}
          <div className="flex flex-col bg-gray-800 p-4 rounded shadow overflow-auto w-full lg:w-[calc(100%-19.75rem)]">
            <h1 className="text-2xl font-bold text-gray-400 mb-4">Valores diários de entrada do mês</h1>
            <div className="rounded shadow overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead className="text-xs uppercase bg-gray-500">
                  <tr>
                    <th className="px-2 py-2 border border-gray-500">Data</th>
                    <th className="px-2 py-2 border border-gray-500">Dinheiro</th>
                    <th className="px-2 py-2 border border-gray-500">Débito</th>
                    <th className="px-2 py-2 border border-gray-500">Crédito</th>
                    <th className="px-2 py-2 border border-gray-500">Ifood</th>
                    <th className="px-2 py-2 border border-gray-500">Voucher</th>
                    <th className="px-2 py-2 border border-gray-500">PIX</th>
                    <th className="px-2 py-2 border border-gray-500">Total do Dia</th>
                    <th className="px-2 py-2 border border-gray-500">Pessoas</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
                      <td className="px-2 py-2 border border-gray-500">{row.data}</td>
                      <td className="px-2 py-2 border border-gray-500">{formatarDinheiro(row.dinheiro)}</td>
                      <td className="px-2 py-2 border border-gray-500">{formatarDinheiro(row.debito)}</td>
                      <td className="px-2 py-2 border border-gray-500">{formatarDinheiro(row.credito)}</td>
                      <td className="px-2 py-2 border border-gray-500">{formatarDinheiro(row.ifood)}</td>
                      <td className="px-2 py-2 border border-gray-500">{formatarDinheiro(row.voucher)}</td>
                      <td className="px-2 py-2 border border-gray-500">{formatarDinheiro(row.pix)}</td>
                      <td className="px-2 py-2 border border-gray-500">{formatarDinheiro(row.total)}</td>
                      <td className="px-2 py-2 border border-gray-500">{row.pessoas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <Modal open={open} onClose={handleCloseModal} center classNames={{ modal: 'rounded shadow' }}>
        <ReceitaForm entrada={entrada} setEntrada={setEntrada} />
      </Modal>
      <Modal open={openModalApagar} onClose={handleCloseModalApagar} center classNames={{ modal: 'rounded shadow' }}>
        {data ? <ModalDataApagar data={data} /> : null}
      </Modal>
    </>
  );
}

export default Receita;
