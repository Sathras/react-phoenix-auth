# Main Channel (every visitor is permanently connected to this channel)

defmodule CrowdCrush.MainChannel do
  use CrowdCrush.Web, :channel

  def join("main:lobby", _params, socket) do

    IO.inspect("test")

    # get user data (if socket has a user authentificated)
    # case socket.assigns.user_id do
    #   nil -> {:ok, %{}, socket}
    #     _ ->
    #       user = Repo.get!(CrowdCrush.User, socket.assigns.user_id)
    #       {:ok, %{user: %{
    #         :username => user.username,
    #         :email => user.email,
    #         :name => user.name
    #       }}, socket}
    # end
    data = %{:user => 9}
    {:ok, data, socket}
    # {:reply, {:ok, %{}}, socket}
  end

  # login
  def handle_in("signIn", params, socket) do
    IO.inspect(params)
    {:reply, {:ok, %{}}, socket}
  end

  # if logout is requested, do so
  def handle_in("logout", _params, socket) do

    # if socket.assigns.user_id do
    #   CrowdCrush.Auth.logout()
    # end

  # IO.inspect(params)

  #   changeset = RepoMap.update_changeset(%ShatteredAscension.Map{}, params)

  #   if changeset.valid? do
  #     case Repo.update(changeset) do
  #       {:ok, map} ->
  #         {:reply, {:ok, map}, socket}
  #       {:error, changeset} ->
  #         {:reply, {:error, %{errors: changeset}}, socket}
  #     end
  #   else
  #     # only fetch a single error (the first that can be found)
  #     {:reply, {:error, %{response: %{
  #       type: "error",
  #       msg: elem(elem(List.first(changeset.errors), 1), 0)
  #     }}}, socket}
  #   end
  end
end