import React from "react"
import NumberConfigure from "@/app/components/config/NumberConfigure"
import { AdsClick, GetApp, Route } from "@mui/icons-material"
import { BallCollision, BallGravity, WallBounce } from "@/app/assets/Icons"
import { useConfiguration } from "@/app/providers/ConfigurationProvider"

const iconSize = 45

export function WorldConfigure() {
    const config = useConfiguration()

    function handleWorldGravityMagnitudeChange(value: number) {
        config.worldGravity[1]({ ...config.worldGravity[0], magnitude: value })
    }

    function handleWorldGravityAngleChange(value: number) {
        config.worldGravity[1]({ ...config.worldGravity[0], angle: value })
    }

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
                sliderValue={config.pointerGravity[0]}
                onSliderChange={config.pointerGravity[1]}
                squared={true}
                precision={0}
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
                sliderValue={config.worldGravity[0].magnitude}
                onSliderChange={handleWorldGravityMagnitudeChange}
                dialValue={config.worldGravity[0].angle}
                onDialChange={handleWorldGravityAngleChange}
                squared={true}
                precision={0}
            />
            <NumberConfigure
                title="Gravity Scaling"
                variant={"slider"}
                min={1}
                max={4}
                icon={<BallGravity size={iconSize} />}
                tooltip={
                    <>
                        The exponent for the distance falloff for the gravity
                        between two balls.
                        <br />
                        In nature, that exponent is 2, meaning double the
                        distance results in 1/4th the gravitational force.
                        <br />
                        For more interaction between the balls, we default to
                        1.7.
                    </>
                }
                sliderValue={config.gravityScaling[0]}
                onSliderChange={config.gravityScaling[1]}
                precision={2}
            />
            <NumberConfigure
                title="Collision"
                variant={"switch"}
                icon={<BallCollision size={iconSize} />}
                tooltip={"Whether balls collide with each other or not."}
                switchValue={config.collision[0]}
                onSwitchChange={config.collision[1]}
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
                sliderValue={config.wallElasticity[0]}
                onSliderChange={config.wallElasticity[1]}
                precision={2}
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
                sliderValue={config.trailLength[0]}
                onSliderChange={config.trailLength[1]}
                precision={0}
            />
        </>
    )
}
