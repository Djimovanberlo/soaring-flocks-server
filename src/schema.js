const { gql } = require("apollo-server");

const typeDefs = gql`
  type Game {
    id: Int!
    gameTitle: String!
    gameTime: Int!
    gameTimePassed: Int!
    closed: Boolean!
    players: [Player!]!
  }

  type Player {
    id: Int!
    name: String!
    email: String!
    inGame: Boolean!
    img: String
    ability: String
    gameId: Int
    game: Game
    messages: [Message!]!
    trades: [Trade!]!
    resources: [Resource]!
  }

  type Message {
    id: Int!
    content: String!
    playerId: Int!
    player: Player!
  }

  type Trade {
    id: Int!
    closed: Boolean!
    playerSenderId: Int!
    playerReceiverId: Int!
    player: Player!
    tradeResources: [TradeResource!]!
  }

  type Resource {
    id: Int!
    type: String!
    tradeResources: [TradeResource!]!
    players: [Player!]
  }

  type TradeResource {
    id: Int!
    quantitySent: Int
    quantityReceived: Int
    tradeId: Trade!
    trade: Trade!
    resourceSent: Int
    resourceReceived: Int
    resource: Resource
  }

  type PlayerResource {
    id: Int!
    quantity: Int
    playerId: Int
    player: Player
    resourceId: Int
    resource: Resource
  }

  type Query {
    player(id: Int!): Player
    allPlayers(inGame: Boolean): [Player]
  }

  type Mutation {
    createPlayer(
      name: String!
      email: String!
      password: String!
      inGame: Boolean!
    ): Player!
    # values when start game: inGame=true, img=randomized, gameId=gameId
    # values when leave game: inGame=false, img=null, gameId=null, build=null, ability=null
    # set build / ability when selected

    createMessage(content: String!, playerId: Int!): Message!
  }
`;

module.exports = typeDefs;
