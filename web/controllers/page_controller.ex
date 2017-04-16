defmodule CrowdCrush.PageController do
  use CrowdCrush.Web, :controller
  alias CrowdCrush.User

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [conn, conn.params, conn.assigns.current_user])
  end

  def index(conn, params, user) do
    # check if user is authentificated
    case user do
      nil -> render(conn, "index.html")
      _   ->
        # if not authentificated attach changeset
        changeset = User.registration_changeset(%User{}, params)
        render(conn, "index.html", changeset: changeset)
    end
  end

  def signin(conn, %{"user" => %{"email" => email, "password" => pass}}, user) do
    case CrowdCrush.Auth.login_by_email_and_pass(conn, email, pass, repo: Repo) do
      {:ok, conn} ->
        conn
        |> put_flash(:info, "Welcome back!")
        |> redirect(to: page_path(conn, :index))
      {:error, _reason, conn} ->
        changeset = User.login_changeset(%User{}, %{email: email, password: pass})
        conn
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
