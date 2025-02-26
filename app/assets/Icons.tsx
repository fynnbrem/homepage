import React from "react"

type iconProps = {
    color?: string
    size: number
}

function Icon(props: iconProps & { children: React.ReactNode }) {
    return (
        <svg
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={props.size}
            height={props.size}
            color={props.color}
        >
            {props.children}
        </svg>
    )
}

export function BallCollision(props: iconProps) {
    return (
        <Icon {...props}>
            <circle
                style={{ fill: "currentcolor" }}
                id="path1"
                cx="7.5"
                cy="7.5"
                r="5.5"
            />
            <circle
                style={{ fill: "currentcolor" }}
                id="circle2"
                cx="16.5"
                cy="16.5"
                r="5.4999995"
            />
            <path
                style={{ fill: "currentcolor" }}
                d="m 14,9.9999997 6.999999,-8.9999965 1.999996,1.999999 z"
                id="path3"
            />
            <path
                style={{ fill: "currentcolor" }}
                d="m 16.000001,9.9999997 5.999997,-2.9999981 0.605656,2.0000009 z"
                id="path4"
            />
            <path
                style={{ fill: "currentcolor" }}
                d="M 14,7.9999999 16.999999,2.000003 15.000003,1.394346 Z"
                id="path9"
            />
            <path
                style={{ fill: "currentcolor" }}
                d="M 9.9999997,14 3.0000011,22.999997 1.0000051,20.999998 Z"
                id="path15"
            />
            <path
                style={{ fill: "currentcolor" }}
                d="M 7.9999987,14 2.0000021,16.999998 1.3943461,14.999997 Z"
                id="path16"
            />
            <path
                style={{ fill: "currentcolor" }}
                d="m 9.9999997,16 -2.9999988,5.999997 1.9999958,0.605657 z"
                id="path17"
            />
        </Icon>
    )
}

export function BallGravity(props: iconProps) {
    return (
        <Icon {...props}>
            <path
                style={{ fill: "currentcolor" }}
                d="m 9.5001953,6.3184774 c -0.7087278,0 -1.3968039,0.090696 -2.0531046,0.260966 L 7.7995239,7.8940918 C 8.3428856,7.7552854 8.9127892,7.6817017 9.5001953,7.6817017 c 3.7736337,0 6.8181887,3.0445553 6.8181887,6.8181883 0,0.587652 -0.07649,1.156701 -0.215491,1.700155 l 1.317232,0.35295 c 0.170335,-0.656257 0.261483,-1.344344 0.261483,-2.053105 0,-1.554413 -0.436125,-3.009202 -1.192175,-4.248319 A 4.5229421,4.5229421 0 0 1 13.748515,7.5106527 C 12.509266,6.7543789 11.054856,6.3184774 9.5001953,6.3184774 Z"
            />
            <path
                style={{ fill: "currentcolor" }}
                d="m 9.5001953,3.0447754 c -1.0017218,0 -1.9733025,0.1302407 -2.9000814,0.3731038 l 0.49351,1.8417481 C 7.8620512,5.0610497 8.6685166,4.9552531 9.5001953,4.9552531 c 1.4259247,0 2.7760087,0.3125037 3.9894207,0.8697143 A 4.5229421,4.5229421 0 0 1 13.975891,3.9563477 C 12.600103,3.3698917 11.087347,3.0447754 9.5001953,3.0447754 Z M 20.043221,10.024194 a 4.5229421,4.5229421 0 0 1 -1.868103,0.486276 c 0.557209,1.213408 0.869714,2.563498 0.869714,3.98942 0,0.832077 -0.10708,1.637974 -0.305924,2.406572 l 1.842265,0.49351 c 0.242943,-0.926682 0.374137,-1.898322 0.374137,-2.900082 0,-1.587155 -0.325632,-3.099905 -0.912089,-4.475696 z"
            />
            <circle
                style={{ fill: "currentcolor" }}
                cx="18"
                cy="6"
                r="2.9999995"
            />
            <circle
                style={{ fill: "currentcolor" }}
                cx="9.499999"
                cy="14.5"
                r="5.4999995"
            />
        </Icon>
    )
}

export function WallBounce(props: iconProps) {
    return (
        <Icon {...props}>
            <rect
                style={{ fill: "currentcolor" }}
                id="rect2"
                width="2.9999998"
                height="19.999998"
                x="18.999998"
                y="1.9999999"
            />
            <path
                id="path2"
                style={{ fill: "currentcolor" }}
                d="m 11.894881,8.4134399 a 4.4999995,4.4999995 0 0 1 -0.543636,1.3993978 l 5.768123,2.2572263 -9.9435786,4.767668 a 0.75,0.75 0 0 0 -0.3513998,0.999939 0.75,0.75 0 0 0 0.999939,0.351916 L 17.999935,13.310815 v -2.508374 z m 7.104993,2.7801921 v 1.637626 l 1.881022,-0.901754 z"
            />
            <circle
                style={{ fill: "currentcolor" }}
                id="circle2"
                cx="7.5"
                cy="7.5"
                r="3.4999998"
            />
            <path
                style={{ fill: "currentcolor" }}
                id="path3"
                d="m -7.9999993,13.488105 5.6394643,9.76784 -11.278929,-1e-6 z"
                transform="matrix(-0.2033922,-0.35228577,0.35228577,-0.2033922,-1.6728521,18.925089)"
            />
        </Icon>
    )
}
