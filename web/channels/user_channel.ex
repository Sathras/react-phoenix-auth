# Main Channel (every visitor is permanently connected to this channel)

defmodule ReactPhoenixAuth.UserChannel do

  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  use ReactPhoenixAuth.Web, :channel
  alias ReactPhoenixAuth.User

  def join("user:" <> user_id, _params, socket) do

    # get user data (if socket has a user authentificated)
    # and deliver it back to frontend
    case socket.assigns.user_id do
      user_id -> {:ok, socket}
      _ -> {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("changeUserSettings", params, socket) do

    # see if old password matches the one in database
    user = Repo.get_by(ReactPhoenixAuth.User, id: socket.assigns.user_id)

    cond do
      # old password matched --> continue
      user && checkpw(params["oldPassword"], user.password_hash) ->

        # apply changeset to see if changes are valid
        params = Map.delete(params, "oldPassword")
        changeset = User.changeset_update(user, params)

        # change email / password and respond to client
        case Repo.update(changeset) do
          {:ok, user} ->
            {:reply, :ok, socket}
          {:error, changeset} ->
            {:error, :invalid_data, socket}
        end

      # old password was wrong --> unauthorized
      user ->
        {:error, :unauthorized, socket}

      # user not found (should never happen)
      true ->
        dummy_checkpw()
        {:error, :not_found, socket}
    end
  end
end