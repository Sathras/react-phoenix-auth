defmodule ReactPhoenixAuth.VideoViewTest do
  use ReactPhoenixAuth.ConnCase, async: true
  import Phoenix.View

  test "renders index.html", %{conn: conn} do
    videos = [%ReactPhoenixAuth.Video{id: "1", title: "dogs"},
              %ReactPhoenixAuth.Video{id: "2", title: "cats"}]
    content = render_to_string(ReactPhoenixAuth.VideoView, "index.html",
                               conn: conn, videos: videos)

    assert String.contains?(content, "Listing videos")
    for video <- videos do
      assert String.contains?(content, video.title)
    end
  end


  test "renders new.html", %{conn: conn} do
    changeset = ReactPhoenixAuth.Video.changeset(%ReactPhoenixAuth.Video{})
    categories = [{"cats", 123}]
    content = render_to_string(ReactPhoenixAuth.VideoView, "new.html",
      conn: conn, changeset: changeset, categories: categories)

    assert String.contains?(content, "New video")
  end
end
