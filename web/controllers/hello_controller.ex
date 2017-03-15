defmodule CrowdCrush.HelloController do
  use CrowdCrush.Web, :controller

  def world(conn, _params) do
    render conn, "world.html"
  end
end