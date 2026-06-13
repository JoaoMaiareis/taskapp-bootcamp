const request = require('supertest');
const app = require('../index');

jest.mock('../db/supabase', () => {
  const tarefasMock = [
    { id: 1, title: 'Estudar Node.js', description: '', done: false, created_at: new Date().toISOString() },
    { id: 2, title: 'Fazer trabalho', description: 'Bootcamp final', done: true, created_at: new Date().toISOString() },
  ];

  const mockSelect = jest.fn().mockResolvedValue({ data: tarefasMock, error: null });
  const mockOrder = jest.fn().mockReturnValue({ data: tarefasMock, error: null });
  const mockInsert = jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue({ data: [{ id: 3, title: 'Nova tarefa', done: false }], error: null }),
  });
  const mockUpdate = jest.fn().mockReturnValue({
    eq: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [{ id: 1, done: true }], error: null }),
    }),
  });
  const mockDelete = jest.fn().mockReturnValue({
    eq: jest.fn().mockResolvedValue({ error: null }),
  });

  return {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockResolvedValue({ data: tarefasMock, error: null }),
      }),
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
    })),
  };
});

describe('GET /api/tasks', () => {
  it('deve retornar lista de tarefas', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/tasks', () => {
  it('deve criar uma nova tarefa com título válido', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Nova tarefa', description: 'Descrição' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title');
  });

  it('deve retornar erro 400 se o título estiver vazio', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('PATCH /api/tasks/:id', () => {
  it('deve atualizar o status da tarefa', async () => {
    const res = await request(app)
      .patch('/api/tasks/1')
      .send({ done: true });
    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('deve apagar uma tarefa', async () => {
    const res = await request(app).delete('/api/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});

describe('GET /health', () => {
  it('deve retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
