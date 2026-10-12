# Fuentes y criterio editorial

Verificación realizada el 9 de octubre de 2026.

## Edición seleccionada

La aplicación acompaña **La fe de Jesús, guía interactiva de 20 estudios, División Sudamericana, publicada el 6 de mayo de 2020**. Su orden fue verificado contra los veinte archivos PDF enlazados por el [catálogo oficial de Materiales y Recursos Adventistas](https://downloads.adventistas.org/es/ministerio-personal/estudios-biblicos/guia-interactiva-la-fe-de-jesus/).

Hay otras ediciones con distinto orden y cantidad de lecciones. La numeración de esta aplicación corresponde exclusivamente a la edición indicada; no debe mezclarse con otras versiones.

## Alcance del contenido de la app

`src/data/guide.ts` contiene veinte fichas de acompañamiento, cada una con cuatro preguntas de redacción original, referencias bíblicas, respuestas breves, tres puntos clave y dos preguntas frecuentes. Son apuntes editoriales para facilitar la conversación del instructor; **no son una transcripción completa del cuestionario oficial ni una nueva edición oficial de la Iglesia**. Los títulos se abrevian para la agenda.

La descripción de la guía informa de esta adaptación. Cada ficha enlaza el PDF original correspondiente para consultar la lección editorial completa. No se redistribuyen los archivos, ilustraciones o páginas originales. Las referencias permiten leer el texto en la Biblia que utilice el estudiante; las respuestas son paráfrasis explicativas, sin atribuirlas como citas textuales de una traducción.

Se conservan el marco adventista y el énfasis pastoral: salvación por gracia, decisiones personales libres, cuidado del duelo, ausencia de fechas para la segunda venida y acompañamiento después del bautismo. Las notas sobre salud no sustituyen atención profesional.

## Correspondencia de los estudios

| Hoja | Tema en la app | Original oficial |
| --- | --- | --- |
| 1 | La Biblia | [PDF 01](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/01_leccion.pdf) |
| 2 | Dios | [PDF 02](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/02_leccion.pdf) |
| 3 | La oración y la fe | [PDF 03](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/03_leccion.pdf) |
| 4 | El origen del mal | [PDF 04](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/04_leccion.pdf) |
| 5 | La salvación | [PDF 05](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/05_leccion.pdf) |
| 6 | El perdón | [PDF 06](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/06_leccion.pdf) |
| 7 | La segunda venida de Jesús | [PDF 07](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/07_leccion.pdf) |
| 8 | Las señales de su regreso | [PDF 08](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/08_leccion.pdf) |
| 9 | La muerte y la resurrección | [PDF 09](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/09_leccion.pdf) |
| 10 | El juicio de Dios | [PDF 10](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/10_leccion.pdf) |
| 11 | La ley de Dios | [PDF 11](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/11_leccion.pdf) |
| 12 | El sábado | [PDF 12](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/12_leccion.pdf) |
| 13 | Cómo vivir el sábado | [PDF 13](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/13_leccion.pdf) |
| 14 | La iglesia de Cristo | [PDF 14](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/14_leccion.pdf) |
| 15 | El bautismo | [PDF 15](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/15_leccion.pdf) |
| 16 | La vida cristiana | [PDF 16](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/16_leccion.pdf) |
| 17 | Salud y estilo de vida | [PDF 17](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/17_leccion.pdf) |
| 18 | Administrar con Dios | [PDF 18](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/18_leccion.pdf) |
| 19 | El don de profecía | [PDF 19](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/19_leccion.pdf) |
| 20 | Una respuesta personal | [PDF 20](https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/20_leccion.pdf) |

## Verificación técnica y doctrinal

- Los veinte PDF se descargaron para lectura en memoria, mediante HTTPS con verificación TLS y `urllib.request`, y se extrajo su texto con `pypdf` para comprobar el tema y la posición de cada hoja. No se agregaron PDF al repositorio.
- El host histórico `deptos.adventistas.org.s3.amazonaws.com` del catálogo presenta un desajuste de certificado. Los enlaces de la aplicación usan la forma estándar de acceso al mismo bucket, `https://s3.amazonaws.com/deptos.adventistas.org/...`, comprobada con respuesta HTTP exitosa para los veinte documentos. No se desactivó la validación TLS.
- El primer PDF incluye instrucciones de uso antes de la lección; su tema se verificó en la tercera página. En los restantes se comprobó en la segunda página.
- Como referencia doctrinal adicional se consultaron los [principios de fe oficiales](https://institucional.adventistas.org/es/nuestras-crencias/) y las [preguntas frecuentes de la Iglesia Adventista](https://www.adventistas.org/es/faq/).
- Las referencias se ofrecen para lectura contextual; esta aplicación no contiene el texto completo de una Biblia ni reemplaza el material original. Una revisión pastoral local puede ajustar el vocabulario al estudiante sin alterar la fuente o su numeración.

## Videos suministrados por el usuario · 12 de octubre de 2026

Se incorporaron una introducción y veinte videos conservando exactamente la asignación numérica indicada por el usuario. No se modificaron los temas, las preguntas, el orden de las hojas ni el progreso de los estudiantes. Las URLs canónicas no incluyen parámetros de seguimiento.

Se consultaron con éxito los metadatos de los 21 enlaces mediante el servicio oficial YouTube oEmbed (`https://www.youtube.com/oembed`), con HTTPS y validación TLS. Todos identifican al canal **Adventistas Perú - Sur**. Los títulos de las lecciones presentan la misma numeración de la lista y, salvo la observación siguiente, corresponden a los temas de la guía usada en la app. La introducción está identificada por el canal como material promocional del curso.

**Observación sobre la hoja 9:** el título publicado en YouTube es «LECCIÓN 9 ¿Realmente volverá Jesús? | La fe de Jesús», mientras que la hoja 9 de la edición DSA 2020 trata de la muerte y la resurrección. El título repite el tema de la lección 7. Se conserva el enlace solicitado por el usuario; no se ha inferido un cambio de orden ni de contenido. La verificación fue de metadatos, no una revisión audiovisual completa, por lo que no permite determinar si se trata únicamente de un error del título del canal.

| Asignación | Video |
| --- | --- |
| Introducción | [Ver video](https://youtu.be/8Avps3cOQJU) |
| 1 | [Ver video](https://youtu.be/dsdjHEMnFJs) |
| 2 | [Ver video](https://youtu.be/yCIyxcDc5Z4) |
| 3 | [Ver video](https://youtu.be/_yl_pItOdTw) |
| 4 | [Ver video](https://youtu.be/8w3sjVY7bRQ) |
| 5 | [Ver video](https://youtu.be/A6w0d7LF5ww) |
| 6 | [Ver video](https://youtu.be/iaF_vSdc-ZQ) |
| 7 | [Ver video](https://youtu.be/fuLlTdP1P14) |
| 8 | [Ver video](https://youtu.be/4ln-8_VU8F0) |
| 9 | [Ver video](https://youtu.be/833vgB1ANtw) |
| 10 | [Ver video](https://youtu.be/NkI67z22dgk) |
| 11 | [Ver video](https://youtu.be/t-u3fhpCSiM) |
| 12 | [Ver video](https://youtu.be/TGj8mUZ3hY8) |
| 13 | [Ver video](https://youtu.be/DgfG73uVqY4) |
| 14 | [Ver video](https://youtu.be/EEdFcIuU0UY) |
| 15 | [Ver video](https://youtu.be/46Bi3O6PXgg) |
| 16 | [Ver video](https://youtu.be/AWUqBauQ0d8) |
| 17 | [Ver video](https://youtu.be/tFASI5zUCTQ) |
| 18 | [Ver video](https://youtu.be/Cq3Vj1as4eg) |
| 19 | [Ver video](https://youtu.be/4na8QssOUeI) |
| 20 | [Ver video](https://youtu.be/1jaOPCGNTxk) |
