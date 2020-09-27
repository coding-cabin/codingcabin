const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login("RAm5zhenr9igSQpK1HoUhZ_xdrFWVMfS");
