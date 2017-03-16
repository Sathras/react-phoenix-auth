defmodule CrowdCrush.AnnotationView do
  use CrowdCrush.Web, :view
  def render("annotation.json", %{annotation: ann}) do
    %{
      id: ann.id,
      body: ann.body,
      at: ann.at,
      user: render_one(ann.user, CrowdCrush.UserView, "user.json")
    }
  end
end