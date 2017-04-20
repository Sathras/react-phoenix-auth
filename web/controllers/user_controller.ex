defmodule ReactPhoenixAuth.UserController do
  use ReactPhoenixAuth.Web, :controller
  plug :authenticate_user when action in [:index, :show]

  def index(conn, _params) do
    users = Repo.all(ReactPhoenixAuth.User)
    render conn, "index.html", users: users
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get(ReactPhoenixAuth.User, id)
    render conn, "show.html", user: user
  end

  alias ReactPhoenixAuth.User

  def new(conn, _params) do
    changeset = User.changeset(%User{})
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> ReactPhoenixAuth.Auth.login(user)
        |> put_flash(:info, "#{user.name} created!")
        |> redirect(to: user_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end
