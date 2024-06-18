/* eslint-disable no-unused-vars */
import { useState } from "react";
import  {useForm}  from "react-hook-form";
import { toast } from "sonner"; // Assuming this is the library you're using

class Entrada {
    constructor(data, dinheiro, debito, credito, ifood, voucher, pix, total, pessoas) {
    this.data = data;
    this.dinheiro = dinheiro;
    this.debito = debito;
    this.credito = credito;
    this.ifood = ifood;
    this.voucher = voucher;
    this.pix = pix;
    this.total = total;
    this.pessoas = pessoas;
    }
}

function ReceitaForm() {
  const [entrada, setEntrada] = useState([]);
  const { register, handleSubmit, reset, setFocus } = useForm();



  function cadastraReceita(dados) {
    const novaEntrada = new Entrada(dados.data, dados.dinheiro, dados.debito, dados.credito, dados.ifood, dados.voucher, dados.pix, dados.total, dados.pessoas);
    const entradaExistente = JSON.parse(localStorage.getItem("entrada")) || [];
    const entradaAtualizada = [...entradaExistente, novaEntrada];

    setEntrada(entradaAtualizada);
    localStorage.setItem("entrada", JSON.stringify(entradaAtualizada));
    setFocus("data");
    toast.success("Receita cadastrada com sucesso!");
    reset();
}
    // Remove the duplicate declaration of handleSubmit function

    return (
        <>
            <form onSubmit={handleSubmit(cadastraReceita)} className="p-4 bg-blue-50">
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="font-bold text-base">Data:</label>
                        <input type="date"  {...register("data", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">Dinheiro:</label>
                        <input type="text" {...register("dinheiro", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">Débito:</label>
                        <input type="text" {...register("debito", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">Crédito:</label>
                        <input type="text" {...register("credito", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">Ifood:</label>
                        <input type="text" {...register("ifood", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">Voucher:</label>
                        <input type="text" {...register("voucher", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">PIX:</label>
                        <input type="text" {...register("pix", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">Total do Dia:</label>
                        <input type="text" {...register("total", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-base">Pessoas:</label>
                        <input type="text" {...register("pessoas", { required: true })} className="p-2 text-base border border-gray-300 rounded-md w-full" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 text-white h-10 p-3 rounded shadow">Cadastrar</button>
                </div>
            </form>
        </>
    );
}

export default ReceitaForm;
