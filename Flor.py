from turtle import *
import colorsys
import math
import random

speed(0.01)
bgcolor("black")

# Función para dibujar una flor
def draw_flower(posx, posy):
    penup()
    goto(posx, posy)
    pendown()
    h = 0
    for i in range(16):
        for j in range(18):
            c= colorsys.hsv_to_rgb(0.125 , 1, 1)
            color(c)
            h += 0.005
            rt(90)
            circle(150 - j * 6, 90)
            lt(90)
            circle(150 - j * 6, 90)
            rt(180)
        circle(40, 24)
    # Genera la parte centrall de la flor
    color("black") 
    shape("turtle")
    fillcolor("brown")
    phi = 137.508 * (math.pi/ 180.0)

    for i in range (200):
        r = 4 * math.sqrt(i)
        theta = i*phi
        x = r * math.cos(theta)
        y = r * math.sin(theta)
        posx1 = posx+x
        posy1 = posy+y+40
        penup()
        goto(posx1, posy1)
        setheading(i * 137.508)
        pendown()
        stamp()

# Función para dibujar el tallo con una hoja
def draw_stem_with_leaf(x, y):
    penup()
    goto(x, y)
    pendown()
    pos_leaf_y = y-200
    
    # Dibuja el tallo recto y más grande
    c= colorsys.hsv_to_rgb(0.29 , 1, 0.40)
    color(c)
    pensize(12)
    setheading(270)
    fd(200)

    # Dibuja el tallo curvo
    setheading(90)
    circle(100, -70)
    
    # Dibuja la hoja más grande
    penup()
    goto(x, pos_leaf_y)
    pendown()
    pensize(2)
    begin_fill()
    setheading(135)
    circle(50, 90)
    setheading(45)
    circle(50, 90)
    end_fill()
    
    # Restaura el color y el grosor del lápiz
    penup()
    pensize(1)
    color("black")

# Función para generar estrellitas de forma aleatoria
def draw_random_start(amount):
    for _ in range(amount):
        penup()
        x = random.randint(-400, 400)
        y = random.randint(-400, 400)
        goto(x, y)
        pendown()
        star_color = colorsys.hsv_to_rgb(random.random(), 1, 1)
        color("white")
        begin_fill()
        for _ in range(5):
            forward(11)
            right(144)
        end_fill()

# MAIN
# Dibujar los tallos
draw_stem_with_leaf(0, -50)

# Dibujar flor
goto(0,0)
setheading(0)
draw_flower(0, 50)

# Escribir el mensaje
hideturtle()
penup()
goto(0, 350)
pendown()
color("white")  # Cambia el color a blanco 
write("Para la niña más bonita", align="center", font=("Arial", 11, "normal")) # Cambia el fuente y tamaño del texto
# penup()
# goto(0, 330)
# pendown()
# write("mi Micky, my rey", align="center", font=("Arial", 11, "normal"))

penup()
goto(0, -300)
pendown()
write("Para ti <3", align="center", font=("Arial", 11, "normal"))
hideturtle()

# Dibuja las estrellas aleatorias
draw_random_start(50)

hideturtle()

done()