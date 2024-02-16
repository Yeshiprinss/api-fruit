import server from "./src/server";

const port = process.env.PORT || 3100;

(() => {
  try {
     server.listen(port, () => {
      console.log(`🚀 listening at ${port} 🚀`); // eslint-disable-line no-console
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()
