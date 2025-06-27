Guía de Git

----------------------------------------------------------

1. Inicializar un nuevo repositorio
--------------------------------------
git init
> Crea un repositorio Git en la carpeta actual (.git/). Necesario si comenzás desde cero.



2. Ver el estado de los archivos
----------------------------------
git status
> Muestra los archivos nuevos, modificados o eliminados que todavía no están listos para commit.



3. Agregar archivos al staging
-------------------------------
git add .
> Agrega todos los archivos modificados o nuevos.

git add archivo.txt
> Agrega solo el archivo especificado.



4. Hacer un commit
---------------------
git commit -m "Mensaje del commit"
> Guarda un snapshot del proyecto con una descripción clara.



5. Conectar el repositorio local con GitHub
---------------------------------------------
git remote add origin https://github.com/usuario/repositorio.git
> Enlaza el repositorio local con uno remoto en GitHub.




6. Subir tu código a GitHub
-----------------------------
git push -u origin main
> Sube los commits a GitHub. La opción -u guarda la rama remota como predeterminada.




7. Descargar cambios desde GitHub
-----------------------------------
git pull origin main
> Baja y aplica cambios del repositorio remoto.




8. Crear y cambiar de rama
----------------------------
git checkout -b nueva-rama
> Crea una nueva rama y cambia a ella.

git checkout main
> Cambia de vuelta a la rama principal.




9. Ver historial de commits
-----------------------------
git log --oneline
> Muestra una lista breve y útil de los commits.




10. Ver diferencias entre versiones
--------------------------------------
git diff
> Muestra los cambios no confirmados.




11. Ignorar archivos con .gitignore
--------------------------------------
Contenido típico de .gitignore:
node_modules/
.env
*.log



12. Clonar un repositorio existente
--------------------------------------
git clone https://github.com/Rick-hunterr/BenteveoAir.git
> Crea una copia local de un proyecto existente.




13. Quitar archivos del seguimiento sin borrarlos
----------------------------------------------------
git rm --cached archivo.txt
> Elimina el archivo del control de versiones, pero no lo borra del disco.





flujo completo
------------------------------------
cd proyecto/
git init
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/usuario/repositorio.git
git branch -M main
git push -u origin main
