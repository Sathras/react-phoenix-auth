defmodule CrowdCrush.WatchController do
  use CrowdCrush.Web, :controller
  alias CrowdCrush.Video

  def show(conn, %{"id" => id}) do
    video = Repo.get!(Video, id)
    render conn, "show.html", video: video
  end
end