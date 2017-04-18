# Main Channel (every visitor is permanently connected to this channel)

defmodule CrowdCrush.UserChannel do

  use CrowdCrush.Web, :channel

  def join("user:" <> user_id, _params, socket) do

    # get user data (if socket has a user authentificated)
    # and deliver it back to frontend
    case socket.assigns.user_id do
      user_id -> {:ok, socket}
      _ -> {:error, %{reason: "unauthorized"}}
    end
  end

end