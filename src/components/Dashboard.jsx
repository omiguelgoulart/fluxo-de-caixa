import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Dashboard() {
  const [entrada, setEntrada] = useState([]);
  const [saida, setSaida] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    const entradaData = localStorage.getItem('entrada');
    const saidaData = localStorage.getItem('saida');

    if (entradaData) {
      try {
        setEntrada(JSON.parse(entradaData));
      } catch (e) {
        console.error('Erro ao parsear entrada:', e);
        setEntrada([]);
      }
    }

    if (saidaData) {
      try {
        setSaida(JSON.parse(saidaData));
      } catch (e) {
        console.error('Erro ao parsear saida:', e);
        setSaida([]);
      }
    }
  }, []);

  function formatarDinheiro(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(parseFloat(valor) || 0);
  }

  function CalculaTotalEntradaPorData() {
    if (!Array.isArray(entrada)) {
      console.error('Entrada não é um array:', entrada);
      return 0;
    }

    return entrada.reduce((acc, mov) => {
      if (mov.data.includes(mesSelecionado)) {
        return acc + parseFloat(mov.total || 0);
      }
      return acc;
    }, 0);
  }

  function CalculaTotalSaidaPorData() {
    if (!Array.isArray(saida)) {
      console.error('Saida não é um array:', saida);
      return 0;
    }

    return saida.reduce((acc, mov) => {
      if (mov.data.includes(mesSelecionado)) {
        return acc + parseFloat(mov.valor || 0);
      }
      return acc;
    }, 0);
  }

  function CalculaTotalPessoasPorData() {
    if (!Array.isArray(entrada)) {
      console.error('Entrada não é um array:', entrada);
      return 0;
    }

    return entrada.reduce((acc, mov) => {
      if (mov.data.includes(mesSelecionado)) {
        return acc + parseInt(mov.pessoas || 0);
      }
      return acc;
    }, 0);
  }

  const totalEntrada = CalculaTotalEntradaPorData();
  const totalSaida = CalculaTotalSaidaPorData();
  const totalPessoas = CalculaTotalPessoasPorData();
  const saldo = totalEntrada - totalSaida;
  const ticketMedio = totalPessoas > 0 ? totalEntrada / totalPessoas : 0;

  function handleMonthChange(event) {
    setMesSelecionado(event.target.value);
  }

  // Configuração dos dados do gráfico
  const data = {
    labels: entrada.filter(mov => mov.data.includes(mesSelecionado)).map(mov => new Date(mov.data).toLocaleDateString()),
    datasets: [
      {
        label: 'Total de Entradas',
        data: entrada.filter(mov => mov.data.includes(mesSelecionado)).map(mov => mov.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Total de Saídas',
        data: saida.filter(mov => mov.data.includes(mesSelecionado)).map(mov => mov.valor),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Entradas e Saídas Mensais',
      },
    },
  };

  function CalculaTotalCustosVariaveis() {
    return entrada.reduce((acc, mov) => {
      if (mov.data.includes(mesSelecionado)) {
        return acc + (parseFloat(mov.dinheiro || 0) + parseFloat(mov.debito || 0) +
          parseFloat(mov.credito || 0) + parseFloat(mov.ifood || 0) +
          parseFloat(mov.voucher || 0) + parseFloat(mov.pix || 0));
      }
      return acc;
    }, 0);
  }

  const margemContribuicao = CalculaTotalEntradaPorData() - CalculaTotalCustosVariaveis();

  return (
    <div className="bg-gray-900 text-white min-h-screen w-[94%] ">
      <div className="container mx-auto px-4 py-8">
        <header className="bg-gray-800 p-4 rounded shadow flex justify-between items-center mb-8">
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
        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Total de Entradas Mensais</h2>
              <p className="text-2xl font-bold text-green-500">{formatarDinheiro(totalEntrada)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Total de Saídas Mensais</h2>
              <p className="text-2xl font-bold text-red-500">{formatarDinheiro(totalSaida)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Saldo Mensal</h2>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}>{formatarDinheiro(saldo)}</p>
            </div>
          </div>
          <div className="mt-8 bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Indicadores de Desempenho</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Ticket Médio</h3>
                <p className="text-2xl font-bold">{formatarDinheiro(ticketMedio)}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Margem de Contribuição</h3>
                <p className={`text-2xl font-bold ${margemContribuicao >= 0 ? 'text-green-500' : 'text-red-500'}`}>{formatarDinheiro(margemContribuicao)}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Gráfico de Entradas e Saídas</h2>
            <div className="overflow-x-auto">
              <Bar data={data} options={options} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
