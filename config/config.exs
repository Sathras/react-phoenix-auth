# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :react_phoenix_auth,
  ecto_repos: [ReactPhoenixAuth.Repo]

# Configures the endpoint
config :react_phoenix_auth, ReactPhoenixAuth.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "E34na4J3MaLbTF1S/sClGDN4gq6XurO+8xVar6AI0gmZMKovZkDFk1yzyQAKchhm",
  render_errors: [view: ReactPhoenixAuth.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ReactPhoenixAuth.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
