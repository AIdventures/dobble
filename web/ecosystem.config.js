module.exports = {
    apps: [
      {
        name: "dobble-app",
        script: "npm",
        args: "start",
        watch: true,
        env: {
          PORT: 8989,
        },
      },
    ],
  };