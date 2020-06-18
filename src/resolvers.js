const resolvers = {
  Query: {
    async player(root, { id }, { models }) {
      return models.player.findById(id);
    },
    async playerInGame(root, args, { id }, { models }) {
      return models.player.findAll((player) => player.inGame === args.inGame);
    },
    async allPlayers(root, args, { models }) {
      return models.player.findAll();
    },
  },
};

module.exports = resolvers;
