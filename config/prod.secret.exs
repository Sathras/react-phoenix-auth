use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or you later on).
config :crowd_crush, CrowdCrush.Endpoint,
  secret_key_base: "9x7Anbpwr7D5EUH8NaKrk+HvaAH2n/8ULdqmhA/2GgxYHv/Pex0/xceciEbukbac"

# Configure your database
config :crowd_crush, CrowdCrush.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "crowd_crush_prod",
  pool_size: 20
