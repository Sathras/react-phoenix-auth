defmodule CrowdCrush.Router do
  use CrowdCrush.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_layout, false                     # globally disables layouts
    plug CrowdCrush.Auth, repo: CrowdCrush.Repo
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CrowdCrush do

    pipe_through :browser # Use the default browser stack

    post "/signin", PageController, :signin
    post "/signup", PageController, :signup
    get "/signout", PageController, :signout

    get "/",        PageController, :index
    get "/:path",   PageController, :index

    # get "/hello", HelloController, :world


    resources "/users", UserController, only: [:index, :show, :new, :create]

    get "/watch/:id", WatchController, :show
  end


  scope "/manage", CrowdCrush do
    pipe_through [:browser, :authenticate_user]

    resources "/videos", VideoController
  end
  # Other scopes may use custom stacks.
  # scope "/api", CrowdCrush do
  #   pipe_through :api
  # end
end
