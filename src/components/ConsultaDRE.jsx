import { useState } from 'react';

const dataByMonth = {
  January: [
    { description: 'Receitas Totais', value: 'R$62.479,63', percentage: '100%' },
    { description: 'Custos Variáveis Totais', value: 'R$17.014,65', percentage: '27%' },
    { description: 'Despesas com Cartões', value: 'R$333,50', percentage: '1%' },
    { description: 'Impostos', value: 'R$3.303,99', percentage: '5%' },
    { description: 'Margem de Contribuição', value: 'R$20.652,14', percentage: '33%' },
    { description: 'Despesas Fixas', value: 'R$6.376,86', percentage: '10%' },
    { description: 'Lucro Líquido', value: 'R$35.450,63', percentage: '57%' },
    { description: 'Ponto de Equilíbrio', value: 'R$27.029,00', percentage: '' },
  ],
  // Adicione os dados para outros meses aqui
};

const months = Object.keys(dataByMonth);

const DRETable = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="container p-5 w-[94%] ">
      <div className="bg-gray-800 text-white w-full rounded shadow">
        <div className="flex items-center flex-col bg-gray-800 m-4 p-4 rounded shadow w-full overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Demonstração do Resultado do Exercício (DRE)</h1>
          <div className="mb-4">
            <label htmlFor="month" className="block text-sm font-medium text-white dark:text-gray-300">Selecione o Mês:</label>
            <select
              id="month"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          {/* Tabela de DRE */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-xs uppercase bg-gray-500 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 border border-gray-500">Descrição</th>
                  <th className="px-6 py-3 border border-gray-500">Valor (R$)</th>
                  <th className="px-6 py-3 border border-gray-500">Percentual (%)</th>
                </tr>
              </thead>
              <tbody>
                {dataByMonth[selectedMonth].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-800 text-white" : "bg-white"}>
                    <td className="px-6 py-3 border border-gray-500">{item.description}</td>
                    <td className="px-6 py-3 border border-gray-500">{item.value}</td>
                    <td className="px-6 py-3 border border-gray-500">{item.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRETable;
