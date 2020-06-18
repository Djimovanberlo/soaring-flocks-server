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
    gameId: Game!
    messages: [Message!]!
    trades: [Trade!]!
    resources: [Resource]!
  }

  type Message {
    id: Int!
    content: String!
    playerId: Player!
  }

  type Trade {
    id: Int!
    closed: Boolean!
    playerSenderId: Player!
    playerReceiverId: Player!
    tradeResource: [TradeResource!]!
  }

  type Resource {
    id: Int!
    type: String!
    tradeResource: [TradeResource!]!
    players: [Player!]
  }

  type TradeResource {
    id: Int!
    quantitySent: Int
    quantityReceived: Int
    tradeId: Trade!
    resourceSent: Resource
    resourceReceived: Resource
  }

  type PlayerResource {
    id: int!
    quantity: Int
    playerId: Player
    resourceId: Resource
  }

  # ----

  type Query {
    player(id: Int!): Player
    playerInGame(inGame: Boolean!)
    allPlayers: [Player!]!
  }

  type Mutation {
    createPlayer(name: String!
    email: String!
    password: String!
    inGame: Boolean!): Player!
    # values when start game: inGame=true, img=randomized, gameId=gameId
    # values when leave game: inGame=false, img=null, gameId=null, build=null, ability=null
    # build / ability when selected

    createMessage(
      content: String!
      playerId: Int!
    ): Message!
  }
`;

module.exports = typeDefs;
