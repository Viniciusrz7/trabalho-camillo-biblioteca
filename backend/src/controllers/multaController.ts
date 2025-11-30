import db from '../models';
import { Request, Response } from 'express';
import { IMulta, IMultaComRelacionamentos } from '../models/types/types';

const Multa = db.Multa;
const Emprestimo = db.Emprestimo;
const Usuario = db.Usuario;
const Livro = db.Livro;

export const buscarMultaPorIdComRelacionamentos = async (req: Request, res: Response) => {
  try {
    const data = await Multa.findByPk(req.params.id, {
      include: [
        {
          model: Emprestimo, 
          attributes: ['id', 'dataEmprestimo', 'dataPrevistaDevolucao'],
          include: [
            { model: Livro, attributes: ['id', 'titulo', 'autor'] }
          ]
        },
        { model: Usuario, attributes: ['id', 'nome', 'email'] }
      ]
    }) as IMultaComRelacionamentos | null;

    if (!data) {
      return res.status(404).send({ message: `Multa com id ${req.params.id} não encontrada` });
    }

    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao buscar multa por ID:', error);
    res.status(500).send({ message: 'Erro ao buscar multa por ID' });
  }
};

export const buscarMultaPorId = async (req: Request, res: Response) => {
  try {
    const data = await Multa.findByPk(req.params.id) as IMulta | null;

    if (!data) {
      return res.status(404).send({ message: `Multa com id ${req.params.id} não encontrada` });
    }

    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao buscar multa por ID:', error);
    res.status(500).send({ message: 'Erro ao buscar multa por ID' });
  }
};

export const listarMultasComRelacionamentos = async (req: Request, res: Response) => {
  try {
    const data = await Multa.findAll({
      include: [
        {
          model: Emprestimo, 
          attributes: ['id', 'dataEmprestimo', 'dataPrevistaDevolucao'],
          include: [
            { model: Livro, attributes: ['id', 'titulo', 'autor'] }
          ]
        },
        { model: Usuario, attributes: ['id', 'nome', 'email'] }
      ]
    });  

    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao listar multas com relacionamentos:', error);
    res.status(500).send({ message: 'Erro ao listar multas com relacionamentos' });
  }
};

export const listarMultas = async (req: Request, res: Response) => {
  try {
    const data = await Multa.findAll();
    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao listar multas:', error);
    res.status(500).send({ message: 'Erro ao listar multas' });
  }
};

export const atualizarStatusMulta = async (req: Request, res: Response) => {
  try {
    const multa = await Multa.findByPk(req.params.id) as IMulta | null;

    if (!multa) {
      return res.status(404).send({ message: `Multa com id ${req.params.id} não encontrada` });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).send({ message: 'Status é obrigatório' });
    }

    if (!['pendente', 'paga', 'cancelada'].includes(status)) {
      return res.status(400).send({ message: 'Status inválido. Use "pendente", "paga" ou "cancelada".' });
    }

    multa.status = status;

    if (status === 'paga' && !multa.dataPagamento) {
      multa.dataPagamento = new Date();
    }

    await multa.save?.();

    res.status(200).send(multa);
  } catch (error) {
    console.error('Erro ao atualizar status da multa:', error);
    res.status(500).send({ message: 'Erro ao atualizar status da multa' });
  }
};

export const deletarMulta = async (req: Request, res: Response) => {
  try {
    const multa = await Multa.findByPk(req.params.id); 

    if (!multa) {
      return res.status(404).send({ message: `Multa com id ${req.params.id} não encontrada` });
    }

    await multa.destroy();
    res.status(200).send({ message: `Multa com id ${req.params.id} deletada com sucesso` });
  } catch (error) {
    console.error('Erro ao deletar multa:', error);
    res.status(500).send({ message: 'Erro ao deletar multa' });
  }
};

export const buscarMultasPorUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.params.usuarioId;

    const data = await Multa.findAll({
      where: { usuarioId: usuarioId }
    });

    res.status(200).send(data);  
  } catch (error) {
    console.error('Erro ao buscar multas por usuário:', error);
    res.status(500).send({ message: 'Erro ao buscar multas por usuário' });
  }
};

export const buscarMultasPendentesPorUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.params.usuarioId;

    const data = await Multa.findAll({
      where: { 
        usuarioId: usuarioId, 
        status: 'pendente' 
      }
    });

    res.status(200).send(data);  
  } catch (error) {
    console.error('Erro ao buscar multas pendentes por usuário:', error);
    res.status(500).send({ message: 'Erro ao buscar multas pendentes por usuário' });
  }
};
export const buscarMultasPorStatus = async (req: Request, res: Response) => {
    
  try {
        const {status} = req.params;
        if(!['pendente', 'paga', 'cancelada'].includes(status)){
            return  res.status(400).send({ message: 'Status inválido. Use "pendente", "paga" ou "cancelada".' });
        }
    const data = await Multa.findAll({
      where: { status: status },
      include: [
        {
          model: Emprestimo,
          attributes: ['id', 'dataEmprestimo', 'dataPrevistaDevolucao'],
          include: [
            { model: Livro, attributes: ['id', 'titulo', 'autor'] }
          ]
        },
        { model: Usuario, attributes: ['id', 'nome', 'email'] }
      ]
    });
    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao buscar multas por status:', error);
    res.status(500).send({ message: 'Erro ao buscar multas por status' });
  }
};
export const calcularTotalMultasPendentes = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.params.usuarioId;

    const multas = await Multa.findAll({
      where: { 
        usuarioId: usuarioId, 
        status: 'pendente' 
      }
    }) as any;

    const total = multas.reduce((sum: number, multa: any) => sum + parseFloat(multa.valorMulta), 0);

    res.status(200).send({ 
      usuarioId,
      totalMultasPendentes: total.toFixed(2),
      quantidadeMultas: multas.length
    });
  } catch (error) {
    console.error('Erro ao calcular total de multas pendentes:', error);
    res.status(500).send({ message: 'Erro ao calcular total de multas pendentes' });
  }
};

export const pagarMulta = async (req: Request, res: Response) => {
  try {
    const multa = await Multa.findByPk(req.params.id) as IMulta | null;
    if (!multa) {
      return res.status(404).send({ message: `Multa com id ${req.params.id} não encontrada` });
    }
    if (multa.status === 'paga') {
      return res.status(400).send({ message: 'Multa já está paga' });
    }
    if (multa.status === 'cancelada') {
      return res.status(400).send({ message: 'Multa está cancelada e não pode ser paga' });
    }
    multa.status = 'paga';
    multa.dataPagamento = new Date();
    await multa.save?.();
    res.status(200).send({ message: 'Multa paga com sucesso', multa });
  }
    catch (error) {
    console.error('Erro ao pagar multa:', error);
    res.status(500).send({ message: 'Erro ao pagar multa' });
  }
};

export const pagarMultiplasMultas = async (req: Request, res: Response) => {
  try {
    const { multasIds } = req.body;

    if (!multasIds || !Array.isArray(multasIds) || multasIds.length === 0) {
      return res.status(400).send({ message: 'Array de IDs de multas é obrigatório' });
    }

    const dataPagamento = new Date();

    await Multa.update(
      { 
        status: 'paga', 
        dataPagamento: dataPagamento 
      },
      { 
        where: { 
          id: multasIds,
          status: 'pendente'
        } 
      }
    );

    res.status(200).send({ 
      message: 'Multas pagas com sucesso',
      quantidadePaga: multasIds.length,
      dataPagamento
    });
  } catch (error) {
    console.error('Erro ao pagar múltiplas multas:', error);
    res.status(500).send({ message: 'Erro ao pagar múltiplas multas' });
  }
};


