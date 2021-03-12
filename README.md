# OurStreet
O projeto busca analisar a situação real que se encontram as ruas e avenidas, do que diz respeito a sua pavimentação, sendo assim o usuário será capaz de ver se o que consta na documentação da prefeitura é realmente o que está presente na realidade, podendo o usuário reportar os casos onde há esse engano para uma maior visibilidade da comunidade e dos órgãos responsáveis. Pensando nisso foi desenvolvida esta API para facilitar a consulta a esses dados por terceiros.
# Documentação da API:
A API pretende disponibilizar uma base de dados e consulta aos usuários sobre o estado atual das ruas em seu município, mostrando informações como ruas calçadas, ruas não calçadas, e ruas com ou sem saneamento. Inicialmente a base de dados cadastrada conta apenas com as ruas da cidade de Natal/RN.
## Filtrar rua por Cep
A rota /rua/< cep > permitirá que a partir do CEP a API exiba as informações do local como o nome da rua, bairro, cidade, situação de calçamento da rua e situação de pavimentação.
## Filtrar rua por nome
A rota /rua/< rua > permitirá que a partir do nome da rua a API exiba as informações do local como o nome da rua, bairro, cidade, situação de calçamento da rua e situação de pavimentação. Essa rota realiza a consulta de forma semelhante ao operador like no SQL.
## Filtrar por bairro
A rota /ruas/bairro/< bairro > exibirá as ruas agrupadas pelo bairro informando os nomes da ruas, cidade, situação de calçamento da rua e situação de pavimentação. 
## Filtrar por zona administrativa
A rota /ruas/zona/< zona > exibirá as ruas agrupadas pela zona administrativa da cidadde (norte/sul/leste/oeste) informando os nomes da ruas, bairro, cidade, situação de calçamento da rua e situação de pavimentação. 
## Filtrar por ruas calçadas ou não calçadas
As rotas /ruas/calcadas e /ruas/naocalcadas agruparão respectivamente as ruas da cidade nessas duas situações.
## Filtrar por ruas saneadas ou não saneadas
De forma semelhante, as rotas /ruas/saneadas e /ruas/naosaneadas agruparão respectivamente as ruas da cidade nessas duas situações.
