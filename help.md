## Initialisation projet
`pnpm init` 
<br>
`pnpm install express`
<br>
`touch .gitignore` ou `echo ".env" "node_modules" > .gitignore` ou `printf ".env\nnode_modules" > .gitignore`

<br>

## PostgreSql
| Commande                   | Détails                              |
| -------------------------- | ------------------------------------ |
| `psql`                     | Enter the PostgreSQL shell           |
| `\l`                       | View the current dbs                 |
| `\c top_users`             | Connect to the db named `top_users`  |
| `\d`                       | View the tables                      |
| `\d+ usernames`            | Describe the table `usernames`       |
| `SELECT * FROM usernames;` | Check the table `usernames`          |
| `\c postgres`              | Reconnect to the default postgres db |
| `\q`                       | Quit the PostgreSQL shell            |