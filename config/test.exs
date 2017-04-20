use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :react_phoenix_auth, ReactPhoenixAuth.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :react_phoenix_auth, ReactPhoenixAuth.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgresql",
  database: "react_phoenix_auth_test",
  hostname: "localhost",
  template: "template0",
  pool: Ecto.Adapters.SQL.Sandbox
