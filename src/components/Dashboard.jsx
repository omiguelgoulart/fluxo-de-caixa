import { useState } from 'react';

function Dashboard() {
const data = {
  movimentacoes: [
    { data: '2024-06-01', descricao: 'Venda de Almoço', entrada: 500, saida: 0 },
    { data: '2024-06-01', descricao: 'Compra de Ingredientes', entrada: 0, saida: 300 },
    { data: '2024-05-15', descricao: 'Venda de Jantar', entrada: 700, saida: 0 },
    { data: '2024-05-16', descricao: 'Compra de Bebidas', entrada: 0, saida: 200 },
    // Adicione mais dados conforme necessário
  ],
};


  const [mesSelecionado, setMesSelecionado] = useState('2024-06');

  const movimentacoesFiltradas = data.movimentacoes.filter(mov =>
    mov.data.startsWith(mesSelecionado)
  );

  const entradas = movimentacoesFiltradas.reduce((acc, mov) => acc + mov.entrada, 0);
  const saidas = movimentacoesFiltradas.reduce((acc, mov) => acc + mov.saida, 0);
  const saldo = entradas - saidas;
  const ticketMedio = entradas / movimentacoesFiltradas.length || 0;

  const handleMonthChange = (event) => {
    setMesSelecionado(event.target.value);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex w-[95%]">
      <div className="flex-grow p-5 ">
        <header className="bg-gray-800 p-4 rounded shadow flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard do Restaurante</h1>
            <p className="text-sm text-gray-400">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <label htmlFor="month" className="mr-2 text-gray-400">Selecione o Mês:</label>
            <input
              type="month"
              id="month"
              value={mesSelecionado}
              onChange={handleMonthChange}
              className="border p-2 rounded bg-gray-800 text-white"
            />
          </div>
        </header>
        <main className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Total de Entradas Mensais</h2>
              <p className="text-2xl font-bold text-green-500">R$ {entradas.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Total de Saídas Mensais</h2>
              <p className="text-2xl font-bold text-red-500">R$ {saidas.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Saldo Mensal</h2>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}>R$ {saldo.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-5 bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Tabela de Movimentações Mensais</h2>
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="py-2">Data</th>
                  <th className="py-2">Descrição</th>
                  <th className="py-2">Entrada</th>
                  <th className="py-2">Saída</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoesFiltradas.map((mov, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="py-2">{mov.data}</td>
                    <td className="py-2">{mov.descricao}</td>
                    <td className="py-2 text-green-500">{mov.entrada > 0 ? `R$ ${mov.entrada.toFixed(2)}` : '-'}</td>
                    <td className="py-2 text-red-500">{mov.saida > 0 ? `R$ ${mov.saida.toFixed(2)}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Indicadores de Desempenho</h2>
            <div className="flex justify-around">
              <div>
                <h3 className="text-lg font-semibold">Ticket Médio</h3>
                <p className="text-2xl font-bold">R$ {ticketMedio.toFixed(2)}</p>
              </div>
              {/* Adicione mais indicadores conforme necessário */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
