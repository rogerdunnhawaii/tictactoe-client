curl "https://wdi-library-api.herokuapp.com/sign-up" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '
  {
    "credentials":
    {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }
'
