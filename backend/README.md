<section>
<h2>Migrations</h2>
<ul>
    <li>Gerar um esqueleto de migration: <strong>npx sequelize-cli migration:generate --name migration-skeleton</strong></li>
    <li>Executar migrations: <strong>npx sequelize-cli db:migrate</strong></li>
    <li>Desfazer migrations: <strong>npx sequelize-cli db:migrate:undo</strong></li>
    <li>Desfazer migration específica: <strong>npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js</strong></li>
</ul>
</section>

<section>
<h2>Seeders</h2>
<ul>
    <li>Criar seeders: <strong>npx sequelize-cli seed:generate --name demo-user</strong></li>
    <li>Executar seeders: <strong>npx sequelize-cli db:seed:all</strong></li>
    <li>Desfazer seeders: <strong>npx sequelize-cli db:seed:undo</strong></li>
    <li>Desfazer seeder específica: <strong>npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data</strong></li>
</ul>
</section>

<div>Mais detalhes sobre migrations e seeders: https://sequelize.org/master/manual/migrations.html</div>
