# 📋 TaskApp — Lista de Tarefas

Aplicação web para gerenciar tarefas, desenvolvida com Node.js, Express e Supabase (PostgreSQL na nuvem).

## 👥 Integrantes

| Nome | Matrícula | Responsabilidade |
|------|-----------|-----------------|
| Participante 1 | 000001 | Backend (servidor, rotas, banco de dados) |
| Participante 2 | 000002 | Frontend (interface), testes e CI/CD |

## 🔗 Links

- **Repositório:** https://github.com/SEU_USUARIO/taskapp-bootcamp
- **Aplicação publicada:** https://taskapp-bootcamp.onrender.com

---

## 🛠️ Tecnologias

- **Backend:** Node.js + Express
- **Banco de Dados:** Supabase (PostgreSQL na nuvem)
- **Frontend:** HTML, CSS e JavaScript puro
- **Testes:** Jest + Supertest
- **CI/CD:** GitHub Actions
- **Deploy:** Render.com

---

## 🚀 Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/SEU_USUARIO/taskapp-bootcamp.git
cd taskapp-bootcamp
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Abra o arquivo `.env` e coloque as suas credenciais do Supabase.

### 4. Crie a tabela no Supabase

No painel do Supabase, vá em **SQL Editor** e rode:
```sql
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Inicie o servidor
```bash
npm run dev
```

Acesse: http://localhost:3000

### 6. Rode os testes
```bash
npm test
```

---

## 📁 Estrutura do projeto

```
taskapp/
├── index.js              ← Servidor principal
├── routes/
│   └── tasks.js          ← Rotas da API (GET, POST, PATCH, DELETE)
├── db/
│   └── supabase.js       ← Conexão com o banco de dados
├── public/
│   └── index.html        ← Interface do usuário
├── __tests__/
│   └── tasks.test.js     ← Testes automáticos
├── .github/
│   └── workflows/
│       └── ci.yml        ← Pipeline de CI
├── .env.example          ← Modelo de variáveis de ambiente
└── package.json
```

---

## 🔌 Endpoints da API

| Método | URL | O que faz |
|--------|-----|-----------|
| GET | /api/tasks | Retorna todas as tarefas |
| POST | /api/tasks | Cria uma nova tarefa |
| PATCH | /api/tasks/:id | Marca como feita/não feita |
| DELETE | /api/tasks/:id | Apaga uma tarefa |

---

## 📦 Deploy no Render.com

1. Crie conta em [render.com](https://render.com)
2. Clique em **New Web Service** e conecte seu repositório
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Em **Environment Variables**, adicione `SUPABASE_URL` e `SUPABASE_KEY`
5. Clique em **Deploy**
