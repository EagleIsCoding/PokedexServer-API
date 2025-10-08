# 🚀 TP - 01. NodeJS - Votre premier serveur Node JS

## Mission 1: Créer un serveur

### Quelle commande vous permet d'afficher les ports utilisés sur votre machine (serveur)?

- ss -plntu / netstat -plntu 

### Que remarquez vous ?

- Le serveur est lancé, la page 172.16.193.1:8083 est fonctionnelle car elle m'affiche le message Hello BTS SIO SLAM ! 

### Sauriez-vous identifier le contenu qui s'affiche dans la page web dans les sources du serveur app.js ?

- Le contenu qui s'affiche est le message 'Hello BTS SIO SLAM !' ainsi que le code 200 dans la console du navigateur au chargement de la page. 

### Changer le message 'Hello BTS SIO SLAM !' en 'Bienvenue sur le site officiel du BTS SIO SLAM'.
### Rechargez la page web ! Le contenu reste le même pourquoi ? Comment y remédier ?

- Etant un serveur lancer avec node, cela ne permet pas de rafraichir automatiquement le contenu si il y a eu des modifications. 
- Il faut alors relancer le serveur manuellement en faisant node app.js .

### A quoi correspond le numéro 200 dans le code?

- Le code 200 correspond à la réussite avec succès d'une requête. 

### Rechargez la page, que remarquez vous ?

- Avec l'ajout de nodemon, quand on rafraichi la page, les changements sont effectués. 

## Mission 2: Gestion des urls avec le module url

### Sauvegardez le changement puis rechargez la page web, que remarquez vous ?

- Sa print dans la console /favicon.ico 

### Ajoutez un paramètre de requête dans l'url (e.g. http://IP-DU-SERVEUR:8085?test=btssioslam); que remarquez vous ?

- Il ne s'affiche pas dans la console 

### Connaissez vous d'autres méthodes d'affichage dans la console que console.log()?

- console.info()

## Mission 3: Gestion des query params avec le module

### Rechargez la page en passant le paramètre name dans l'url. Que remarquez-vous ?

- En passant le paramètre name dans l'url, il s'affiche sur la page web directement après 'Bonjour'.

# 🚀 TP - 02. NodeJS - Serveur API Pokedex

### Définition d'un numéro au hasard compris entre le minimum et le maximum
### Quel est l'id minimum possible? maximum ? 

- L'id minimum des données est 0, et le max 808. 

### Quelle est la taille du pokedex?

- Il y a 809 pokemons



