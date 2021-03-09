const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./models/users');
const ruas = require('./models/ruas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./auth');

const url = 'mongodb+srv://samuel:9647ourstreet@clusterourstreet.0w4e8.mongodb.net/ourStreet?retryWrites=true&w=majority';
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true }

//Concexao

mongoose.connect(url, options);
//mongoose.set('useCreateIndex', true)

mongoose.connection.on('connected', () => {
	console.log("Aplicação conectada ao banco de dados!");
});
mongoose.connection.on('error', (err) => {
	console.log("Erro na conexão com banco de dados:" + err);
});
mongoose.connection.on('disconnected', () => {
	console.log("Aplicação desconectada do banco de dados!");
});

//#######################################################

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', auth, (req, res) => {

	users.find({}, (err, data) => {
		if (err) return res.send({ error: 'Erro na consulta de usuário!' });
		return res.send(data);
	});
});

// Exibindo ruas
app.get('/ruas', (req, res) => {
	
	ruas.find({}, (err, data) => {
		if (err) return res.send({ error: 'Erro ao consultar rua!' 
	});

	resposta = data.map( (dados) => {
		return {"rua" : dados.rua, "cep" : dados.cep, "bairro" : dados.bairro, "cidade" : dados.cidade, "calçamento" : dados.calçamento, "saneamento" : dados.saneamento}
	})
	return res.send(resposta);
		
	});
});

// Buscar rua por cep
app.get('/rua/:cep', (req, res) => {
	var cep = req.params.cep;
	ruas.find({'cep':cep}, (err, data) => {	
		if (err) return res.send({ error: 'Erro ao consultar rua!' 
	});

	resposta = data.map( (dados) => {
		return {"rua" : dados.rua, "cep" : dados.cep, "bairro" : dados.bairro, "cidade" : dados.cidade, "calçamento" : dados.calçamento, "saneamento" : dados.saneamento}
	})
	return res.send(resposta);
		
	});
});

/* Buscar rua por nome
app.get('/rua/nome/:rua', (req, res) => {
	var str = req.params.rua;
	var rua = str.replace(/%20/g, " ");
	ruas.find({'rua':rua}, (err, data) => {	
		if (err) return res.send({ error: 'Erro ao consultar rua!' 
	});

	return res.send(data);
		
	});
});*/

// Exibir ruas calçadas
app.get('/ruas/calcadas', (req, res) => {
	ruas.find({'calçamento':'calçada'}, (err, data) => {	
		if (err) return res.send({ error: 'Erro ao consultar ruas!' 
	});

	resposta = data.map( (dados) => {
		return {"rua" : dados.rua, "cep" : dados.cep, "bairro" : dados.bairro, "cidade" : dados.cidade, "calçamento" : dados.calçamento, "saneamento" : dados.saneamento}
	})
	return res.send(resposta);
		
	});
});

// Exibir ruas nao calcadas
app.get('/ruas/naocalcadas', (req, res) => {
	ruas.find({'calçamento':'não calçada'}, (err, data) => {	
		if (err) return res.send({ error: 'Erro ao consultar ruas' 
	});

	resposta = data.map( (dados) => {
		return {"rua" : dados.rua, "cep" : dados.cep, "bairro" : dados.bairro, "cidade" : dados.cidade, "calçamento" : dados.calçamento, "saneamento" : dados.saneamento}
	})
	return res.send(resposta);
		
	});
});

// Exibir ruas saneadas
app.get('/ruas/saneadas', (req, res) => {
	ruas.find({'saneamento':'saneada'}, (err, data) => {	
		if (err) return res.send({ error: 'Erro ao consultar ruas!' 
	});

	resposta = data.map( (dados) => {
		return {"rua" : dados.rua, "cep" : dados.cep, "bairro" : dados.bairro, "cidade" : dados.cidade, "calçamento" : dados.calçamento, "saneamento" : dados.saneamento}
	})
	return res.send(resposta);
		
	});
});

// Exibir ruas nao saneadas
app.get('/ruas/naosaneadas', (req, res) => {
	ruas.find({'saneamento':'não saneada'}, (err, data) => {	
		if (err) return res.send({ error: 'Erro ao consultar ruas' 
	});

	resposta = data.map( (dados) => {
		return {"rua" : dados.rua, "cep" : dados.cep, "bairro" : dados.bairro, "cidade" : dados.cidade, "calçamento" : dados.calçamento, "saneamento" : dados.saneamento}
	})
	return res.send(resposta);
		
	});
});

// adicionando rua
app.post('/createStreet', auth, (req, res) => {
	const { rua, cep, bairro, cidade, calçamento, saneamento } = req.body;
	if (!rua || !cep || !bairro || !cidade || !calçamento || !saneamento) return res.send({ error: 'Dados insuficientes para cadastrar rua!' });

	ruas.findOne({cep}, (err, data) => {
		if (err) return res.send({ error: 'Erro ao buscar rua!' });
		if (data) return res.send({ error: 'rua já cadastrado' });

		ruas.create(req.body, (err, data) => {
			if (err) return res.send({ error: 'Erro ao adicionar rua' });
			data.cep = undefined;
			return res.send(data);
		});
	});
})

// editar rua
app.put('/editStreet/:cep', auth, (req, res) => {
	const { rua, bairro, calçamento, saneamento } = req.body;
	if (!rua || !bairro || !calçamento || !saneamento) return res.send({ error: 'Dados insuficientes para editar rua!' });
	var cep = req.params.cep;
	ruas.findOneAndUpdate({'cep':cep}, req.body, {new: true}, (err, dados) => {
		if (err) return res.send({ error: 'Erro ao atualizar rua!' });
		if (dados) return res.send(dados);
	});
})

// criando usuário
app.post('/create', (req, res) => {
	const { nome, email, senha } = req.body;
	if (!nome || !email || !senha) return res.send({ error: 'Dados insuficientes!' });

	users.findOne({ email }, (err, data) => {
		if (err) return res.send({ error: 'Erro ao buscar usuário!' });
		if (data) return res.send({ error: 'usuário já cadastrado' });

		users.create(req.body, (err, data) => {
			if (err) return res.send({ error: 'Erro ao criar usuário' });

			data.senha = undefined;
			return res.send({ data, token: createUserToken(data.id) });
		});
	});
})

// editar usuario
app.put('/editUser/:email', auth, (req, res) => {
	const {senha} = req.body;
	if (!senha) return res.send({ error: 'Dados insuficientes para editar usuário!' });
	var email = req.params.email;
	ruas.findOneAndUpdate({'email':email}, req.body, {new: true}, (err, dados) => {
		if (err) return res.send({ error: 'Erro ao atualizar usuário!' });
		data.senha = undefined;
		if (dados) return res.send(dados);
	});
})

app.post('/auth', auth, (req, res) => {
	const {email, senha} = req.body;

	if (!email || !senha) return res.send({ error: 'Dados insuficientes!' });

	users.findOne({ email }, (err, data) => {
		if (err) return res.send({ error: 'Erro ao buscar usuário!' });
		if (!data) return res.send({ error: 'Usuário não registrado' });

		bcrypt.compare(senha, data.senha, (err, same) => {

			if (!same) return res.send({ error: 'Erro ao autenticar usuário!' });

			return res.send({ data, token: createUserToken(data.id) });
		});

	});

});

app.get('/authentication', (req, res) => {
	users.find({}, (err, data) => {	
		if (err) return res.send({ error: 'Erro ao autenticar usuário!' 
	});

	return res.send('Usuário autenticado!');
		
	});
});

app.listen(3000, () => {
	console.log(`Example app listening at http://localhost:3000`)

})


const createUserToken = (userId) => {

	return jwt.sign({ id: userId }, 'umasenha', { expiresIn: '30d' });

}