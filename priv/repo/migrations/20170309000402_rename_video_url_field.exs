defmodule CrowdCrush.Repo.Migrations.RenameVideoUrlField do
  use Ecto.Migration

  def change do
    rename table(:videos), :" url", to: :url
  end
end
