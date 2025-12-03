import bcrypt from 'bcrypt';
import db from '../models/index';

const Usuario = db.Usuario;

async function seed() {
  try {
    await db.sequelize.sync({ force: false });

    const adminExiste = await Usuario.findOne({ where: { email: 'admin@biblioteca.com' } });
    if (!adminExiste) {
      await Usuario.create({
        nome: 'Admin Sistema',
        email: 'admin@biblioteca.com',
        senha: await bcrypt.hash('admin123', 10),
        tipo: 'admin',
        ativo: true
      });
    }

    const bibliotecarioExiste = await Usuario.findOne({ where: { email: 'bibliotecario@biblioteca.com' } });
    if (!bibliotecarioExiste) {
      await Usuario.create({
        nome: 'João Bibliotecário',
        email: 'bibliotecario@biblioteca.com',
        senha: await bcrypt.hash('biblio123', 10),
        tipo: 'bibliotecario',
        ativo: true
      });
    }

    const alunoExiste = await Usuario.findOne({ where: { email: 'aluno@biblioteca.com' } });
    if (!alunoExiste) {
      await Usuario.create({
        nome: 'Maria Aluna',
        email: 'aluno@biblioteca.com',
        senha: await bcrypt.hash('aluno123', 10),
        tipo: 'aluno',
        matricula: '2024001',
        ativo: true
      });
    }

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

seed();
