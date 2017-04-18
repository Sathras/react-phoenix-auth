defmodule CrowdCrush.PageController do
  use CrowdCrush.Web, :controller
  alias CrowdCrush.User

  def index(conn, params) do
    changeset = User.changeset(%User{}, params)
    IO.inspect(params)
    conn
    |> assign(:path, params[:path])
    |> render("index.html", changeset: changeset)
  end

  def signup(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> CrowdCrush.Auth.login(user)
        |> put_flash(:info, "Thanks for signing up, #{user.username}!")
        |> redirect(to: page_path(conn, :index))
      {:error, changeset} ->
        IO.inspect(changeset)
        conn
        |> assign(:error, "signup")
        |> put_flash(:error, "Registration failed.")
        |> render("index.html", changeset: changeset)
    end
  end

  def signin(conn, %{"user" => %{"email" => email, "password" => pass}}) do
    case CrowdCrush.Auth.login_by_email_and_pass(conn, email, pass, repo: Repo) do
      {:ok, conn} ->
        conn
        |> put_flash(:info, "Welcome back!")
        |> redirect(to: page_path(conn, :index))
      {:error, _reason, conn} ->
        changeset = User.changeset(%User{}, %{email: email, password: pass})
        conn
        |> assign(:error, "signin")
        |> put_flash(:error, "Invalid username/password combination")
        |> render("index.html", changeset: changeset)
    end
  end

  def signout(conn, _) do
    conn
    |> CrowdCrush.Auth.logout()
    |> redirect(to: page_path(conn, :index))
  end
end
