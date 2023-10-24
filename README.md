# SoundInjectorUI

Le but du projet est de pouvoir injecter des fichiers audio dans un flux audio. L'utilisation serait d'en faire une SoundBoard custom.

## Etat du projet

La partie d'injection fonctionne et à été testé. Elle sera prochainement disponible sur le repo.
Une CLI ou interaction par console de commande à été développé. Elle est sommaire et sera sujette à modification et amélioration.
Il faut tout de même un Virtual Audio Cable pour pouvoir "filouter" l'injection de flux audio (l'injection d'audio dans un micro n'étant par défaut pas possible)

## Reste à faire

Une UI est en cours de création pour que l'ajout et la modification de la SoundBoard soit simple et intuitive. Proposez des idées de design ou de personnalisation.

## Idées d'amélioration

- Pouvoir faire plusieurs SoundBoard
- Améliorer la qualité de l'injection audio (pour l'instant on coupe le micro pour jouer le son, un calcul matriciel serait plus pertinent pour fondre les deux audios)
- faire un exécutable pour pouvoir facilement installer à la fois VBCable et le SoundInjector
- Faire une charte graphique pour l'application
