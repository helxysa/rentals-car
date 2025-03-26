# Sistema de Locação de Veículos

Este é um sistema de gerenciamento de locação de veículos desenvolvido com AdonisJS. O sistema permite o cadastro de usuários, clientes, carros e o gerenciamento de locações.

## Funcionalidades

- Cadastro e gerenciamento de usuários
- Cadastro e gerenciamento de clientes
- Cadastro e gerenciamento de veículos
- Gerenciamento de locações
- Sistema de status para locações (pending, active, completed, cancelled)

## Requisitos

- Node.js
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/helxysa/rentals-car.git
cd hello-world
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure o banco de dados
- Crie um arquivo `.env` na raiz do projeto
- Configure as variáveis de ambiente do banco de dados:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

4. Execute as migrações
```bash
node ace migration:run
```

5. Inicie o servidor
```bash
node ace serve
```

O servidor estará rodando em `http://localhost:3333`

## Endpoints e JSONs para Teste

Para testar o sistema, siga a ordem abaixo dos endpoints e seus respectivos JSONs:

### 1. Criar Usuário
```http
POST http://localhost:3333/users
```
```json
{
  "email": "usuario@teste.com",
  "password": "123456"
}
```

### 2. Criar Cliente
```http
POST http://localhost:3333/clients
```
```json
{
  "user_id": 1,
  "name": "João Silva",
  "cpf": "123.456.789-00",
  "phone": "(11) 99999-9999"
}
```

### 3. Criar Carro
```http
POST http://localhost:3333/cars
```
```json
{
  "model": "Civic",
  "plate": "ABC1234",
  "brand": "Honda",
  "isAvailable": true,
  "dailyRate": 150.00
}
```

### 4. Criar Locação
```http
POST http://localhost:3333/rentals
```
```json
{
  "client_id": 1,
  "car_id": 1,
  "rental_start": "2024-03-26T00:00:00.000Z",
  "rental_end": "2024-03-28T00:00:00.000Z",
  "status": "pending",
  "total_value": 450.00,
  "commitment_term_signed": true
}
```

## Outros Endpoints

### Usuários
- GET `/users` - Listar todos os usuários
- GET `/users/:id` - Buscar usuário específico
- PUT `/users/:id` - Atualizar usuário
- DELETE `/users/:id` - Deletar usuário

### Clientes
- GET `/clients` - Listar todos os clientes
- GET `/clients/:id` - Buscar cliente específico
- PUT `/clients/:id` - Atualizar cliente
- DELETE `/clients/:id` - Deletar cliente

### Carros
- GET `/cars` - Listar todos os carros
- PUT `/cars/:id` - Atualizar carro
- DELETE `/cars/:id` - Deletar carro

### Locações
- GET `/rentals` - Listar todas as locações
- PUT `/rentals/:id` - Atualizar locação
- DELETE `/rentals/:id` - Deletar locação

## Observações Importantes

1. Sempre crie os registros na ordem especificada:
   - Primeiro o usuário
   - Depois o cliente (que precisa de um user_id)
   - Depois os carros
   - Por fim as locações (que precisam de client_id e car_id)

2. Os IDs nos exemplos (user_id: 1, car_id: 1) devem ser substituídos pelos IDs reais criados no seu banco de dados.

3. As datas nas locações devem ser no formato ISO 8601 e representar datas futuras válidas.

4. O campo `total_value` da locação é calculado multiplicando o `dailyRate` do carro pelo número de dias entre `rental_start` e `rental_end`. 
