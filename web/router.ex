defmodule ReactPhoenixAuth.Router do
  use ReactPhoenixAuth.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_layout, false                     # globally disables layouts
    plug ReactPhoenixAuth.Auth, repo: ReactPhoenixAuth.Repo
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ReactPhoenixAuth do

    pipe_through :browser # Use the default browser stack

    post "/signin", PageController, :signin
    post "/signup", PageController, :signup
    get "/signout", PageController, :signout

    get "/",        PageController, :index
    get "/:path",   PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", ReactPhoenixAuth do
  #   pipe_through :api
  # end
end
