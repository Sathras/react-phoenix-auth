defmodule CrowdCrush.Annotation do
  use CrowdCrush.Web, :model

  schema "annotations" do
    field :body, :string
    field :at, :integer
    belongs_to :user, CrowdCrush.User
    belongs_to :video, CrowdCrush.Video

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :at])
    |> validate_required([:body, :at])
  end
end
