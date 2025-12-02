import bcrypt from 'bcrypt';
import db from '../models/index';

const Usuario = db.Usuario;

async function seed() {
  try {
    await db.sequelize.sync({ force: false });

    await Usuario.create({
      nome: 'Admin Sistema',
      email: 'admin@biblioteca.com',
      senha: await bcrypt.hash('admin123', 10),
      tipo: 'admin',
      ativo: true
    });

    await Usuario.create({
      nome: 'João Bibliotecário',
      email: 'bibliotecario@biblioteca.com',
      senha: await bcrypt.hash('biblio123', 10),
      tipo: 'bibliotecario',
      ativo: true
    });

    await Usuario.create({
      nome: 'Maria Aluna',
      email: 'aluno@biblioteca.com',
      senha: await bcrypt.hash('aluno123', 10),
      tipo: 'aluno',
      matricula: '2024001',
      ativo: true
    });

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}
seed();
