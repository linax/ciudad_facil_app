Ciudad Fácil App

*Siempre se debe utilizar la rama develop para testear la app, en ella se lleva el registro de avance de la aplicación

En primera instancia se debe instalar la linea de comandos de React Native(esto se debe hacer una vez):
npm install -g react-native-cli

Descargado el proyecto, se instalan los modulos de node asociados a este:
npm install

Arreglar los archivos de la librería de mapbox en iOS como dice el siguiente post:
http://stackoverflow.com/questions/41939487/react-native-mapbox-gl-fails-to-link

Para correr el proyecto:
react-native run-android (o ios)

** Para levantar la aplicación en android es necesario tener instalado el sdk, este link entrega mayor información https://facebook.github.io/react-native/docs/getting-started.html (seleccionar android)
** Se debe agregar el archivo local.properties dentro de la carpeta android del proyecto, con la siguiente linea: sdk.dir = /Users/cokeina/Library/Android/sdk (ejemplo)


