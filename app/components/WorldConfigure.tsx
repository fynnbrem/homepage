import React, { useState } from "react"
import NumberConfigure from "@/app/components/NumberConfigure"
import { AdsClick, GetApp, Route } from "@mui/icons-material"
import { BallCollision, BallGravity, WallBounce } from "@/app/assets/icons"

const iconSize = 45

export function WorldConfigure() {
    const [sliderVal, setSliderVal] = useState(0)
    const [dialVal, setDialVal] = useState(Math.PI)
    const [switchVal, setSwitchVal] = useState(true)

    return (
        <>
            <NumberConfigure
                title="Pointer Gravity"
                variant={"slider"}
                min={0}
                max={10000}
                icon={<AdsClick sx={{ fontSize: iconSize }} />}
                tooltip={
                    "The attraction that the pointer acts out towards other balls."
                }
                sliderValue={sliderVal}
                onSliderChange={setSliderVal}
                squared={true}
                precision={0}
            />
            <NumberConfigure
                title="Trail Length"
                variant={"slider"}
                min={0}
                max={200}
                icon={<Route sx={{ fontSize: iconSize }} />}
                tooltip={
                    "The length of the ball trail. Each unit allows the trail to persist 1 tick longer."
                }
                sliderValue={sliderVal}
                onSliderChange={setSliderVal}
                precision={0}
            />
            <NumberConfigure
                title="Gravity Scaling"
                variant={"slider"}
                min={0}
                max={4}
                icon={<BallGravity size={iconSize} />}
                tooltip={
                    <>
                        The exponent for the distance falloff for the gravity
                        between two balls.
                        <br />
                        By default, that falloff scales squarely with the
                        distance, meaning double the distance results in 1/4th
                        the gravitational force.
                    </>
                }
                sliderValue={sliderVal}
                onSliderChange={setSliderVal}
                precision={2}
            />
            <NumberConfigure
                title="Wall Elasticity"
                variant={"slider"}
                min={0}
                max={1}
                icon={<WallBounce size={iconSize} />}
                tooltip={
                    "The amount of kinetic energy that gets preserved when balls collide with the walls."
                }
                sliderValue={sliderVal}
                onSliderChange={setSliderVal}
                precision={2}
            />
            <NumberConfigure
                title="World Gravity"
                variant={"slider-dial"}
                min={0}
                max={100}
                icon={<GetApp sx={{ fontSize: iconSize }} />}
                tooltip={
                    "The uniform force applied to all balls into a certain direction."
                }
                sliderValue={sliderVal}
                onSliderChange={setSliderVal}
                dialValue={dialVal}
                onDialChange={setDialVal}
                squared={true}
                precision={0}
            />
            <NumberConfigure
                title="Collision"
                variant={"switch"}
                icon={<BallCollision size={iconSize} />}
                tooltip={"Whether balls collide with each other or not."}
                switchValue={switchVal}
                onSwitchChange={setSwitchVal}
            />
        </>
    )
}