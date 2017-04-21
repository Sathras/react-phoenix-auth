defmodule ReactPhoenixAuth.User do
  use ReactPhoenixAuth.Web, :model

  schema "users" do
    field :email, :string
    field :name, :string
    field :username, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    timestamps()
  end

  # username
  # no _ or . at the beginning
  # no __ or _. or ._ or .. inside
  # allowed characters: a-zA-Z0-9._
  # no _ or . at the end

  # password
  # at least 1 number and alphapetic
  # allowed characters: a-zA-Z0-9$@$!%*?&

  def changeset(model, params) do
    model
    |> cast(params, ~w(email password name username))
    |> validate_required([:username, :email, :password])
    |> validate_length(:username, min: 3, max: 20)
    |> validate_length(:password, min: 8, max: 100)
    |> validate_length(:name, max: 50)
    |> validate_format(:email, ~r/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    |> validate_format(:username, ~r/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    |> validate_format(:password, ~r/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/)
    |> unique_constraint(:username) # save unique_constraint for last as DB call
    |> unique_constraint(:email) # save unique_constraint for last as DB call
    |> put_pass_hash()
  end

  def changeset_update(model, params) do
    model
    |> cast(params, ~w(email password))
    |> validate_format(:password, ~r/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/)
    |> validate_format(:email, ~r/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    |> unique_constraint(:email) # save unique_constraint for last as DB call
    |> put_pass_hash()
  end

  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ -> # that underscore matches the error case
        changeset
    end
  end
end