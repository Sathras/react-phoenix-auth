# Main Channel (every visitor is permanently connected to this channel)

defmodule CrowdCrush.MainChannel do
  use CrowdCrush.Web, :channel

  def join("main", _params, socket) do

    # get user data
    user = Repo.get!(CrowdCrush.User, socket.assigns.user_id)
    user = %{
      :username => user.username,
      :email => user.email,
      :name => user.name
    }

    {:ok, %{user: user}, socket}
  end

  # if logout is requested, do so
  def handle_in("logout", _params, socket) do

    if socket.assigns.user_id do
      CrowdCrush.Auth.logout()
    end

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