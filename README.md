# ReactPhoenixAuth

This can serve as a starting template to create Phoenix single-page-apps utilizing React as Frontend framework.
User Autentification and Session/Channel Management is integrated. Once registered, users can change their email address or password through channel without page reload (example).

This is in a very early Alpha and needs some cleanup. Should be working though.

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * start PostgreSQL `sudo service postgresql start`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

## My Commands
  * `mix ecto.gen.migration create_user` Create Database Migration File
  * `mix ecto.migrate` Incorporates Changes (add before at priv/repo/migrations/file)

## Brunch
  * `npm install -g brunch` Install it
  * `brunch build` Build static assets, complile them and copy to priv/static
  * `brunch build --production` Builds and minifies them for production
  * `brunch watch` not needed (phoenix does that automatically)
