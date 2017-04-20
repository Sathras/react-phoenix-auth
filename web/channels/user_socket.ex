defmodule ReactPhoenixAuth.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "main", ReactPhoenixAuth.MainChannel
  channel "user:*", ReactPhoenixAuth.UserChannel
  channel "videos:*", ReactPhoenixAuth.VideoChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  @max_age 2 * 7 * 24 * 60 * 60

  # always allow connection but attempt to verify token if given and store user_id in socket
  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "user socket", token, max_age: @max_age) do
      {:ok, user_id} -> {:ok, assign(socket, :user_id, user_id)}
      {:error, _reason} -> {:ok, assign(socket, :user_id, nil)}
    end
  end

  # def connect(_params, socket) do
  #   {:ok, socket}
  # end

  def connect(_params, _socket), do: :error

  # def id(socket), do: "users_socket:#{socket.assigns.user_id}"

  def id(socket) do
    if socket.assigns.user_id do "users_socket:#{socket.assigns.user_id}" else nil end
  end
end