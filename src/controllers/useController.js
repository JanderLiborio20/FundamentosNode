const users = require("../mocks/users");

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;
    if (order) {
      if (order === "desc" || order === "asc") {
        const sortedUsers = users.sort((a, b) => {
          if (order === "desc") return a.id < b.id ? 1 : -1;
          if (order === "asc") return a.id > b.id ? 1 : -1;
        });
        return response.send(200, sortedUsers);
      } else {
        return response.send(400, { error: "User not found" });
      }
    }

    response.send(200, users);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.send(400, { error: "User not found" });
    }
    response.send(200, user);
  },

  createUser(request, response) {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      body = JSON.parse(body);

      const lastUserId = users[users.length - 1].id;

      const newUser = {
        id: lastUserId + 1,
        name: body.name,
      };

      users.push(newUser);
      response.send(200, newUser);
    });
  },
};
