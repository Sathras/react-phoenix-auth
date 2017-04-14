defmodule CrowdCrush.SessionController do

  use CrowdCrush.Web, :controller
  alias CrowdCrush.User

  def create(conn, %{"session" => %{"email" => email, "password" => pass}}) do
    case CrowdCrush.Auth.login_by_email_and_pass(conn, email, pass, repo: Repo) do
      {:ok, conn} ->
        conn
        |> put_flash(:info, "Welcome back!")
        |> redirect(to: page_path(conn, :index))
      {:error, _reason, conn} ->

        changeset = User.login_changeset(%User{})
        conn = ShatteredAscension.PageController.index(conn, nil)

        conn
        |> assign(:error, "signIn")
        |> put_flash(:error, "Invalid email/password combination")
        |> render(ShatteredAscension.PageView, "index.html", changeset: changeset)
    end
  end

  def delete(conn, _) do
    conn
    |> CrowdCrush.Auth.logout()
    |> redirect(to: page_path(conn, :index))
  end
end