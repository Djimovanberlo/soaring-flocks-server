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
    id: Int
    name: String
    email: String
    inGame: Boolean
    img: String
    build: String
    ability: String
    abilityParam: String
    moneyCash: Int
    egg: Int
    feather: Int
    bug: Int
    vPoint: Int
    mMarket: Int
    rMarket: Int
    vMarket: Int
    gameId: Int
    game: Game
    publicMessages: [PublicMessage]
    privateMessages: [PrivateMessage]
    trades: [Trade]
  }

  type PrivateMessage {
    id: Int!
    content: String
    createdAt: String
    updatedAt: String
    playerSenderId: Player
    playerReceiverId: Player
  }

  type PublicMessage {
    id: Int!
    content: String
    createdAt: String
    updatedAt: String
    playerId: Player
  }

  type Trade {
    id: Int
    moneyCashSender: Int
    moneyCashReceiver: Int
    eggSender: Int
    eggReceiver: Int
    featherSender: Int
    featherReceiver: Int
    bugSender: Int
    bugReceiver: Int
    vPointSender: Int
    vPointReceiver: Int
    closed: Boolean
    playerSenderId: Player
    playerReceiverId: Player
  }

  type Query {
    getPlayerById(id: Int): Player

    getAllPlayersGameState(inGame: Boolean): [Player]

    getAllPublicMessages: [PublicMessage]

    getPrivateMessagesById(
      playerSenderId: Int
      playerReceiverId: Int
    ): [PrivateMessage]

    getTradesById(
      playerSenderId: Int
      playerReceiverId: Int
      closed: Boolean
    ): Trade

    getGameById(id: Int): Game
  }

  type Mutation {
    createPlayer(name: String, email: String, password: String): Player!

    createPublicMessage(playerId: Int, content: String): PublicMessage

    closeTrade(id: Int, closed: Boolean): Trade

    createAttack(playerId: Int, ability: String): Player

    acceptTrade(
      id: Int
      playerSenderId: Int
      playerReceiverId: Int
      moneyCashSender: Int
      moneyCashReceiver: Int
      eggSender: Int
      eggReceiver: Int
      featherSender: Int
      featherReceiver: Int
      bugSender: Int
      bugReceiver: Int
    ): Trade

    suggestTrade(
      id: Int
      playerSenderId: Int
      playerReceiverId: Int
      moneyCashSender: Int
      moneyCashReceiver: Int
      eggSender: Int
      eggReceiver: Int
      featherSender: Int
      featherReceiver: Int
      bugSender: Int
      bugReceiver: Int
    ): Trade
    # values when start game: inGame=true, img=randomized, gameId=gameId
    # values when leave game: inGame=false, img=null, gameId=null, build=null, ability=null
    # set build / ability when selected

    addBuild(id: Int, build: String): Player
    addAbility(id: Int, ability: String): Player

    # createPublicMessage(content: String!, playerId: Int!): PublicMessage!
  }

  type Subscription {
    getAllPublicMessages: [PublicMessage]
  }
  # type Resource {
  #   id: Int!
  #   type: String!
  #   tradeResources: [TradeResource!]!
  #   playerResources: [PlayerResource]
  #   players: [Player]
  # }

  # type Message {
  #   id: Int!
  #   content: String!
  #   playerId: Int!
  #   player: Player!
  # }

  # type Trade {
  #   id: Int!
  #   closed: Boolean!
  #   playerSenderId: Int!
  #   playerReceiverId: Int!
  #   player: Player!
  #   tradeResources: [TradeResource!]!
  # }

  # type TradeResource {
  #   id: Int!
  #   quantitySent: Int
  #   quantityReceived: Int
  #   tradeId: Trade!
  #   trade: Trade!
  #   resourceSent: Int
  #   resourceReceived: Int
  #   resource: Resource
  # }

  # type PlayerResource {
  #   id: Int!
  #   quantity: Int
  #   playerId: Int
  #   player: [Player]
  #   resourceId: Int
  #   resource: [Resource]
  # }
`;

module.exports = typeDefs;
