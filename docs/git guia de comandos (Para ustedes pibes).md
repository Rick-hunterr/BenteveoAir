
Guía de Comando Git
=========================

1. Inicializar un nuevo repositorio
-----------------------------------
git init
> Crea un repositorio Git en la carpeta actual (.git/). Usalo si arrancás desde cero.

2. Ver el estado de los archivos
--------------------------------
git status
> Muestra los archivos nuevos, modificados o eliminados que aún no han sido "commiteados".

3. Agregar archivos al staging
------------------------------
git add .
> Agrega todos los archivos nuevos o modificados al área de staging.

git add ejemplo.txt
> Agrega solo un archivo específico.

4. Hacer un commit
------------------
git commit -m "Mensaje del commit"
> Crea un snapshot del estado del proyecto. Es importante que el mensaje sea claro.

5. Conectar el repositorio local con GitHub
-------------------------------------------
git remote add origin https://github.com/Rick-hunterr/BenteveoAir.git
> Enlaza el repositorio local con uno remoto en GitHub (llamado origin).

6. Subir tu código a GitHub
---------------------------
git push -u origin main
> Sube tu rama main al repositorio remoto. El -u establece esta rama como predeterminada.

7. Descargar cambios desde GitHub
---------------------------------
git pull origin main
> Trae y fusiona cambios desde la rama remota.

git pull --rebase origin main
> Trae los cambios y los aplica encima de tus commits locales (mantiene historial más limpio).

8. Crear y cambiar de rama
--------------------------
git checkout -b nueva-rama
> Crea una nueva rama y te cambia a ella.

git checkout main
> Vuelve a la rama principal (main).

git switch -c nueva-rama
> Alternativa para crear y cambiar de rama.

9. Ver historial de commits
---------------------------
git log --oneline
> Muestra un historial compacto de los commits.

git log
> Muestra el historial completo con detalles.

10. Ver diferencias entre versiones
-----------------------------------
git diff
> Muestra las diferencias entre los archivos modificados y la última versión confirmada.

git diff --staged
> Muestra diferencias de archivos ya añadidos al staging.

11. Ignorar archivos con .gitignore
-----------------------------------
Ejemplo de contenido:
node_modules/
.env
*.log
> Evita que Git rastree archivos o carpetas que no deberían subirse al repositorio.

12. Clonar un repositorio existente
-----------------------------------
git clone https://github.com/Rick-hunterr/BenteveoAir.git
> Crea una copia local de un proyecto remoto existente.

13. Quitar archivos del seguimiento sin borrarlos
-------------------------------------------------
git rm --cached ejemplo.txt
> Deja de rastrear un archivo, pero lo mantiene en tu sistema de archivos.

14. Renombrar una rama (localmente)
-----------------------------------
git branch -M main
> Cambia el nombre de la rama actual a main.

15. Ver todas las ramas
-----------------------
git branch
> Muestra todas las ramas locales. La activa aparece con *.

git branch -r
> Muestra solo las ramas remotas.

16. Borrar una rama
-------------------
git branch -d nombre-rama
> Elimina una rama local. Usa -D si querés forzar el borrado.

git push origin --delete nombre-rama
> Borra una rama remota.

17. Ver los remotos configurados
--------------------------------
git remote -v
> Lista los remotos asociados al repositorio.

18. Cambiar la URL del remoto
-----------------------------
git remote set-url origin https://nueva-url.git
> Cambia la dirección del repositorio remoto (origin).

19. Ver archivos rastreados por Git
-----------------------------------
git ls-files
> Lista todos los archivos que Git está siguiendo actualmente.

20. Guardar cambios temporales sin commitear
--------------------------------------------
git stash
> Guarda los cambios actuales para volver a un estado limpio.

git stash apply
> Recupera los cambios guardados más recientemente.

21. Revertir cambios
--------------------
git restore archivo.txt
> Restaura el archivo desde el último commit.

git reset --hard
> Vuelve todo el repositorio al último commit (borra cambios locales y staging).

git reset archivo.txt
> Saca el archivo del área de staging.

22. Revertir un commit (sin perder historial)
---------------------------------------------
git revert ID_commit
> Crea un nuevo commit que revierte los cambios de otro commit anterior.

==================================================================

Flujo de trabajo en equipo con Git y GitHub
==============================================

1. Clonar el repositorio (solo la primera vez)
----------------------------------------------
git clone https://github.com/organizacion/repositorio.git
cd repositorio/

2. Crear y configurar tu entorno de trabajo
-------------------------------------------
> Trabajás directamente en la rama compartida (main o develop):

git checkout main
> Asegurate de estar en la rama correcta.

3. Sincronizar antes de hacer cambios
-------------------------------------
git pull origin main --rebase
> Muy importante: trae los últimos cambios del equipo y aplica tus cambios arriba.
> Usar `--rebase` ayuda a mantener un historial más limpio y evita "merge commits" innecesarios.

4. Trabajar en los archivos
----------------------------
> Realizá tus modificaciones en el código normalmente.

5. Verificar los cambios
-------------------------
git status
> Revisa qué archivos cambiaste.

6. Preparar archivos para commit
---------------------------------
git add .
> O bien: git add archivo1 archivo2

7. Hacer un commit
-------------------
git commit -m "Descripción clara de tus cambios"
> Ejemplo: "Corrige error en validación del formulario"

8. Sincronizar *de nuevo* antes de subir
-----------------------------------------
git pull origin main --rebase
> Por si alguien más hizo push mientras trabajabas.

> Si hay conflictos, resolvelos manualmente, luego:
git add archivo_resuelto
git rebase --continue

9. Subir los cambios al repositorio remoto
-------------------------------------------
git push origin main
> Ahora que estás actualizado, podés subir sin conflictos.

10. Repetir desde el paso 3 cada vez que hagas cambios
-------------------------------------------------------
> Así evitás sobrescribir el trabajo de los demás.

---------------------------------------------------------------------

Recomendacion clave:
- Siempre hacé `git pull --rebase` antes de hacer `git push`.





Palabras clave recomendadas para mensajes de commit:

- **feat**: Para agregar una nueva funcionalidad o característica.
- **fix**: Para corregir un error o bug.
- **docs**: Cambios relacionados solo con documentación.
- **style**: Cambios que no afectan la lógica, solo formato, espacios, estilo de código, etc.
- **refactor**: Cambios en el código que no agregan funcionalidad ni corrigen bugs, solo mejoran estructura o legibilidad.
- **perf**: Cambios para mejorar el rendimiento.
- **test**: Agregar o corregir tests.
- **chore**: Cambios en tareas auxiliares, scripts, configuración, etc., que no afectan código fuente ni tests.
- **build**: Cambios que afectan el sistema de build o dependencias.
- **ci**: Cambios en configuración o scripts de integración continua.
- **revert**: Revertir un commit anterior.