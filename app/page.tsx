"use client"
import {useState} from "react";
import {useEventListener} from "usehooks-ts";

type Vector = {
    x: number, y: number
};

export default function Home() {
    const [mousePos, setMousePos] = useState([0, 0])

    const radius = 25

    useEventListener("mousemove", (e: MouseEvent) => {
        setMousePos([e.clientX, e.clientY]);
    })

    let [x, y] = [mousePos[0] - radius, mousePos[1] - radius]
    x = Math.max(0, Math.min(x, window.innerWidth - radius * 2));
    y = Math.max(0, Math.min(y, window.innerHeight - radius * 2));

    return (
        <div style={{
            position: "absolute",
            left: x,
            top: y,
            width: radius * 2,
            height: radius * 2,
            background: "blue",
            borderRadius: "50%"
        }}></div>
    );
}

function getForce(pos1: Vector, pos2: Vector, power: number): Vector {
    const distance = Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
    const forceScale = power / (distance ** 3)
    // Square scaling by the nature and an extra division by the distance to normalize the vector delta.
    return {
        x: (pos2.x - pos1.x) * forceScale,
        y: (pos2.y - pos1.y) * forceScale,
    }
}