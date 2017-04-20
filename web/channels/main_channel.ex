# Main Channel (every visitor is permanently connected to this channel)

defmodule ReactPhoenixAuth.MainChannel do

  use ReactPhoenixAuth.Web, :channel

  def join("main", _params, socket) do

    # get user data (if socket has a user authentificated)
    # and deliver it back to frontend
    # case socket.assigns.user_id do
    #   nil -> {:ok, %{user: nil}, socket}
    #     _ ->
    #       user = Repo.get!(ReactPhoenixAuth.User, socket.assigns.user_id)
    #       {:ok, %{user: %{
    #         :username => user.username,
    #         :email => user.email,
    #         :name => user.name
    #       }}, socket}
    # end
    {:ok, socket}
  end

end