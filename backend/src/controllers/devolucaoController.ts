import { Request, Response } from 'express';
import db from '../models/index';
import { IEmprestimo, ILivro, IMulta } from '../models/types/types';

const Emprestimo = db.Emprestimo;
const Livro = db.Livro;
const Multa = db.Multa;

export const registrarDevolucao = async (req: Request, res: Response) => {
    try {
        const { emprestimoId } = req.body; //enviado pelo body da requisição
        if(!emprestimoId) {
            return res.status(400).send({ message: 'O ID do empréstimo é obrigatório' });
        }
        const emprestimo = await Emprestimo.findByPk(emprestimoId) as unknown as IEmprestimo | null;
        if(!emprestimo) {
            return res.status(404).send({ message: 'Empréstimo não encontrado' });
        }
        if(emprestimo.status === 'devolvido') {
            return res.status(400).send({ message: 'Livro já foi devolvido' });
        }

        const dataAtual = new Date();
        const dataPrevista = new Date(emprestimo.dataPrevistaDevolucao);
         const diasAtraso = Math.max(0, Math.floor((dataAtual.getTime() - dataPrevista.getTime()) / (1000 * 60 * 60 * 24)));
        emprestimo.dataDevolucao = dataAtual;
        emprestimo.status = 'devolvido';
        emprestimo.diasAtraso = diasAtraso;
        await emprestimo.save?.();
        let multa = null;
        if(diasAtraso > 0) {
            const valorMulta = diasAtraso * 2; // Exemplo: R$2 por dia de atraso
            multa = await Multa.create({
                emprestimoId: emprestimo.id,
                usuarioId: emprestimo.usuarioId,
                valorMulta: valorMulta,
                status: 'pendente'
            }) as unknown as IMulta;
        }
        const livro = await Livro.findByPk(emprestimo.livroId) as unknown as ILivro | null;
        if(livro) {
            livro.quantidadeDisponivel += 1;
            await livro.save?.();
        }
    res.send({ 
  message: 'Devolução registrada com sucesso',
  diasAtraso: emprestimo.diasAtraso,
  multaAplicada: diasAtraso > 0,
  valorMulta: multa ? multa.valorMulta : 0
});
    } catch (error) {
        res.status(500).send({ message: 'Erro ao registrar devolução', error });
    }
};