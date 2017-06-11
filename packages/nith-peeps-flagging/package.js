Package.describe({
  name: "nith:peeps-flagging",
  summary: "NIT People Flagging System",
  version: "0.0.1",
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.0");

  api.use(["vulcan:core@1.4.0"], ["client", "server"]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");
});
