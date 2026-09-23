# -*- coding: utf-8 -*-
"""Genera los PNG de icono a partir de public/favicon.svg.

POR QUE
Solo estaba declarado el favicon SVG. Faltaba:
  - apple-touch-icon: iOS lo necesita para "Añadir a pantalla de inicio";
    sin él usa una captura reducida de la página, que se ve borrosa.
  - los iconos del manifest (192 y 512), que piden Android y Lighthouse.

Dibuja el monograma con Pillow en vez de rasterizar el SVG, para no
añadir cairosvg como dependencia. Las coordenadas son las mismas del
favicon, escaladas: si el SVG cambia, hay que ajustarlas aquí.
"""

import os
from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLICO = os.path.join(RAIZ, "public")

FONDO = (10, 11, 13)      # #0A0B0D
BORDE = (38, 43, 51)      # #262B33
TRAZO = (237, 239, 242)   # #EDEFF2
COBRE = (232, 152, 62)    # #E8983E

# Se dibuja a 1024 y se reduce: así los bordes quedan suaves.
BASE = 1024


def monograma():
    img = Image.new("RGB", (BASE, BASE), FONDO)
    d = ImageDraw.Draw(img)
    k = BASE / 64.0  # el SVG original está en un lienzo de 64

    # Borde interior
    d.rounded_rectangle(
        [0.75 * k, 0.75 * k, 63.25 * k, 63.25 * k],
        radius=12.25 * k, outline=BORDE, width=int(1.5 * k),
    )

    grosor = int(4.2 * k)

    # A: dos diagonales y el travesaño
    d.line([(14 * k, 45 * k), (23.5 * k, 20 * k)], fill=TRAZO, width=grosor, joint="curve")
    d.line([(23.5 * k, 20 * k), (33 * k, 45 * k)], fill=TRAZO, width=grosor, joint="curve")
    d.line([(18.2 * k, 36.5 * k), (28.8 * k, 36.5 * k)], fill=TRAZO, width=grosor)

    # C: arco abierto a la derecha (el SVG va de 26.5 a 38.5 pasando por la izquierda)
    cx, cy, r = 41.5 * k, 32.5 * k, 11.5 * k
    d.arc([cx - r, cy - r, cx + r, cy + r], start=-63, end=63, fill=None, width=0)
    d.arc([cx - r, cy - r, cx + r, cy + r], start=63, end=297, fill=TRAZO, width=grosor)

    # Nodo cobre en el vértice de la A
    rr = 3.6 * k
    d.ellipse([23.5 * k - rr, 20 * k - rr, 23.5 * k + rr, 20 * k + rr], fill=COBRE)

    return img


def main():
    base = monograma()
    salidas = [
        ("apple-touch-icon.png", 180),
        ("icono-192.png", 192),
        ("icono-512.png", 512),
    ]
    for nombre, tam in salidas:
        img = base.resize((tam, tam), Image.LANCZOS)
        ruta = os.path.join(PUBLICO, nombre)
        img.save(ruta, "PNG", optimize=True)
        print(f"{nombre:24} {tam}x{tam}  {os.path.getsize(ruta)/1024:.1f} KB")


if __name__ == "__main__":
    main()
