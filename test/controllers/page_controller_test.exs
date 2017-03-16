defmodule CrowdCrush.PageControllerTest do
  use CrowdCrush.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to CrowdCrush!"
  end
end
