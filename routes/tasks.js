const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

// GET /api/tasks — lista todas as tarefas
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tasks — cria uma nova tarefa
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'O título é obrigatório' });
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: title.trim(), description: description || '', done: false }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/tasks/:id — marca tarefa como feita/não feita
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;

    const { data, error } = await supabase
      .from('tasks')
      .update({ done })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data.length) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id — apaga uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Tarefa apagada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
