# Teste Kruzer - Integração PipeDrive <> Bling + MongoDB

## Uma integração entre PipeDrive e Bling, com foco na passagem de dados dos pedidos 
## junto de um endpoint para registro e recuperação dos dados em um banco utilizando TypeScript e Express!

Esse é um projeto educacional, com o intuíto de desenvolver e aplicar os conhecimentos possuídos na área em questão.
Além disso o projeto também serve como desafio/teste técnico.

Funcionalidades do projeto:

* Pipedrive: Listar e buscar detalhes de clientes e negócios(pedidos)
* Bling: Buscar e criar contatos(clientes) e vendas(pedidos)
* MongoDB: Registrar e retornar dados dos pedidos (Id, valor e data de integração)

Endpoints disponíveis:

* BaseUrl: http://localhost:3000/api
  Healthcheck: /healthcheck -> Retorna uma mensagem de texto para confirmar que a API está online

* Mongo
  Retrieve orders: /retrieveOrders -> Retorna os dados já registrados no banco, busca baseada em filtro
  Filtros disponíveis: Id, Valor e Data

* PipeDrive:
  Get deals by status: pipedrive/getDealsByStatus -> Retorna uma lista com um número x (limite) de pedidos de um determinado status
  body esperado: {"status": "nome do status", "limit": "numero de limite"}

  Get deal by id: pipedrive/getDealById -> Retorna os detalhes de um pedido em específico, busca baseada no ID do pedido
  body esperado: {"id": "numero do id da deal"}

  Get deal products: pipedrive/getDealProducts -> Retorna os dados dos produtos de um pedido, busca baseada no id do item
  body esperado: {"id": "numero do id do item"}

  * Bling:
    Create order: /bling/createOrder -> Cria o pedido do PipeDrive no Bling (Se necessário, também cria o cliente). Após isso, ID, Valor e Data são enviado para registro no banco
    body esperado: {
			numero: "numero do pedido",
			data: "Data de criação do pedido",
			dataSaida: "Data de envio do pedido",
			dataPrevista: "Data de entrega do pedido",
			contato: {
				id: "Id do contato"
			},
			itens: [{
				quantidade: "quantidade de produtos inclusos no pedido",
				valor: "valor unitário do produto",
				descricao: "nome do produto"
			}],
			parcelas: [{
				dataVencimento: "data de pagamento do pedido",
				valor: "valor total do pedido",
				formaPagamento: {
					id: "Id de pagamento"
				}
			}]
		}