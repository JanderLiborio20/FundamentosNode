const userController = require("./controllers/useController");

module.exports = [
  {
    endpoint: "/users",
    method: "GET",
    handler: userController.listUsers,
  },
  {
    endpoint: "/users/:id",
    method: "GET",
    handler: userController.getUserById,
  },
];
