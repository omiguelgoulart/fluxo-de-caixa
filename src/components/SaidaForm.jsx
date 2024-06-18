import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";




class Saida {
    constructor(data, descricao, valor, categoria) {
        this.data = data;
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        
    }

    
}

function SaidaForm() {
    const { register, handleSubmit, setFocus, reset } = useForm();
    // eslint-disable-next-line no-unused-vars
    const [saida, setSaida] = useState([]);


    function cadastraSaida(data) {
        const saida = new Saida(data.data, data.descricao, data.valor, data.categoria);
        const saidaExistente = JSON.parse(localStorage.getItem('saida')) || [];
        const saidaAtualizada = [...saidaExistente, saida];

        setSaida(saidaAtualizada);
        localStorage.setItem('saida', JSON.stringify(saidaAtualizada));
        setFocus('data');
        toast.success('Saída cadastrada com sucesso!');
        reset()
        
    }
    return (
        <form onSubmit={handleSubmit(cadastraSaida)} className="p-4 bg-blue-50">
    <div className="mb-4">
        <label className="font-bold text-base">Data:</label>
        <input type="date" {...register("data", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
    </div>
    <div className="mb-4">
        <label className="font-bold text-base">Descrição:</label>
        <input type="text" {...register("descricao", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
    </div>
    <div className="mb-4">
        <label className="font-bold text-base">Valor:</label>
        <input type="text" {...register("valor", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
    </div>
    <div className="mb-4">
        <label className="font-bold text-base">Categoria:</label>
        <select {...register("categoria", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full">
            <option value="">Selecione uma Categoria</option>
            <optgroup label="RECURSOS HUMANOS">
                <option value="Salários">Salários</option>
                <option value="FGTS">FGTS</option>
                <option value="Horas Extras">Horas Extras</option>
                <option value="Previdência Social (INSS)">Previdência Social (INSS)</option>
                <option value="Férias">Férias</option>
                <option value="13 salário">13 salário</option>
                <option value="Rescisões Contratuais">Rescisões Contratuais</option>
                <option value="Contribuição Sindical">Contribuição Sindical</option>
                <option value="Vales Funcionarios">Vales Funcionarios</option>
            </optgroup>
            <optgroup label="DESPESAS ADMINISTRATIVAS">
                <option value="Pró - Labore">Pró - Labore</option>
                <option value="Aluguel, Taxas e Condomínio">Aluguel, Taxas e Condomínio</option>
                <option value="IPTU do imóvel">IPTU do imóvel</option>
                <option value="Alvará + taxas">Alvará + taxas</option>
                <option value="Energia elétrica">Energia elétrica</option>
                <option value="Água">Água</option>
                <option value="Telefone / Internet">Telefone / Internet</option>
                <option value="Honorários de Terceiros (Contador/Adv./Consultor)">Honorários de Terceiros (Contador/Adv./Consultor)</option>
                <option value="Material de Expediente">Material de Expediente</option>
                <option value="Material de limpeza">Material de limpeza</option>
                <option value="Manutenção e Conservação de Prédios">Manutenção e Conservação de Prédios</option>
                <option value="Manut. e Cons. de Máq. e Equip.">Manut. e Cons. de Máq. e Equip.</option>
                <option value="Manut. e Cons. de Móveis, Utensílios e Equip. Infor.">Manut. e Cons. de Móveis, Utensílios e Equip. Infor.</option>
                <option value="Escritório">Escritório</option>
                <option value="Sistema">Sistema</option>
                <option value="Plano de Saúde">Plano de Saúde</option>
                <option value="PCMO (Medico do Trabalho)">PCMO (Medico do Trabalho)</option>
            </optgroup>
            <optgroup label="DESPESAS COM VEÍCULOS">
                <option value="Licenciamento / IPVA">Licenciamento / IPVA</option>
                <option value="Seguro de Veículos">Seguro de Veículos</option>
                <option value="Manutenção de Veículos">Manutenção de Veículos</option>
                <option value="Combustível">Combustível</option>
            </optgroup>
            <optgroup label="PROPAGANDA E MARKETING">
                <option value="Marketing">Marketing</option>
                <option value="Anúncios">Anúncios</option>
            </optgroup>
            <optgroup label="DESPESAS BANCÁRIAS E FINANCEIRAS">
                <option value="Despesas com Cobrança de Títulos">Despesas com Cobrança de Títulos</option>
                <option value="Despesas com IOF">Despesas com IOF</option>
                <option value="Juros sobre Emprést. Limites de Crédito (Ch. Esp.)">Juros sobre Emprést. Limites de Crédito (Ch. Esp.)</option>
                <option value="Despesas com juros de cartões">Despesas com juros de cartões</option>
                <option value="Despesas com antecipações de cartão">Despesas com antecipações de cartão</option>
                <option value="Cesta de relacionamento">Cesta de relacionamento</option>
            </optgroup>
        </select>
    </div>
    <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 text-white h-10 p-3 rounded shadow">Cadastrar</button>
    </div>
</form>
    );
}
export default SaidaForm;