import { useState } from 'react';
import Modal from 'react-modal';
import SaidaForm from './SaidaForm';
import ModalDataApagarSaida from './ModalDataApagarSaida';



function SaidaTabela() {
    const data = JSON.parse(localStorage.getItem('saida')) || [];

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
    <div className="  bg-gray-900 text-white w-[95%] rounded shadow">
        <div className="p-4">
            <header className="bg-gray-800 p-4 rounded shadow flex justify-between px-8">
                <h1 className="text-2xl font-bold text-gray-400">Saídas e Pagamentos</h1>
                <h2 className="text-2xl font-bold text-gray-400">Total {formatarDinheiro(total)}</h2>
            </header>
        </div>
        <div className='flex h-[85vh]'>
        <div className="flex items-center flex-col bg-gray-800 m-4 p-4 rounded shadow w-[100%] overflow-auto ">
            <h1 className="text-2xl font-bold text-gray-400">Valores de Saídas</h1>
            <div className='my-5 rounded shadow'>
                <table className=" text-sm text-center">
                    <thead className="text-xs uppercase bg-gray-500">
                        <tr>
                        <th className="px-6 py-3 border border-gray-500">Data</th>
                        <th className="px-6 py-3 border border-gray-500">Descrição</th>
                        <th className="px-6 py-3 border border-gray-500">Valor</th>
                        <th className="px-6 py-3 border border-gray-500">Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "dark:bg-gray-100"}>
                        <td className="px-6 py-3 border border-gray-500">{row.data}</td>
                        <td className="pl-2 pr-6 py-3 border border-gray-500">{row.descricao}</td>
                        <td className="px-6 py-3 border border-gray-500">{formatarDinheiro(row.valor)}</td>
                        <td className="px-6 py-3 border border-gray-500">{row.categoria}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className='bg-gray-800 m-4 p-4 rounded shadow w-[25%] flex flex-col gap-4  '>
        <h1 className="text-xl font-bold text-gray-400">Menu de interações</h1>
            <button onClick={handleOpenModal} className="bg-gray-500 text-white h-10 p-3 rounded shadow flex items-center">
                Inserir nova Saída
            </button>
            <Modal isOpen={open} onRequestClose={handleCloseModal} center>
                <SaidaForm entrada={saida} setEntrada={setSaida} />
            </Modal>
            <button onClick={apagar} className="bg-gray-500 text-white h-10 p-3 rounded shadow flex items-center">Apagar tudo</button>
            <button onClick={handleOpenModalApagar} className="bg-gray-500 text-white h-10 p-3 rounded shadow flex items-center">Apagar por data</button>
            <Modal
                isOpen={openModalApagar}
                onRequestClose={handleCloseModalApagar}
                className="w-[40%]"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <ModalDataApagarSaida data={data} />
            </Modal>
        </div>
        </div>
    </div>
  );
}

export default SaidaTabela;