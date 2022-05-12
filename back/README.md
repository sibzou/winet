# Backend PHP

Le serveur ou backend est écrit en PHP et utilise une base de données SQLite.

## Prérequis

- PHP 8
- L'extension SQLite pour PHP (normalement incluse dans la distribution PHP
  officielle fournie sur [php.net](https://www.php.net))

Si l'extension SQLite n'est pas incluse dans PHP, la méthode d'installation peut
différer selon le système d'exploitation ou la distribution Linux.

## Activation de l'extension SQLite

Décommentez ces 2 lignes dans votre fichier `php.ini` :

```
;extension=pdo_sqlite
;extension=sqlite3
```

Décommenter une ligne signifie retirer le point-virgule se trouvant à son début.

## Démarrage du serveur

En ligne de commande, placez-vous dans le dossier back/src/public puis saisissez

```
php -S localhost:8080
```
