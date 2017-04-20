defmodule ReactPhoenixAuth.PageControllerTest do
  use ReactPhoenixAuth.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to ReactPhoenixAuth!"
  end
end
