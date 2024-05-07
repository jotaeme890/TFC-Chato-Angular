# Checkpoint

### Vídeo -> [Vídeo Youtube](https://youtu.be/LxI69-CrHsg)

</br>
<details>
  <summary>DIARIO</summary>

  **Día 08/04/2024 →** Ya que no nos han proporcionado el feedback del anteproyecto, he realizado el diseño de la página de **Login** y la de **Registro** en Figma. Este diseño es el básico (sin texto, ni colores, etc).
  
  **Día 09/04/2024 →** Hoy he creado el repositorio, añadido todos los servicios principales (Autenticación, Traducción). Y he creado la página de **Access** que contendrá el componente de LogIn y el de Register. He hecho un pequeño formulario de Login usando Angular Material, aún falta estilo y que pueda hacer Login y registro.
  
  **Día 10/04/2024 →** Hoy le he añadido estilo a la página de acceso, a los componentes de registro y de login, he añadido un validador para saber si las contraseñas coinciden. He añadido a los formularios los errores. He arreglado algunas propiedades mal escritas en las interfaces y he agregado el registro y el logueo conectándose al Backend en Firebase.
  
  **Día 11/04/2024 →** Añadida la guarda para tener que estar logueado en la aplicación para poder navegar en las páginas que no sean las de acceso, he cambiado el estilo del formulario de registro, ya que he arreglado los errores que seguían saliendo al registrarse, he arreglado las interfaces (añadiendo los atributos **role** y **surname**, y he eliminado los atributos **firstSurname** y **secondSurname**) y he agregado una guarda para que solo los usuarios con el rol de **Admin** puedan acceder, ya que la página es de administración.
  
  **Día 12/04/2024 →** He añadido PrimeNG al proyecto, ya que quiero tener toast personalizados en algunas partes de la aplicación, a parte del cambio de tema, he creado el logo de la app, y he cambiado la pantalla de acceso para que este salga en los dispositivos con pantallas más pequeñas (ya que en tamaño grande sale una imagen a la derecha de los formularios), he añadido un toast que sale al registrarte ya que solo puedes acceder a mi parte de la aplicación si eres admin (por defecto en el registro es usuario normal, un admin te tiene que cambiar el role). Me falta poner toast en los fallos del login (y ver cómo recoger el error de que un gmail ya está en uso) para acabar con la página de acceso.
  
  **Día 16/04/2024 →** He empezado el diseño de la página **Home,** la cual contendrá todas las incidencias que van dejando los usuarios, desde allí podremos navegar a cada una de las incidencias, al igual que aplicarle filtros a la vista general y acceder al menú de la aplicación. También he diseñado la vista de la página con el menú abierto. También he añadido toast con errores al hacer un registro(el de correo en uso), en el login, me da error y sale el error aun que esté bien y después ya carga y lleva a **Home** (HABLAR CON JUAN, SOLUCIONADO).
  
  **Día 17/04/2024 →** He arreglado el problema con los toast a la hora de iniciar sesión y registrarse (arreglando también su tamaño). También he añadido el header de la aplicación, con un menú lateral y el logo de la app.
  
  **Día 18/04/2024 →** He añadido el SplashScreen para que al recargar la página no vaya a **Access** y después navegue a **Home**, he usado un lottie para que se vea una animación mientras tanto. También he empezado a crear el diseño final de la aplicación. Al crear el SplashScreen me ha empezado a dar errores ya que al hacer el deslogueo del usuario, al volver a **Access** había una capa invisible por encima de la página y se quedaba inutilizable, lo he arreglando borrando el component de header y pasando todo el header y el menú a **app.component.html**, aun que creyendo que era el SplashScreen lo he acabado borrando, más adelante lo pondré.
  
  **Día 19/04/2024 →** Hoy he implementado ya la captura de datos desde Firebase, para obtener los datos de los usuarios logueados en la aplicación, he acabado la estética del menú lateral y he implementado todas las páginas que incluye dicho menú.
  
  **Día 22/04/2024 →** Hoy he agregado una tabla para poder ver la información de todos los usuarios conectados, también he añadido un tab para ver la información o los datos en forma de gráficas. También he añadido la vista de la información detallada de los usuarios. Y también el update de los usuarios.
  
  **Día 23/04/2024 →** Hoy he cambiado la forma en la que tenía el update de los usuarios, ya que no cambiaba correctamente los datos, y al modificar el usuario conectado no se actualizaba el observable de user$. También he estado modificando el menú para añadir la foto del usuario y abajo de dicho menú con la opción de navegar a la página de **About**. He incluido el contenido de dicha página, incluyendo la información de los repos de Adri y mía.
  
  **Día 25/04/2024 →** Hoy he avanzado con los diseños de la aplicación en Figma.
  
  **Día 26/04/2024 →** Hoy he creado la vista del componente del incidente, ya solo me quedaría la vista en detalle del incidente y agregar la parte de los filtros (NO FUNCIONAL PARA CHECKPOINT), para posteriormente hacer los filtros funcionales, y la página de ajustes, con el cambio de tema y de iodoma y el perfil del usuario conectado.
  
  **Día 27/04/2024 →** Hoy he seguido con el diseño en figma, también he creado un logo para el tema oscuro, para que cambie el logo para que no sea oscuro. Y he arreglado el diseño de la tarjeta del incidente para que se viera mejor.
  
  **Día 29/04/2024 →** Hoy he intentado arreglar el diseño de la página de **Home** pero sigue fallando, he cambiado la interfaz de las incidencias para recoger un TimeStamp y he arreglado la plantilla para que muestre la fecha y la hora de la incidencia correctamente.
  
  **Día 30/04/2024 →** Hoy he arreglado el diseño de la página **Home**, y ahora es completamente responsive y las tarjetas de las incidencias se ven correctamente, también he cambiado el tipo de dato que introduzco en Firebase al subir una foto, ya que antes tenía los diferentes tipos de tamaño, pero cómo introduce al final la misma url en todos, no merece la pena dejar que sea un objeto, por lo que ahora solo introduce el string de la url hacía el storage.
  
  **Día 02/04/2024 →** Hoy he mejorado el diseño de la vista de las incidencias, para que se viese mejor en dispositivos más pequeños, también he seguido con el diseño en figma, ya solo me quedaría poner que el usuario pueda modificar el role de otro usuario (se me pasó ponerlo en el formulario que ya hay) y la vista del detalle de las incidencias para el checkout. Después me quedaría la vista de los gráficos en **Análisis de datos** y toda la página de **Ajustes**.
  
  **Día 03/05/2024 →** Hoy he añadido el campo de role a la hora de editar un usuario, ya que anteriormente no lo tenía hecho y al modificar el usuario no se podía cambiar este. También he seguido con el diseño en Figma.
  
  **Día 04/05/204 →** Hoy he empezado con la vista de detalle de las incidencias, he modificado el servicio de incidencias, y he añadido que cada vez que cliquemos en una incidencia, si su valor de **checked** está en falso, pase a verdadero, así podremos usar más adelante este campo para filtrar y a parte para poner una directiva a las incidencias que no estén abiertas. Ahora mismo está puesto temporalmente el cambio del tipo string a Date, ya que Adri está subiendo la fecha en tipo string. Y he añadido una pre-directiva para el checkpoint, para que las incidencias no vistas salgan de otro color.
  
  **Día 05/05/2024 →** Hoy ya he acabado todo lo que quería para el checkpoint, ya que he añadido la vista del detalle de la incidencia, y he añadido las palabras necesarios con sus traducciones. Ya me quedaría: Arreglar la carga del autologin, hacer la vista de las gráficas y poder editar, añadir o eliminar categorías, los filtros con las categorías, y la página de ajustes.

</details>


### Tareas pendientes por hacer
  - Página de ajustes completa (Con cambio de tema, idioma y modificación de perfil).
  - Añadir tabla de categorías en la página de análisis (con todo su CRUD correspondiente), y también las gráficas.
  - Añadir menú para el filtrado de las incidencias.
  - Autologin.
  - Diseño de Figma.
  - Exportar datos  .csv para su posterior tratamiento para power BI.
  - Modificar página de About.


### Webgrafía usada
  - [Cabecera de la tabla](https://ionicframework.com/docs/api/list-header)
  - [Tabla](https://ionicframework.com/docs/api/list)
  - [Menú lateral](https://ionicframework.com/docs/api/menu)
  - [Iconos](https://ionic.io/ionicons)
  - [Tabs](https://material.angular.io/components/tabs/api)
  - [Formularios](https://material.angular.io/components/form-field/overview)
  - [Toasts](https://primeng.org/toast)
  - [Divider](https://primeng.org/divider)
  - [Documentación angular](https://angular.io/api/common/NgClass)
