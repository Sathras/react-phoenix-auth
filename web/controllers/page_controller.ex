defmodule CrowdCrush.PageController do
  use CrowdCrush.Web, :controller
  alias CrowdCrush.User

  def index(conn, params) do
    changeset_signUp = User.registration_changeset(%User{}, params)
    changeset_signIn = User.login_changeset(%User{}, params)

    conn
    |> render("index.html", %{
        changeset_login: changeset_signIn,
        changeset_signup: changeset_signUp
      })
  end
end
